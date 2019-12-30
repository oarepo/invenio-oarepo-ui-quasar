<template lang="pug">
q-page.q-ma-lg
    .float-right
        q-btn.block(icon="launch"
            href="https://github.com/oarepo/invenio-oarepo-ui-quasar/tree/invenio-3.2/src/components/CollectionRecordSlotPage.vue"
            type="a" target="_blank" flat) Page source
    oarepo-collection-list(:query="query")
        template(v-slot:default="{record, url}")
            q-item(:to="url" clickable)
                q-item-section
                    pre {{ record.metadata }}
</template>

<style>
</style>

<script>

export default {
    props: {
        query: Object
    }
};
</script>
