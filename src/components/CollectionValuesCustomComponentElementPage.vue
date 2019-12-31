<template lang="pug">
q-page.q-ma-lg
    .float-right
        q-btn.block(icon="launch"
            href="https://github.com/oarepo/invenio-oarepo-ui-quasar/tree/invenio-3.2/src/components/CollectionValuesCustomComponentElementPage.vue"
            type="a" target="_blank" flat) Page source
        q-btn.block(icon="launch"
            href="https://github.com/oarepo/invenio-oarepo-ui-quasar/tree/invenio-3.2/src/components/SamplePropertyComponent.vue"
            type="a" target="_blank" flat) Component
    oarepo-collection-list(:query="query" :display="values")
</template>

<style>
</style>

<script>
import SamplePropertyComponent from './SamplePropertyComponent.vue';

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
                    element: null,      // do not render wrapper element
                    component: SamplePropertyComponent,
                    extra: "value of extra field",
                    groupValues: true
                },
            ]
        };
    }
};
</script>
