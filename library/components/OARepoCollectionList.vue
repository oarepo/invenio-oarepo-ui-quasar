<template lang="pug">
q-list
    template(v-for="record of records")
        slot(name="record" v-bind:record="record" v-bind:url="recordUrl(record)")
            component(
                :key="record.id"
                :is="recordComponent(record)"
                :record="record"
                :url="recordUrl(record)"
                :values="values"
                :icon="recordIcon(record)")
</template>

<style>
</style>

<script>

import OARepoCollectionListDefaultComponent from './OARepoCollectionListDefaultComponent';

export default {
    name: 'oarepo-collection-list',
    props: {
        query: Object,
        component: [Object, Promise],
        componentFactory: Function,
        urlGetter: Function,
        values: {
            type: [Array, Function],
            default: () => [
                {
                    path: 'title',
                    valueClass: 'text-weight-bolder'
                },
                {
                    path: 'creator'
                },
                {
                    path: 'created'
                }
            ]
        },
        icon: {
            type: [Object, Function],
            default: () => ({ name: 'launch' })
        }
    },
    computed: {
        records() {
            return this.$oarepo.collection.records;
        }
    },
    methods: {
        recordComponent(record) {
            if (this.componentFactory !== undefined) {
                const ret = this.componentFactory(record);
                if (ret !== undefined) {
                    return ret;
                }
            }
            return this.component || OARepoCollectionListDefaultComponent;
        },
        recordUrl(record) {
            if (this.urlGetter !== undefined) {
                const ret = this.urlGetter(record);
                if (ret !== undefined) {
                    return ret;
                }
            }
            return record.links.ui;
        },
        recordIcon(record) {
            if (this.icon instanceof Function) {
                return this.icon(record, this);
            }
            return this.icon;
        }
    }
};
</script>
