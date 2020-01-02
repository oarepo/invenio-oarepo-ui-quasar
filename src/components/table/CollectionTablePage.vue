<template lang="pug">
q-page.q-ma-lg
    q-btn.float-right(icon="launch"
        href="https://github.com/oarepo/invenio-oarepo-ui-quasar/tree/invenio-3.2/src/components/table/CollectionTablePage.vue"
        type="a" target="_blank" flat) View source


    oarepo-collection-table(:query="query"
        style="clear: both;"
        separator="cell"
        :grid="grid"
        card-style="background-color: lightgreen"
    )
        template(#top)
            q-toggle(v-model="grid" label="As grid")
        template(v-slot:body-cell-created="{row}")
            q-td custom table cell renderer
</template>

<script>
export default {
    props: {
        query: Object
    },
    data: () => ({
        grid: false
    })
}
</script>
