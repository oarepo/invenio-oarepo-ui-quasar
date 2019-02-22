<template>
<oarepo-collection-list :collectionListModule="collectionListModule">
    <template slot="default" slot-scope="props">
    <q-card inline class="q-ma-sm" style="max-width: 500px;">
        <q-parallax src="/statics/parallax.jpg" :height="250">
            <div slot="loading">Loading...</div>
        </q-parallax>
        <q-card-section>
            <div class="text-h6">
                {{ props.collection.title[locale] || props.collection.title.en }}
                <!-- div slot="subtitle"></div -->
            </div>
        </q-card-section>
        <q-card-section>
            <p>{{ props.collection.description[locale] || props.collection.description.en }}</p>
        </q-card-section>
        <q-card-actions>
            <q-btn flat color="primary"
                   :to="{ name: 'collection', params: {collectionCode: props.collection.code }}">
                {{ $t('message.collectionlist.open') }}
            </q-btn>
        </q-card-actions>
    </q-card>
    </template>
</oarepo-collection-list>
</template>

<script>

import Vue from 'vue';
import Component from 'vue-class-component';


export default @Component({
    name: 'oarepo-quasar-collection-list',
    props: {
        collectionListModule: Object,
    },
})
class OARepoQuasarCollection extends Vue {
    get locale() {
        return this.$i18n.locale;
    }
}
</script>
