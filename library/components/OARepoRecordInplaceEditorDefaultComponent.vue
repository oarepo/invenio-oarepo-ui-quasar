<template lang="pug">
div
    data-renderer.col(:data="record.metadata" :layout="layout" v-bind="currentOptions")
        slot(v-for="(_, name) in $slots" :name="name" :slot="name")
        template(v-for="(_, name) in $scopedSlots" v-slot:[name]="slotData")
            slot(:name="name" v-bind="slotData")
</template>

<style>
</style>

<script>

import OARepoEditorWrapperComponent from './OARepoEditorWrapperComponent';
import OARepoEditorValuesWrapperComponent from './OARepoEditorValuesWrapperComponent';

export default {
    props: {
        record: Object,
        url: String,
        layout: Array,
        options: Object
    },
    name: 'oarepo-record-inplace-editor-default-component',
    methods: {
        layoutTranslator(layout, options) {
            if (options.nextLayoutTranslator) {
                layout = options.nextLayoutTranslator(layout, options);
            }
            layout['value-viewer'] = layout.value;
            layout['value-editor'] = {
                component: 'q-input'
            };
            layout.value = {
                ...layout['value-viewer'],
                'component': options.editorWrapperComponent || OARepoEditorWrapperComponent,
                ...(layout['editor-wrapper'] || {})
            };
            if (!layout.children || !layout.children.length) {
                layout['value-wrapper-viewer'] = layout['value-wrapper'];
                layout['value-wrapper'] = {
                    ...(layout['value-wrapper'] || {}),
                    'element': options.editorValuesWrapperComponent || OARepoEditorValuesWrapperComponent,
                };
            }
            return layout;
        }
    },
    computed: {
        currentOptions() {
            const nextLayoutTranslator = this.options.layoutTranslator;
            const opts = {
                ...this.options
            };
            opts.layoutTranslator = (layout, options) => this.layoutTranslator(layout, {
                ...options,
                nextLayoutTranslator
            });
            return opts;
        }
    }
};
</script>
