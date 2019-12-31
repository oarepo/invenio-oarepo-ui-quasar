<template lang="pug">
q-page.q-ma-lg
    .float-right
        q-btn.block(icon="launch"
            href="https://github.com/oarepo/invenio-oarepo-ui-quasar/tree/invenio-3.2/src/components/lists/CollectionValuesCustomComponentPage.vue"
            type="a" target="_blank" flat) Page source
        q-btn.block(icon="launch"
            href="https://github.com/oarepo/invenio-oarepo-ui-quasar/tree/invenio-3.2/src/components/lists/SampleValueComponent.vue"
            type="a" target="_blank" flat) Component
    oarepo-collection-list(:query="query" :display="values")
</template>

<style>
</style>

<script>
import SampleValueComponent from './SampleValueComponent.vue';

export default {
    props: {
        query: Object
    },
    data: function () {
        return {
            values: [
                {
                    path: 'title',
                    valueClass: 'text-weight-bolder'
                },
                {
                    path: 'creator',
                    component: SampleValueComponent,
                    extra: "value of extra field"
                },
            ]
        };
    }
};
</script>
