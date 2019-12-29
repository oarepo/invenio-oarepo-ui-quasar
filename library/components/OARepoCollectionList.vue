<template lang="pug">
q-list
    template(v-for="record of records")
        slot(name="record" v-bind:record="record" v-bind:url="recordUrl(record)")
            component(
                :key="record.id"
                :is="recordComponent(record)"
                :record="record"
                :url="recordUrl(record)"
                :values="recordValues(record)"
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
        componentGetter: Function,
        urlGetter: Function,
        values: {
            type: [Array, Function],
            default: () => [
                {
                    path: 'title',
                    cssClass: 'text-weight-bolder'
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
            if (this.componentGetter !== undefined) {
                const ret = this.componentGetter(record);
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
        recordValues(record) {
            if (this.values instanceof Function) {
                return this.values(record);
            }
            return this.values;
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
