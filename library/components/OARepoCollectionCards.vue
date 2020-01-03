<template lang="pug">
.row.items-start
    template(v-for="record of records")
        div(:class="itemClass" :style="itemStyle")
            slot(v-bind:record="record" v-bind:url="recordUrl(record)")
                component(
                    :key="record.id"
                    :is="recordComponent(record)"
                    :record="record"
                    :url="recordUrl(record)"
                    :display="display !== null ? display : undefined"
                    :icon="recordIcon(record)"
                    :options="options")
                    slot(v-for="(_, name) in $slots" :name="name" :slot="name")
                    template(v-for="(_, name) in $scopedSlots" v-slot:[name]="slotData")
                        slot(:name="name" v-bind="slotData")
</template>

<style>
</style>

<script>

import OARepoCollectionCardsDefaultComponent from './OARepoCollectionCardsDefaultComponent';

export default {
    name: 'oarepo-collection-cards',
    props: {
        query: Object,
        component: [Object, Promise],
        componentFactory: Function,
        urlGetter: Function,
        display: {
            type: [Array, Function],
            default: () => [
                {
                    path: 'title',
                    value: {
                        class: ['text-weight-medium']
                    },
                    link: true
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
        },
        itemClass: [String, Array, Object],
        itemStyle: String,
        options: Object
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
            return this.component || OARepoCollectionCardsDefaultComponent;
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
