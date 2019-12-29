<template lang="pug">
q-page.flex.q-ma-lg
    oarepo-collection-list(:query="query" :values="values")
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
                            console.log('Called with', _metadata, _record, _vue)
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
                            label: 'Thumbnail: ',
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
