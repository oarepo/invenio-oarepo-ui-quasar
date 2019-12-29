<template lang="pug">
q-page.flex.q-ma-lg
    oarepo-collection-list(:query="query" :icon="{urlPath: 'thumbnail'}")
</template>

<style>
</style>

<script>
export default {
    props: {
        query: Object
    }
}
</script>
