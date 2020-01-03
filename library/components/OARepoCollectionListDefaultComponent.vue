<template lang="pug">
q-item(clickable :to="url" exact)
    q-item-section(avatar :class="displayedIcon.avatarClass" :style="displayedIcon.avatarStyle")
        q-icon(:name="displayedIcon.name" v-if="displayedIcon.name && !displayedIcon.url"
            :class="displayedIcon.iconClass" :style="displayedIcon.iconStyle")
        q-img(:src="displayedIcon.url" v-if="displayedIcon.url"
            :class="displayedIcon.imageClass" :style="displayedIcon.imageStyle")
    q-item-section
        component(:is="renderer" :data="record.metadata" :definition="display" :schema="schema" v-bind="options")
            slot(v-for="(_, name) in $slots" :name="name" :slot="name")
            template(v-for="(_, name) in $scopedSlots" v-slot:[name]="slotData")
                slot(:name="name" v-bind="slotData")
</template>

<style>
</style>

<script>

import { JSONPath } from 'jsonpath-plus';
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
        },
        schema: [String,  Object],
        options: Object
    },
    computed: {
        md() {
            return this.record.metadata;
        },
        displayedIcon() {
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
