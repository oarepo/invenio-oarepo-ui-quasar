<template>
<q-item clickable v-ripple @click="selected">
    <slot name="list-item" v-bind:item="item">
        <q-item-section avatar v-if="item.metadata" class="justify-start-important">
            <q-avatar square>
                <slot name="list-item-avatar" v-bind:item="item">
                    <img src="statics/boy-avatar.png">
                </slot>
            </q-avatar>
        </q-item-section>
        <q-item-section>
            <slot name="list-item-main" v-bind:item="item">
                <slot name="list-item-main-title-block" v-bind:item="item">
                    <div class="document_title">
                        <slot name="list-item-main-before-title" v-bind:item="item"></slot>
                        <slot name="list-item-main-title" v-bind:item="item">
                            <span>{{item.metadata.title}}</span>
                        </slot>
                    </div>
                </slot>
                <slot name="list-item-main-subtitle-block" v-bind:item="item">
                    <div class="document_subtitle">
                        <slot name="list-item-main-before-subtitle" v-bind:item="item"></slot>
                        <slot name="list-item-main-subtitle" v-bind:item="item"></slot>
                    </div>
                </slot>
                <slot name="list-item-main-author-block" v-bind:item="item">
                    <div class="document_author">
                        <slot name="list-item-main-before-author" v-bind:item="item"></slot>
                        <slot name="list-item-main-author" v-bind:item="item">
                            &nbsp;
                            <span>{{ item.metadata.creator }}</span>
                            <span v-if="item.metadata.available">
                                                ●
                                                {{ $d(new Date(item.metadata.available)) }}
                                            </span>
                        </slot>
                    </div>
                </slot>
            </slot>
        </q-item-section>
    </slot>
</q-item>
</template>

<script>

import { Vue, Component, Emit } from 'vue-property-decorator';

export default @Component({
    props: {
        item: Object,
    },
    components: {},
    name: 'oarepo-quasar-collection-list-item',
})
class OARepoQuasarCollectionListItem extends Vue {
    @Emit('selected')
    selected() {
        return this.item;
    }
}
</script>

<style scoped>
.document_title {
    font-weight: bold;
}

.document_subtitle {
    font-style: italic;
    color: gray;
}

.justify-start-important {
    justify-content: start !important;
}

.q-avatar {
    border: 1px solid #eeeeee;
    border-radius: 0;
    margin: 2px;
}
</style>
