<template>
<oarepo-collection :collectionCode="collectionCode"
                   :locale="locale"
                   ref="oarepoCollection">

    <template v-slot:default="{ collection, items, aggregations }">

    <slot name="title" v-bind:collection="collection" v-bind:items="items" v-bind:aggregations="aggregations">
        <h3 v-if="collection">{{ collection.title[locale] || collection.title.en }}</h3>
    </slot>

    <slot name="content-before" v-bind:collection="collection">
    </slot>

    <div class="row horiz wrap items-stretch">  <!-- use 'row' class to define a container / parent -->
        <div class="col collection-content">

            <slot name="list-before" v-bind:collection="collection">
            </slot>

            <div v-if="omitList">

                <slot name="list-header" v-bind:collection="collection">
                </slot>

                <abstract-item v-for="item in items"
                               :item="item"
                               v-bind:key="`omit-${item.id}`"
                               @selected="itemSelected(item)"
                               :mapping="itemComponents"
                               :omit-list="omitList"
                >
                </abstract-item>
            </div>
            <q-list v-else>

                <slot name="list-header" v-bind:collection="collection">
                </slot>

                <abstract-item v-for="item in items"
                               :item="item"
                               v-bind:key="item.id"
                               @selected="itemSelected(item)"
                               :mapping="itemComponents"
                >
                </abstract-item>
            </q-list>

            <q-pagination v-if="totalPages"
                          v-model="currentPage"
                          color="primary"
                          :max="totalPages"
                          :maxPages="9"
                          :boundaryNumbers="true"
                          :boundaryLinks="true"
                          :directionLinks="true"
                          class="pagination"
                          size="12px"
            ></q-pagination>

            <slot name="list-after" v-bind:collection="collection">
            </slot>

        </div>  <!-- children will default to 'col'  -->
        <div class="aggs collection-facets">
            <slot name="search-before" v-bind:collection="collection">
            </slot>
            <oarepo-quasar-search :input="searchString" class="q-mb-lg"></oarepo-quasar-search>
            <slot name="facets-before" v-bind:collection="collection">
            </slot>
            <oarepo-quasar-facet-list :facets="aggregations">
                <template v-slot:facetCard="{ facetKey, values }">
                   <slot name="facetCard" v-bind:facetKey="facetKey", v-bind:values="values"></slot>
                </template>
            </oarepo-quasar-facet-list>
            <slot name="facets-after" v-bind:collection="collection">
            </slot>
        </div>
    </div>

    <slot name="content-after" v-bind:collection="collection">
    </slot>
    </template>

</oarepo-collection>
</template>

<script>

import Vue from 'vue';
import { Emit, Component, Watch } from 'vue-property-decorator';
import sanitizeHtml from 'sanitize-html';
import { Query } from '@oarepo/invenio-oarepo-ui-vue';
import OARepoQuasarCollectionAbstractItem from './OARepoQuasarCollectionAbstractItem.vue';

export default @Component({
    props: {
        collectionCode: String,
        itemComponents: Object,
        omitList: Boolean,
    },
    components: {
        'abstract-item': OARepoQuasarCollectionAbstractItem,
    },
    name: 'oarepo-quasar-collection',
})
class OARepoCollection extends Vue {
    currentPage = 1;

    get locale() {
        return this.$i18n.locale;
    }

    get searchString() {
        const q = new Query(this.$route.query);
        return q.get('q', true);
    }

    get totalPages() {
        return this.oarepo$.collectionModule.totalPages;
    }

    sanitize(html) {
        return sanitizeHtml(html);
    }

    @Emit('item-selected')
    itemSelected(item) {
        console.log('item selected called');
        return item;
    }

    @Watch('currentPage')
    gotoPage() {
        const q = new Query(this.$route.query);
        q.replace('page', this.currentPage);
        this.$router.push({
            query: q.query,
        });
    }
}
</script>

<style scoped>
.b {
    font-weight: bold;
    padding-left: 20px;
}

.container {
    width: 100%;
}

.horiz {
    width: 100%;
}

.aggs {
    max-width: 25vw;
    width: 100%;
    padding-left: 20px;
    margin-left: 20px;
}

.document_title {
    font-weight: bold;
}

.document_subtitle {
    font-style: italic;
    color: gray;
}

.q-list {
    margin-bottom: 50px;
}

.pagination {
    padding-left: 68px;
    margin-bottom: 64px;
}
</style>
