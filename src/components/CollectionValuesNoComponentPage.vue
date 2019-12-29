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
                },
                {
                    path: 'creator',
                    label: 'Creator: '
                },
                {
                    label: 'nested: ',
                    elementStyle: 'background-color: rgba(200,200,200,.5); padding: 10px;',
                    childrenStyle: 'padding-left: 20px',
                    children: [
                        {
                            label: 'Thumbnail: ',
                            path: 'thumbnail',
                        },
                        {
                            // custom element with custom content
                            label: 'Value as image: ',
                            valueElement: 'image',
                            valueAttrs: {
                                src: (md) => {
                                    console.log(md)
                                }
                            }
                        },
                        {
                            // custom element with custom content
                            element: 'image',
                            elementAttrs: {
                                title: 'Whole label + value replaced with an image',
                                src: (md) => {
                                    console.log(md)
                                }
                            }
                        },
                    ]
                }
            ]
        };
    }
};
</script>
