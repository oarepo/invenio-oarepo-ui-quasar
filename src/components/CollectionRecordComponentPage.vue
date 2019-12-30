<template lang="pug">
q-page.q-ma-lg
    .float-right
        q-btn.block(icon="launch"
            href="https://github.com/oarepo/invenio-oarepo-ui-quasar/tree/master/src/components/CollectionRecordComponentPage.vue"
            type="a" target="_blank" flat) Page source
        q-btn.block(icon="launch"
            href="https://github.com/oarepo/invenio-oarepo-ui-quasar/tree/master/src/components/CollectionRecordComponent.vue"
            type="a" target="_blank" flat) Component
    oarepo-collection-list(:query="query" :component="CollectionRecordComponent")
</template>

<style>
</style>

<script>
import CollectionRecordComponent from './CollectionRecordComponent.vue';

export default {
    props: {
        query: Object
    },
    data: function () {
        return {
            CollectionRecordComponent
        };
    }
};
</script>
