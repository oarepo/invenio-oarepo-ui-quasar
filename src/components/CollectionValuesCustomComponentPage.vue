<template lang="pug">
q-page.q-ma-lg
    q-btn.float-right(icon="launch"
        href="https://github.com/oarepo/invenio-oarepo-ui-quasar/tree/master/src/components/CollectionValuesCustomComponentPage.vue"
        type="a" target="_blank" flat) View source
    oarepo-collection-list(:query="query" :values="values")
</template>

<style>
</style>

<script>
import SampleValueComponent from './SampleValueComponent';

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
