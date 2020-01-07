<template lang="pug">
div
    data-renderer(:data="record.metadata" :layout="layout" v-bind="currentOptions")
        slot(v-for="(_, name) in $slots" :name="name" :slot="name")
        template(v-for="(_, name) in $scopedSlots" v-slot:[name]="slotData")
            slot(:name="name" v-bind="slotData")
</template>

<style>
</style>

<script>

import OARepoEditorWrapperComponent from './OARepoEditorWrapperComponent';

export default {
    props: {
        record: Object,
        url: String,
        layout: Array,
        options: Object
    },
    methods: {
        layoutTranslator(layout, options) {
            if (options.nextLayoutTranslator) {
                layout = options.nextLayoutTranslator(layout, options);
            }
            layout['value-viewer'] = layout.value;
            layout['value-editor'] = {
                element: 'div'
            };
            layout.value = {
                ...layout['value-viewer'],
                'component': options.editorWrapperComponent || OARepoEditorWrapperComponent,
                ...(layout['editor-wrapper'] || {})
            };
            return layout;
        }
    },
    computed: {
        currentOptions() {
            const opts = {
                ...this.options
            };
            opts.layoutTranslator = (layout, options) => this.layoutTranslator(layout, {
                ...options,
                nextLayoutTranslator: opts.layoutTranslator
            });
            return opts;
        }
    }
};
</script>
