<template lang="pug">
q-item(clickable :to="url" exact)
    q-item-section(avatar)
        q-icon(:name="displayedIcon.name" v-if="displayedIcon.name && !displayedIcon.url" :class="displayedIcon.cssClass")
        q-img(:src="displayedIcon.url" v-if="displayedIcon.url" :class="displayedIcon.cssClass")
    q-item-section
        div(v-for="(part, idx) of displayedParts" :key="idx" :class="part.cssClass" :style="part.style")
            component(v-if="part.valueComponent" :is="part.valueComponent" :part="part")
            template(v-else)
                span(v-if="part.label" :class="part.labelCssClass || {}" :style="part.labelStyle") {{ part.label }}
                span(:class="part.valueCssClass || {}" :style="part.valueStyle") {{ part.text }} {{ part.value }}
</template>

<style>
</style>

<script>

import { JSONPath } from 'jsonpath-plus';

export default {
    props: {
        record: Object,
        url: String,
        values: Array,
        icon: Object
    },
    computed: {
        md() {
            return this.record.metadata;
        },
        displayedParts() {
            return this.values.map(partDesc => {
                return JSONPath({
                    path: partDesc.path,
                    json: this.md
                })
                    .map(value => ({
                        ...partDesc,
                        value
                    }));
            })
                .flat()
                .filter(x => x.value !== undefined);
        },
        displayedIcon() {
            const ret = { ...this.icon };
            if (ret.iconPath) {
                ret.name = JSONPath({
                    path: ret.iconPath,
                    json: this.md
                })[0]
            }
            if (ret.urlPath) {
                ret.url = JSONPath({
                    path: ret.urlPath,
                    json: this.md
                })[0]
            }
            return ret
        }
    }
};
</script>
