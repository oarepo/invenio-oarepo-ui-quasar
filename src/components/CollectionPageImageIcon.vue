<template lang="pug">
q-page.q-ma-lg
    q-btn.float-right(icon="launch"
        href="https://github.com/oarepo/invenio-oarepo-ui-quasar/tree/master/src/components/CollectionPageImageIcon.vue"
        type="a" target="_blank" flat) View source
    oarepo-collection-list(:query="query" :icon="{urlPath: 'thumbnail'}")
</template>

<style>
</style>

<script>
export default {
    props: {
        query: Object
    }
}
</script>
