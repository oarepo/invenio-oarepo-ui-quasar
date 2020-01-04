<template lang="pug">
div
    slot(v-bind:record="record")
        component(
            :key="record.id"
            :is="recordComponent"
            :record="record"
            :display="display !== null ? display : undefined"
            :options="options")
            slot(v-for="(_, name) in $slots" :name="name" :slot="name")
            template(v-for="(_, name) in $scopedSlots" v-slot:[name]="slotData")
                slot(:name="name" v-bind="slotData")
</template>

<style>
</style>

<script>


import OARepoRecordDefaultComponent from './OARepoRecordDefaultComponent';

export default {
    name: 'oarepo-record',
    props: {
        component: [Object, Promise],
        componentFactory: Function,
        display: {
            type: [Array, Function],
        },
        options: {
            type: Object,
            default: () => ({
                pathDefinitions: {
                    '-title': {
                        value: {
                            class: ['text-weight-medium']
                        }
                    }
                }
            })
        }
    },
    computed: {
        record() {
            return this.$oarepo.record.record;
        },
        recordComponent() {
            if (this.componentFactory !== undefined) {
                const ret = this.componentFactory(this.record);
                if (ret !== undefined) {
                    return ret;
                }
            }
            return this.component || OARepoRecordDefaultComponent;
        },
    },
};
</script>
