<template lang="pug">
div
    slot(v-bind:record="record")
        component(
            :key="record.id"
            :is="recordComponent"
            :record="record"
            :layout="layout !== null ? layout : undefined"
            :options="currentOptions")
            slot(v-for="(_, name) in $slots" :name="name" :slot="name")
            template(v-for="(_, name) in $scopedSlots" v-slot:[name]="slotData")
                slot(:name="name" v-bind="slotData")
</template>

<style>
</style>

<script>


import OARepoRecordMixin from './OARepoRecordMixin';

export default {
    name: 'oarepo-record',
    mixins: [OARepoRecordMixin],
};
</script>
