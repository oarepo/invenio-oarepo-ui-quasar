<template lang="pug">
component(:is="component")
    slot(v-if="hasValues")
    div(v-else)
        oarepo-editor-wrapper(v-bind="$props" patch-operation="add")
</template>
<script>


import OARepoEditorWrapperComponent from './OARepoEditorWrapperComponent';

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
        currentSchema: Object,
        storeModule: String,
        valueIndex: Number,
        parentJSONPointer: String
    },
    components: {
        'oarepo-editor-wrapper': OARepoEditorWrapperComponent
    },
    name: 'oarepo-record-inplace-editor-values-wrapper-component',
    computed: {
        component() {
            return this.layout['value-wrapper-viewer']['component'] || this.layout['value-wrapper-viewer']['element'];
        },
        hasValues() {
            return this.values.length > 0;
        }
    },
    data: function () {
        return {
            editing: false
        };
    }
};
</script>
