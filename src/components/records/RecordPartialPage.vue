<template lang="pug">
.q-ma-lg
    q-btn.float-right(icon="launch"
        href="https://github.com/oarepo/invenio-oarepo-ui-quasar/tree/invenio-3.2/src/components/records/RecordPartialPage.vue"
        type="a" target="_blank" flat) View source
    h6 Rendered record (default rendering, dynamic schema, hidden $schema)
    .q-pt-xs.q-pr-lg
        span Display options:
        q-radio(v-model="query.schema" val="inline" label="inline")
        q-radio(v-model="query.schema" val="block" label="block")
        q-radio(v-model="query.schema" val="table" label="table")
        q-radio(v-model="query.schema" val="flex" label="flex")

    .row.q-mt-lg.items-start
        img.q-mr-xl(:src="thumbnail")
        oarepo-record.col(:options="options")
    div.q-pt-lg See #[a(href="https://github.com/oarepo/data-renderer" target="_blank") @oarepo/data-renderer] for more details on rendering
</template>
<script>
export default {
    props: {
        query: Object
    },
    data: function () {
        return {
            schema: 'table'
        };
    },
    computed: {
        options() {
            return {
                schema: this.query.schema,
                pathDefinitions: {
                    '-title': {
                        value: {
                            class: ['text-weight-medium']
                        }
                    },
                    '$schema': null,
                    thumbnail: null
                }
            };
        },
        thumbnail() {
            return this.$oarepo.record.record.metadata.thumbnail;
        }
    }
};
</script>
