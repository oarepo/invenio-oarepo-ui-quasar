<template lang="pug">
q-page.q-ma-lg
    q-btn.float-right(icon="launch"
        href="https://github.com/oarepo/invenio-oarepo-ui-quasar/tree/invenio-3.2/src/components/CollectionPageFunctionIcon.vue"
        type="a" target="_blank" flat) View source
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
                    iconClass: 'test-icon',
                    iconStyle: 'color: red',
                    avatarStyle: 'display: flex; justify-content: center; align-items: flex-end'
                },
                {
                    url: 'https://cis-login.vscht.cz/static/web/logo_small.png',
                    imageClass: 'test-image'
                }
            ][id % 2];
        }
    }
};
</script>
