<template>
<oarepo-collection-list>
    <template v-slot:default="{ collections }">
    <div class="row justify-around">
        <q-card inline flat bordered square class="q-ma-sm" style="max-width: 500px;"
                v-for="collection of shownCollections(collections)" :key="collection.code">
            <q-card-section>
                <div class="text-h6">
                    {{ collection.title[locale] || collection.title.en }}
                    <!-- div slot="subtitle"></div -->
                </div>
            </q-card-section>
            <q-card-section>
                <p>{{ collection.description[locale] || collection.description.en }}</p>
            </q-card-section>
            <q-card-actions>
                <q-btn flat color="primary"
                       :to="{ name: 'collection', params: {collectionCode: collection.code }}">
                    {{ $t('message.collectionlist.open') }}
                </q-btn>
            </q-card-actions>
        </q-card>
    </div>
    </template>
</oarepo-collection-list>
</template>

<script>

import Vue from 'vue';
import Component from 'vue-class-component';


export default @Component({
    name: 'oarepo-quasar-collection-list',
})
class OARepoQuasarCollection extends Vue {
    get locale() {
        return this.$i18n.locale;
    }

    shownCollections(collections) {
        return collections.filter(x => !x.hidden);
    }
}
</script>
