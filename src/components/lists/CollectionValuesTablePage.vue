<template lang="pug">
q-page.q-ma-lg
    q-btn.float-right(icon="launch"
        href="https://github.com/oarepo/invenio-oarepo-ui-quasar/tree/invenio-3.2/src/components/lists/CollectionValuesTablePage.vue"
        type="a" target="_blank" flat) View source
    oarepo-collection-list(:query="query" :display="values")
</template>

<style>
</style>

<script>
export default {
    name: 'CollectionPage',
    props: {
        query: Object
    },
    data: function () {
        return {
            values: [
                {
                    path: 'title',
                    valueClass: 'text-weight-bolder'
                },
                {
                    element: 'table',
                    elementStyle: 'border-spacing: 0; border-collapse: collapse;',
                    children: [
                        // child might be a callable
                        (_metadata, _record, _vue) => {
                            /* eslint-disable no-console */
                            console.log('Child definition called with',
                                "metadata", _metadata, "whole record", _record,
                                "vue instance", _vue)
                            return {
                                element: 'tr',
                                path: 'creator',
                                label: 'Creator: ',
                                labelElement: 'td',
                                labelStyle: 'padding-right: 20px;',
                                valueElement: 'td'
                            };
                        },
                        {
                            element: 'tr',
                            label: (metadata, def, record, vue) => {
                                /* eslint-disable no-console */
                                console.log('Anything can be a callable: definition',
                                    def, "metadata", metadata, "whole record", record,
                                    "vue instance", vue)
                                return 'Thumbnail: '
                            },
                            labelElement: 'td',
                            labelStyle: 'padding-right: 20px;',
                            children: [{
                                element: 'td',
                                path: 'thumbnail',
                                valueElement: 'img',
                                valueAttrs: {
                                    src: (md) => {
                                        return md;
                                    },
                                    width: '16'
                                }
                            }]
                        },
                    ]
                },
            ]
        };
    }
};
</script>
