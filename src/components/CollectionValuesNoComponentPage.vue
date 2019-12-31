<template lang="pug">
q-page.q-ma-lg
    q-btn.float-right(icon="launch"
        href="https://github.com/oarepo/invenio-oarepo-ui-quasar/tree/invenio-3.2/src/components/CollectionValuesNoComponentPage.vue"
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
                    path: 'creator',
                    label: 'Creator: '
                },
                {
                    label: 'nested padded content: ',
                    elementStyle: 'background-color: rgba(200,200,200,.5); padding: 10px;',
                    childrenStyle: 'padding-left: 20px',
                    children: [
                        {
                            label: 'Thumbnail: ',
                            path: 'thumbnail',
                        },
                        {
                            // custom element with custom content
                            label: 'Thumbnail value rendered as image: ',
                            valueElement: 'img',
                            valueAttrs: {
                                src: (md) => {
                                    return md.thumbnail
                                },
                                width: '32'
                            }
                        },
                        {
                            label: 'Completely replaced element with q-img: ',
                            children: [
                                {
                                    // custom element with custom content
                                    element: 'q-img',
                                    elementStyle: 'margin-top: 20px; width: 32px; height: 32px;',
                                    elementAttrs: {
                                        title: 'Whole label + value replaced with an image',
                                        src: (md) => {
                                            return md.thumbnail
                                        }
                                    }
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
