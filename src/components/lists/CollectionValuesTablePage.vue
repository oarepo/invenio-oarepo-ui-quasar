<template lang="pug">
q-page.q-ma-lg
    q-btn.float-right(icon="launch"
        href="https://github.com/oarepo/invenio-oarepo-ui-quasar/tree/invenio-3.2/src/components/lists/CollectionValuesTablePage.vue"
        type="a" target="_blank" flat) View source
    oarepo-collection-list(:query="query" :layout="values" :options="{'schema': 'table'}")
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
                    path: 'thumbnail',
                    label: 'Thumbnail',
                    value: {
                        component: 'img',
                        attrs: {
                            src: (args) => {
                                console.log(args)
                                return args.value;
                            },
                            width: '16'
                        }
                    }
                }
            ]
        };
    }
};
</script>
