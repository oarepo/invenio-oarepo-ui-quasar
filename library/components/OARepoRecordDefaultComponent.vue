<template lang="pug">
data-renderer(:data="record.metadata" :layout="layout" v-bind="options")
    slot(v-for="(_, name) in $slots" :name="name" :slot="name")
    template(v-for="(_, name) in $scopedSlots" v-slot:[name]="slotData")
        slot(:name="name" v-bind="slotData")
</template>

<style>
</style>

<script>

export default {
    props: {
        record: Object,
        url: String,
        layout: Array,
        options: Object
    }
};
</script>
