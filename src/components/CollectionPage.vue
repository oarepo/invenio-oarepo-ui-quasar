<template lang="pug">
q-page.flex.q-ma-lg
    oarepo-collection-list(:query="query")
</template>

<style>
</style>

<script>
export default {
    name: 'CollectionPage',
    props: {
        query: Object
    }
}
</script>
