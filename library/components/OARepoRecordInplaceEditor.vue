<template lang="pug">
div
    slot(v-bind:record="record")
        component(
            :key="record.id"
            :is="recordComponent"
            :record="record"
            :layout="layout !== null ? layout : undefined"
            :options="options")
            slot(v-for="(_, name) in $slots" :name="name" :slot="name")
            template(v-for="(_, name) in $scopedSlots" v-slot:[name]="slotData")
                slot(:name="name" v-bind="slotData")
</template>

<style>
</style>

<script>


import OARepoRecordMixin from './OARepoRecordMixin';
import OARepoRecordInplaceEditorDefaultComponent from './OARepoRecordInplaceEditorDefaultComponent';

export default {
    name: 'oarepo-record-inplace-editor',
    mixins: [OARepoRecordMixin],
    data: function () {
        return {
            defaultRecordComponent: OARepoRecordInplaceEditorDefaultComponent
        };
    }
};
</script>
