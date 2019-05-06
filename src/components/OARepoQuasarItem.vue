<template>
<oarepo-item :collectionCode="collectionCode"
             :itemId="itemId"
             :locale="locale"
             ref="oarepoCollectionItem">
    <template v-slot:default="{ collection, item }">

    <slot name="title" v-bind:collection="collection" v-bind:item="item">
        <h3><span v-html="sanitize(item.metadata.title[locale] || item.metadata.title.en)"></span></h3>
    </slot>

    <slot name="content-before" v-bind:collection="collection" v-bind:item="item">
    </slot>

    <slot name="raw-content" v-bind:collection="collection" v-bind:item="item">
        <q-markup-table flat separator="none">
            <tbody>
            <tr v-for="(value, key) in item.metadata" v-bind:key="key">
                <th class="text-right vertical-top key">{{ $t('oarepo.item.' + key) }}</th>
                <td class="text-left">
                    <oarepo-quasar-value-cell :value="value"></oarepo-quasar-value-cell>
                </td>
            </tr>
            </tbody>
        </q-markup-table>
    </slot>

    <slot name="content-after" v-bind:collection="collection" v-bind:item="item">
    </slot>
    </template>

</oarepo-item>
</template>

<script>

import Vue from 'vue';
import Component from 'vue-class-component';
import sanitizeHtml from 'sanitize-html';

export default @Component({
    props: {
        collectionCode: String,
        itemId: String,
    },
    name: 'oarepo-quasar-collection-item',
})
class OARepoCollection extends Vue {
    // getters
    get locale() {
        return this.$i18n.locale;
    }

    sanitize(html) {
        return sanitizeHtml(html);
    }
}
</script>

<style scoped>
th.key {
    padding-top: 20px;
}
</style>
