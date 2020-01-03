<template lang="pug">
q-card(clickable :to="url" exact)
    q-card-section
        component(:is="renderer" :data="record.metadata" :definition="display" :url="url")
            slot(v-for="(_, name) in $slots" :name="name" :slot="name")
            template(v-for="(_, name) in $scopedSlots" v-slot:[name]="slotData")
                slot(:name="name" v-bind="slotData")
</template>

<style>
</style>

<script>

import { DataRendererComponent } from '@oarepo/data-renderer';

export default {
    props: {
        record: Object,
        url: String,
        display: Array,
        icon: Object,
        renderer: {
            type: Object,
            default: () => DataRendererComponent
        }
    },
    computed: {
        md() {
            return this.record.metadata;
        }
    }
};
</script>
