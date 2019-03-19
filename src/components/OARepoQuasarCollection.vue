<template>
<oarepo-collection :collectionCode="collectionCode"
                   :locale="locale"
                   ref="oarepoCollection"
                   @dataLoaded="dataLoaded">

    <template v-slot:default="{ collection, items, aggregations }">

    <slot name="title" v-bind:collection="collection" v-bind:items="items" v-bind:aggregations="aggregations">
        <h3>{{ collection.title[locale] || collection.title.en }}</h3>
    </slot>

    <slot name="content-before" v-bind:collection="collection">
    </slot>

    <div class="row horiz wrap items-stretch">  <!-- use 'row' class to define a container / parent -->
        <div class="col collection-content">

            <slot name="list-before" v-bind:collection="collection">
            </slot>

            <q-infinite-scroll @load="onLoad" :disable="scrollDisabled" :offset="300">
                <q-list>

                    <slot name="list-header" v-bind:collection="collection">
                    </slot>

                    <q-item v-for="item in items" v-bind:key="item.id" clickable v-ripple @click="itemSelected(item)">
                        <slot name="list-item" v-bind:item="item">
                            <q-item-section avatar v-if="item.metadata">
                                <q-avatar>
                                    <slot name="list-item-avatar" v-bind:item="item">
                                        <img src="statics/boy-avatar.png">
                                    </slot>
                                </q-avatar>
                            </q-item-section>
                            <q-item-section>
                                <slot name="list-item-main" v-bind:item="item">
                                    <div class="document_title">
                                        <slot name="list-item-main-before-title" v-bind:item="item"></slot>
                                        <slot name="list-item-main-title" v-bind:item="item">
                                    <span
                                            v-html="sanitize(item.metadata.title[locale] || item.metadata.title._)"></span>
                                        </slot>
                                    </div>
                                    <div class="document_subtitle"
                                         v-if="item.metadata.title._ && item.metadata.title[locale] !== item.metadata.title._"
                                    >
                                        <slot name="list-item-main-before-origtitle" v-bind:item="item"></slot>
                                        <slot name="list-item-main-origtitle" v-bind:item="item">

                                            {{ $t('message.original_title') }}
                                            <span v-html="sanitize(item.metadata.title._)"></span>
                                        </slot>
                                    </div>
                                    <div class="document_author">
                                        <slot name="list-item-main-before-author" v-bind:item="item"></slot>
                                        <slot name="list-item-main-author" v-bind:item="item">
                                            <span v-for="creator in item.metadata.creator" v-bind:key="creator">{{ creator }}</span>
                                            ●
                                            {{
                                            $d(new Date(item.metadata.date_available)) }}
                                        </slot>
                                    </div>
                                </slot>
                            </q-item-section>
                        </slot>
                    </q-item>
                </q-list>
                <template v-slot:loading>
                <div class="row justify-center q-my-md">
                    <q-spinner-dots color="primary" size="40px"/>
                </div>
                </template>
            </q-infinite-scroll>

            <slot name="list-after" v-bind:collection="collection">
            </slot>

        </div>  <!-- children will default to 'col'  -->
        <div class="aggs collection-facets">
            <oarepo-quasar-search :input="searchString" class="q-mb-lg"></oarepo-quasar-search>
            <oarepo-quasar-facet-list :facets="aggregations"></oarepo-quasar-facet-list>
        </div>
    </div>

    <slot name="content-after" v-bind:collection="collection">
    </slot>
    </template>

</oarepo-collection>
</template>

<script>

import Vue from 'vue';
import Component from 'vue-class-component';
import { Emit } from 'vue-property-decorator';
import sanitizeHtml from 'sanitize-html';

export default @Component({
    props: {
        collectionCode: String,
    },
    components: {},
    name: 'oarepo-quasar-collection',
})
class OARepoCollection extends Vue {
    page = 1;

    enabled = true;

    get locale() {
        return this.$i18n.locale;
    }

    get scrollDisabled() {
        return !(this.enabled && this.oarepo$.collectionModule.loaded);
    }

    get searchString() {
        return '';
    }

    sanitize(html) {
        return sanitizeHtml(html);
    }

    onLoad(index, done) {
        setTimeout(() => {
            this.page += 1;
            this.oarepo$.collectionModule.loadNextPage()
                .then(({ response }) => {
                    this.enabled = response.hits.hits.length > 0;
                    done();
                });
        }, 10);
    }

    dataLoaded({ append }) {
        if (!append) {
            this.enabled = true;
            this.loaded();
        }
    }

    @Emit('itemSelected')
    itemSelected(item) {
        return item;
    }

    @Emit('collectionLoaded')
    loaded() {
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
</style>
