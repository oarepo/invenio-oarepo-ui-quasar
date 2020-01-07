<template lang="pug">
q-page.q-ma-lg
    .float-right
        q-btn.block(icon="launch"
            href="https://github.com/oarepo/invenio-oarepo-ui-quasar/tree/invenio-3.2/src/components/lists/CollectionValuesCustomComponentElementPage.vue"
            type="a" target="_blank" flat) Page source
        q-btn.block(icon="launch"
            href="https://github.com/oarepo/invenio-oarepo-ui-quasar/tree/invenio-3.2/src/components/lists/SamplePropertyComponent.vue"
            type="a" target="_blank" flat) Component
    oarepo-collection-list(:query="query" :layout="values")
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
                    value: {
                        class: ['text-weight-medium']
                    }
                },
                {
                    path: 'creator',
                    wrapper: {
                        component: SamplePropertyComponent,
                    },
                    extra: "value of extra field",
                },
            ]
        };
    }
};
</script>
