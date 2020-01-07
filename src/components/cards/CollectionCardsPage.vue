<template lang="pug">
q-page.q-ma-lg
    q-btn.float-right(icon="launch"
        href="https://github.com/oarepo/invenio-oarepo-ui-quasar/tree/invenio-3.2/src/components/cards/CollectionCardsPage.vue"
        type="a" target="_blank" flat) View source
    oarepo-collection-cards.q-gutter-md(:query="query" :icon="{name: 'launch'}" item-class='full-width' :layout="layout" :options="{'schema': 'table'}")
</template>

<style>
td.iqdr-value-wrapper {
    width: 100%;
}
</style>

<script>
export default {
    name: 'CollectionPage',
    props: {
        query: Object,
    },
    data: function() {
        return {
            layout: [
                {
                    path: 'title',
                    value: {
                        class: ['text-weight-medium']
                    },
                    link: true
                },
                {
                    path: 'creator'
                },
                {
                    path: 'created'
                },
                {
                    path: 'location',
                    dynamic: true,
                    label: "Location",
                    icon: {
                        value: 'map'
                    }
                }
            ]
        }
    }
}
</script>
