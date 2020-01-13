<template lang="pug">
div
    div.row(v-if="!editing")
        view-renderer.col(:def="layout" :props="this.$props" code="value-viewer" @dblclick.native="startEditing" ref="viewer")
        q-btn(icon="remove" color="primary" size="x-small" dense flat v-if="isArray" @click="remove")
        q-btn(icon="edit" color="primary" size="x-small" dense flat v-if="layout && !layout.disabled" @click="startEditing")
    div.row(v-else)
        edit-renderer(:def="layout" :props="this.$props" code="value-editor" ref="editor")
        div.q-mt-sm
            q-btn(icon="done" color="primary" @click="save" outline) Uložit
            q-btn.q-ml-sm(icon="clear" color="grey" @click="cancel" outline) Storno
</template>
<script>

import { RendererMixin } from '@oarepo/data-renderer';

const ViewRenderer = {
    mixins: [
        RendererMixin
    ],
    props: {
        def: Object,
        props: Object,
        code: String
    },
    render(h) {
        const collected = {};
        const els = this.renderElement(collected, h, this.def, this.code,
            this.props, (/*collected, h, def, options*/) => {
                return [this.props.values.length ? this.props.value : '---'];
            });
        return els[0];
    },
    computed: {
        currentSchemaCode() {
            return this.props.schema;
        }
    }
};

const EditRenderer = {
    mixins: [
        RendererMixin
    ],
    props: {
        def: Object,
        props: Object,
        code: String
    },
    data: function () {
        return {
            editedValue: null
        };
    },
    mounted() {
        this.editedValue = this.props.value;
    },
    render(h) {
        const vue = this;
        const collected = {};
        const props = {
            ...this.props,
            value: this.editedValue,
        };
        const els = this.renderElement(collected, h, this.def, this.code,
            props, (/*collected, h, def, options*/) => {
                return [];
            }, null, {
                on: {
                    input: vue.valueInput,
                }
            });

        return els[0];
    },
    computed: {
        currentSchemaCode() {
            return this.props.schema;
        },
    },
    methods: {
        valueInput(value) {
            this.editedValue = value;
        }
    }
};

export default {
    props: {
        context: [Object, Array],
        layout: Object,
        data: Object,
        paths: Array,
        value: {},
        url: String,
        values: Array,
        pathValues: Array,
        parentJSONPointer: String,
        schema: String,
        currentSchema: Object,
        storeModule: String,
        valueIndex: Number,
        patchOperation: {
            type: String,
            default: 'replace'
        },
        jsonPointer: String,
        patchTransformer: Function
    },
    components: {
        'view-renderer': ViewRenderer,
        'edit-renderer': EditRenderer
    },
    computed: {
        currentJsonPointer() {
            if (this.jsonPointer) {
                return this.jsonPointer
            }
            if (this.valueIndex) {
                return this.pathValues[this.valueIndex];
            }
            return `${this.parentJSONPointer}/${this.layout.path}`
        },
        isArray() {
            return Array.isArray(this.context)
        }
    },
    data: function () {
        return {
            editing: false
        };
    },
    methods: {
        startEditing() {
            this.editing = true;
        },
        cancel() {
            this.editing = false;
            this.$emit('stop-editing', {saved: false})
        },
        async save() {
            let patch = [{
                path: this.currentJsonPointer,
                value: this.$refs.editor.editedValue,
                op: this.patchOperation
            }]
            if (this.patchTransformer) {
                patch = this.patchTransformer(patch)
            }
            const result = await this.$store.dispatch(`${this.storeModule}/patch`, patch);
            this.editing = false;
            this.$emit('stop-editing', {saved: true, result})
        },
        async remove() {
            let patch = [{
                path: this.currentJsonPointer,
                op: 'remove'
            }]
            if (this.patchTransformer) {
                patch = this.patchTransformer(patch)
            }
            const result = await this.$store.dispatch(`${this.storeModule}/patch`, patch);
            this.editing = false;
            this.$emit('stop-editing', {saved: true, result})
        }
    }
};
</script>
