<template lang="pug">
q-page.q-ma-lg
    q-btn.float-right(icon="launch"
        href="https://github.com/oarepo/invenio-oarepo-ui-quasar/tree/invenio-3.2/src/components/cards/CollectionCardsPage.vue"
        type="a" target="_blank" flat) View source
    oarepo-collection-cards.q-gutter-md(:query="query" :icon="{name: 'launch'}" item-class='full-width')
        template(v-slot:value-creator="{definition, value}")
            q-icon(name="person")
            = " "
            span {{ value }}
</template>

<style>
</style>

<script>
export default {
    name: 'CollectionPage',
    props: {
        query: Object
    }
}
</script>
