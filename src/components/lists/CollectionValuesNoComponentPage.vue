<template lang="pug">
q-page.q-ma-lg
    q-btn.float-right(icon="launch"
        href="https://github.com/oarepo/invenio-oarepo-ui-quasar/tree/invenio-3.2/src/components/lists/CollectionValuesNoComponentPage.vue"
        type="a" target="_blank" flat) View source
    oarepo-collection-list(:query="query" :layout="values")
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
                    value: {
                        class: ['text-weight-medium']
                    }
                },
                {
                    path: 'creator',
                    label: 'Creator'
                },
                {
                    label: 'nested padded content: ',
                    element: {
                        style: {
                            'background-color': 'rgba(200,200,200,.5)',
                            'padding': '10px;'
                        }
                    },
                    childrenWrapper: {
                        style: {
                            'padding-left': '20px'
                        }
                    },
                    children: [
                        {
                            label: 'Thumbnail',
                            path: 'thumbnail',
                        },
                        {
                            // custom element with custom content
                            label: 'Thumbnail value rendered as image',
                            value: {
                                component: 'img',
                                attrs: {
                                    src: ({ context }) => {
                                        return context.thumbnail;
                                    },
                                    width: '32'
                                }
                            },
                        },
                        {
                            label: 'Completely replaced element with q-img',
                            children: [
                                {
                                    // custom element with custom content
                                    wrapper: {
                                        component: 'q-img',
                                        style: {
                                            'margin-top': '20px',
                                            'width': '32px',
                                            'height': '32px;'
                                        },
                                        attrs: {
                                            title: 'Whole label + value replaced with an image',
                                            src: ({ context }) => {
                                                return context.thumbnail;
                                            }
                                        }
                                    },
                                },
                            ]
                        }
                    ]
                }
            ]
        };
    }
};
</script>
