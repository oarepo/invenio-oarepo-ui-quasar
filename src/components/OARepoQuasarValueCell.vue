<template>
<div class="inline">
    <div v-if="isPrimitive(value)" class="primitive inline">
        {{value}}
    </div>
    <div v-else-if="isMultiLang(value)">
        <template v-for="(val, key) in value">
        <div v-if="key !== '_'" v-bind:key="key">
            <q-badge align="top" class="lang">{{ key }}</q-badge>
            {{ val }}
        </div>
        </template>
    </div>
    <div v-else-if="isArray(value)">
        <div v-for="(item, index) in value" v-bind:key="index">
            <oarepo-quasar-value-cell :value="item"></oarepo-quasar-value-cell>
        </div>
    </div>
    <div v-else-if="isObject(value)" class="inline">
        <div v-for="(val, key) in value" v-bind:key="key" class="inline">
            <q-badge color="grey">{{ $t('oarepo.item.' + key) }}</q-badge>
            <oarepo-quasar-value-cell :value="val"></oarepo-quasar-value-cell>
        </div>
    </div>
    <div v-else>
        {{ value }}
    </div>

</div>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

export default @Component({
    name: 'oarepo-quasar-value-cell',
    props: {
        value: [String, Object, Array, Number, Boolean],
    },
})
class OARepoQuasarValueCell extends Vue {
    isArray(x) {
        return Array.isArray(x);
    }

    isObject(x) {
        return typeof x === 'object';
    }

    isMultiLang(x) {
        return this.isObject(x) && !this.isArray(x) && !this.isPrimitive(x) && x._ !== undefined;
    }

    isPrimitive(x) {
        return x === null || (!this.isArray(x) && !this.isObject(x));
    }
}
</script>

<style>
th.key {
    width: 100px !important;
    padding-top: 15px;
}

.primitive {
    padding-top: 10px;
}

div.inline {
    display: inline-block;
    padding-right: 10px;
    padding-left: 5px;
}

.q-badge.lang {
    font-size: xx-small;
    padding-left: 5px;
    padding-right: 5px;
    padding-top: 0;
    padding-bottom: 0;
}

</style>
