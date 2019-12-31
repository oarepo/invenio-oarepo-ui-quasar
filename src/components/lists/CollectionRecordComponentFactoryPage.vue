<template lang="pug">
q-page.q-ma-lg
    .float-right
        q-btn.block(icon="launch"
            href="https://github.com/oarepo/invenio-oarepo-ui-quasar/tree/invenio-3.2/src/components/lists/CollectionRecordComponentFactoryPage.vue"
            type="a" target="_blank" flat) Page source
        q-btn.block(icon="launch"
            href="https://github.com/oarepo/invenio-oarepo-ui-quasar/tree/invenio-3.2/src/components/lists/CollectionRecordComponent.vue"
            type="a" target="_blank" flat) Component
    oarepo-collection-list(:query="query" :componentFactory="getComponent")
</template>

<style>
</style>

<script>
import CollectionRecordComponent from './CollectionRecordComponent.vue';

export default {
    props: {
        query: Object
    },
    methods: {
        getComponent(record) {
            /* eslint-disable no-console */
            console.log(record);
            // do something with the record and
            return CollectionRecordComponent;
        }
    }
};
</script>
