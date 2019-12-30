<template lang="pug">
q-page.q-ma-lg
    .float-right
        q-btn.block(icon="launch"
            href="https://github.com/oarepo/invenio-oarepo-ui-quasar/tree/invenio-3.2/src/components/CollectionRecordUILinkPage.vue"
            type="a" target="_blank" flat) Page source
    h6 Hover over record below and notice its URL
    oarepo-collection-list(:query="query" :url-getter="urlGetter")
</template>

<style>
</style>

<script>

export default {
    props: {
        query: Object
    },
    methods: {
        urlGetter (record) {
            return `/records/${record.metadata.id}`
        }
    }
};
</script>
