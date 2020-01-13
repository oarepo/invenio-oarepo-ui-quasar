<template lang="pug">
.q-ma-lg
    q-btn.float-right(icon="launch"
        href="https://github.com/oarepo/invenio-oarepo-ui-quasar/tree/invenio-3.2/src/components/records/RecordInPlaceEditorPage.vue"
        type="a" target="_blank" flat) View source
    h6 Rendered record (default rendering, dynamic schema, hidden $schema)
    .q-pt-xs.q-pr-lg
        span Layout options:
        q-radio(v-model="query.schema" val="inline" label="inline")
        q-radio(v-model="query.schema" val="block" label="block")
        q-radio(v-model="query.schema" val="table" label="table")
        q-radio(v-model="query.schema" val="flex" label="flex")
    q-separator
    oarepo-record-inplace-editor(:options="options" :storeModule="storeModule" :layout="layout")
    div.q-pt-lg See #[a(href="https://github.com/oarepo/data-renderer" target="_blank") @oarepo/data-renderer] for more details on rendering
</template>
<script>
export default {
    props: {
        query: Object,
        storeModule: String
    },
    data: function () {
        return {
            schema: 'table'
        };
    },
    computed: {
        layout() {
            return [
                'title',
                'creator',
                'created',
                {
                    path: 'location',
                    label: 'Location',
                    children: [
                        'street',
                        'number',
                        'city',
                        'zipcode'
                    ]
                },
                'keywords',
                'undefinedKeywords',
                'extraKeywords'
            ];
        },
        options() {
            return {
                schema: this.query.schema,
                showEmpty: true,
                pathLayouts: {
                    '-title': {
                        value: {
                            class: ['text-weight-medium']
                        }
                    },
                    'undefinedKeywords': {
                        array: true
                    },
                    'extraKeywords': {
                        array: true
                    }
                }
            };
        }
    }
};
</script>
