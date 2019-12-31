<template lang="pug">
q-page.q-ma-lg
    .float-right
        q-btn.block(icon="launch"
            href="https://github.com/oarepo/invenio-oarepo-ui-quasar/tree/invenio-3.2/src/components/lists/CollectionRecordUILinkPage.vue"
            type="a" target="_blank" flat) Page source
    h6 Hover over record below and notice its URL
    b Note:
    span.
        It might be better to set the record.links.ui on the server side or to use callback functions
        on #[code @oarepo/invenio-api-vuex] instead of #[code url-getter]. See the
        #[a(href="https://github.com/oarepo/invenio-oarepo-ui-quasar/blob/invenio-3.2/README.md#record-ui-url") documentation]
        for explanation.
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
