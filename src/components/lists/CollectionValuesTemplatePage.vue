<template lang="pug">
q-page.q-ma-lg
    .float-right
        q-btn.block(icon="launch"
            href="https://github.com/oarepo/invenio-oarepo-ui-quasar/tree/invenio-3.2/src/components/lists/CollectionValuesTemplatePage.vue"
            type="a" target="_blank" flat) Page source
    oarepo-collection-list(:query="query" :display="values")
        template(v-slot:value-creator="{definition, value}")
            span "{{ value }}" with extra "{{ definition.extra }}"
</template>

<style>
</style>

<script>

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
                    extra: "value of extra field",
                },
            ]
        };
    }
};
</script>
