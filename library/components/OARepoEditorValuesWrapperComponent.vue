<template lang="pug">
component(:is="component")
    slot
    div(v-if='isArray')
        oarepo-editor-wrapper(v-bind="addArrayProps" patch-operation="add" v-if="editing" ref="edit" @stop-editing="stopEditing")
        q-btn(icon="playlist_add" flat color="primary" @click="startEditing" v-if="!editing")
    div(v-if="isUndefinedObjectOrValue")
        oarepo-editor-wrapper(v-bind="addObjectProps" patch-operation="add" ref="edit" @stop-editing="stopEditing")
</template>
<script>


import OARepoEditorWrapperComponent from './OARepoEditorWrapperComponent';
import { SKIP_WRAPPER } from '@oarepo/data-renderer';

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
        schema: String,
        currentSchema: Object,
        storeModule: String,
        valueIndex: Number,
        parentJSONPointer: String,
    },
    components: {
        'oarepo-editor-wrapper': OARepoEditorWrapperComponent
    },
    name: 'oarepo-record-inplace-editor-values-wrapper-component',
    computed: {
        component() {
            const ret = this.layout['value-wrapper-viewer']['component'] || this.layout['value-wrapper-viewer']['element'];
            return ret !== SKIP_WRAPPER ? ret : 'div';
        },
        hasValues() {
            return this.values.length > 0;
        },
        isArray() {
            return this.layout.array || (this.pathValues && this.pathValues.length && Array.isArray(this.pathValues[0].value));
        },
        addArrayProps() {
            return {
                ...this.$props,
                context: {},
                value: undefined,
                values: [],
                patchTransformer: this.transformArrayPatch
            };
        },
        addObjectProps() {
            return {
                ...this.$props,
                context: {},
                value: undefined,
                values: [],
            };
        },
        isUndefinedObjectOrValue() {
            return !this.isArray && this.pathValues === undefined;
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
            this.$nextTick(() => {
                this.$refs.edit.startEditing();
            });
        },
        stopEditing() {
            this.editing = false;
        },
        transformArrayPatch(patch) {
            if (patch[0].operation === 'remove') {
                return patch
            }
            if (this.pathValues === undefined) {
                // if array and does not exist, create it
                patch[0].value = [patch[0].value];
            } else {
                patch[0].path += '/-';
            }
            return patch;
        }
    }
};
</script>
