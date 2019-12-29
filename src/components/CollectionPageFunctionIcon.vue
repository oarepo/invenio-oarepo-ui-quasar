<template lang="pug">
q-page.flex.q-ma-lg
    oarepo-collection-list(:query="query" :icon="getIcon")
</template>

<style>
</style>

<script>
export default {
    props: {
        query: Object
    },
    methods: {
        getIcon(record) {
            const id = parseInt(record.id);
            return [
                {
                    name: 'launch',
                    cssClass: 'test-icon'
                },
                {
                    url: 'https://cis-login.vscht.cz/static/web/logo_small.png',
                    cssClass: 'test-image'
                }
            ][id % 2];
        }
    }
};
</script>
