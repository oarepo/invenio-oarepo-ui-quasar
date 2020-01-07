<template lang="pug">
div
    renderer(:def="layout" :props="this.$props" code="value-viewer")
</template>
<script>

import { RendererMixin } from '@oarepo/data-renderer';

const Renderer = {
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
                return [this.props.value];
            });
        console.log(els);
        return els[0];
    },
    computed: {
        currentSchemaCode() {
            return this.props.schema;
        }
    }
};

export default {
    props: {
        context: Object,
        layout: Object,
        data: Object,
        paths: Array,
        value: {},
        url: String,
        values: Array,
        pathValues: Array,
        schema: String,
        currentSchema: Object
    },
    components: {
        renderer: Renderer
    },
    computed: {}
};
</script>
