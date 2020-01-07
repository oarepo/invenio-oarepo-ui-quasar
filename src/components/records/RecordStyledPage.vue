<template lang="pug">
.q-ma-lg
    q-btn.float-right(icon="launch"
        href="https://github.com/oarepo/invenio-oarepo-ui-quasar/tree/invenio-3.2/src/components/records/RecordStyledPage.vue"
        type="a" target="_blank" flat) View source
    h6 Rendered record (default rendering, dynamic schema, hidden $schema)
    .q-pt-xs.q-pr-lg
        span Layout options:
        q-radio(v-model="query.schema" val="inline" label="inline")
        q-radio(v-model="query.schema" val="block" label="block")
        q-radio(v-model="query.schema" val="table" label="table")
        q-radio(v-model="query.schema" val="flex" label="flex")
    q-separator
    oarepo-record(:options="options" :layout="layout")
    div.q-pt-lg See #[a(href="https://github.com/oarepo/data-renderer" target="_blank") @oarepo/data-renderer] for more details on rendering
</template>
<script>
export default {
    props: {
        query: Object
    },
    data: function () {
        return {
            schema: 'table',
            layout: [
                {
                    'children-wrapper': {
                        class: ['row', 'q-mt-lg', 'items-start']
                    },
                    children: [
                        {
                            path: 'thumbnail',
                            wrapper: {
                                component: "img",
                                class: ['q-mr-xl'],
                                attrs: {
                                    src: ({value}) => { console.log(value); return value }
                                }
                            }
                        },
                        {
                            key: 'rhs'
                            // render the rest here
                        }
                    ]
                }
            ]
        }
    },
    computed: {
        options() {
            return {
                schema: this.query.schema,
                dynamic: true,
                pathLayouts: {
                    '-title': {
                        value: {
                            class: ['text-weight-medium']
                        }
                    },
                    '$schema': null,
                    'rhs-thumbnail': null
                }
            }
        }
    }
}
</script>
