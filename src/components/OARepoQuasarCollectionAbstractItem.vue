<template>
<component :is="component" v-if="component" :item="item" @selected="selected"></component>
</template>

<script>

import { Vue, Component, Emit } from 'vue-property-decorator';

export default @Component({
    props: {
        item: Object,
        mapping: Object,
        omitList: Boolean,
    },
    components: {},
    name: 'oarepo-quasar-collection-abstract-list-item',
})
class OARepoQuasarCollectionAbstractListItem extends Vue {
    get component() {
        const schema = this.item.metadata.$schema;
        if (this.mapping !== undefined && this.mapping[schema] !== undefined) {
            return this.mapping[schema];
        }
        return () => import('./OARepoQuasarCollectionItem.vue');
    }

    @Emit('selected')
    selected(item) {
        return item;
    }
}
</script>
