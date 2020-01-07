<template lang="pug">
q-item(clickable :to="url" exact)
    q-item-section(avatar :class="layoutedIcon.avatarClass" :style="layoutedIcon.avatarStyle")
        q-icon(:name="layoutedIcon.name" v-if="layoutedIcon.name && !layoutedIcon.url"
            :class="layoutedIcon.iconClass" :style="layoutedIcon.iconStyle")
        q-img(:src="layoutedIcon.url" v-if="layoutedIcon.url"
            :class="layoutedIcon.imageClass" :style="layoutedIcon.imageStyle")
    q-item-section
        data-renderer(:data="md" :layout="layout" :schema="schema" v-bind="options")
            slot(v-for="(_, name) in $slots" :name="name" :slot="name")
            template(v-for="(_, name) in $scopedSlots" v-slot:[name]="slotData")
                slot(:name="name" v-bind="slotData")
</template>

<style>
</style>

<script>

import { JSONPath } from 'jsonpath-plus';

export default {
    props: {
        record: Object,
        url: String,
        layout: Array,
        icon: Object,
        schema: [String,  Object],
        options: Object
    },
    computed: {
        md() {
            return this.record.metadata;
        },
        layoutedIcon() {
            const ret = { ...this.icon };
            if (ret.iconPath) {
                ret.name = JSONPath({
                    path: ret.iconPath,
                    json: this.md
                })[0];
            }
            if (ret.urlPath) {
                ret.url = JSONPath({
                    path: ret.urlPath,
                    json: this.md
                })[0];
            }
            return ret;
        }
    }
};
</script>
