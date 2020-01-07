<template lang="pug">
q-page.q-ma-lg
    .float-right
        q-btn.block(icon="launch"
            href="https://github.com/oarepo/invenio-oarepo-ui-quasar/tree/invenio-3.2/src/components/lists/CollectionValuesCustomComponentPage.vue"
            type="a" target="_blank" flat) Page source
        q-btn.block(icon="launch"
            href="https://github.com/oarepo/invenio-oarepo-ui-quasar/tree/invenio-3.2/src/components/lists/SampleValueComponent.vue"
            type="a" target="_blank" flat) Component
    oarepo-collection-list(:query="query" :layout="values")
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
                    value: {
                        class: ['text-weight-medium']
                    }
                },
                {
                    path: 'creator',
                    value: {
                        component: SampleValueComponent,
                    },
                    extra: "value of extra field"
                },
            ]
        };
    }
};
</script>
