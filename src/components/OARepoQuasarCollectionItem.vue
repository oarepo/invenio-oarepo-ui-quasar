<template>
<oarepo-collection-item :collectionCode="collectionCode"
                        :collectionItemModule="collectionItemModule"
                        :itemId="itemId"
                        :locale="locale"
                        ref="oarepoCollectionItem">

    <template slot="title" slot-scope=" { collection, item } ">
    <slot name="title" v-bind:collection="collection" v-bind:item="item">
        <h3><span v-html="sanitize(item.metadata.title[locale] || item.metadata.title.en)"></span></h3>
    </slot>
    </template>


    <template slot="content-before" slot-scope=" { collection, item } ">
    <slot name="content-before" v-bind:collection="collection" v-bind:item="item">
    </slot>
    </template>

    <template slot="raw-content" slot-scope=" { collection, item } ">
    <slot name="raw-content" v-bind:collection="collection" v-bind:item="item">
        <q-markup-table flat separator="none">
            <tbody>
            <tr v-for="(value, key) in item.metadata" v-bind:key="key">
                <th class="text-right vertical-top key"  >{{ $t('oarepo.item.' + key) }}</th>
                <td class="text-left">
                    <oarepo-quasar-value-cell :value="value"></oarepo-quasar-value-cell>
                </td>
            </tr>
            </tbody>
        </q-markup-table>
    </slot>
    </template>

    <template slot="content-after" slot-scope=" { collection, item } ">
    <slot name="content-after" v-bind:collection="collection" v-bind:item="item">
    </slot>
    </template>

</oarepo-collection-item>
</template>

<script>

import Vue from 'vue';
import Component from 'vue-class-component';
import sanitizeHtml from 'sanitize-html';

export default @Component({
    props: {
        collectionCode: String,
        collectionItemModule: Object,
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
