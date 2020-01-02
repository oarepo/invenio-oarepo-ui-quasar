<template lang="pug">
q-card(clickable :to="url" exact)
    q-card-section
        component(:is="renderer" :record="record" :definition="display" :url="url")
</template>

<style>
</style>

<script>

import RecordRenderer from './RecordRenderer';

export default {
    props: {
        record: Object,
        url: String,
        display: Array,
        icon: Object,
        renderer: {
            type: Object,
            default: () => RecordRenderer
        }
    },
    computed: {
        md() {
            return this.record.metadata;
        }
    }
};
</script>
