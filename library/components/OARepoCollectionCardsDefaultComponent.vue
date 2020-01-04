<template lang="pug">
q-card(clickable :to="url" exact)
    q-card-section
        data-renderer(:data="record.metadata" :definition="display" :url="url" v-bind="options")
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
        display: Array,
        options: Object
    }
};
</script>
