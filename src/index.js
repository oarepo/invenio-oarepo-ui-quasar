/**
 *
 * OARepo vue.js default components to be used in vuejs based client for invenio repository
 *
 */
import OARepoQuasarCollectionList from './components/OARepoQuasarCollectionList.vue';
import OARepoQuasarCollection from './components/OARepoQuasarCollection.vue';
import OARepoQuasarCollectionItem from './components/OARepoQuasarCollectionItem.vue';
import OARepoQuasarFacetList from './components/OARepoQuasarFacetList.vue';
import OARepoQuasarValueCell from './components/OARepoQuasarValueCell.vue';
import OARepoQuasarSearch from './components/OARepoQuasarSearch.vue';


const OARepoQuasar = {
    install(Vue) {
        Vue.component('oarepo-quasar-collection-list', OARepoQuasarCollectionList);
        Vue.component('oarepo-quasar-collection', OARepoQuasarCollection);
        Vue.component('oarepo-quasar-collection-item', OARepoQuasarCollectionItem);
        Vue.component('oarepo-quasar-facet-list', OARepoQuasarFacetList);
        Vue.component('oarepo-quasar-value-cell', OARepoQuasarValueCell);
        Vue.component('oarepo-quasar-search', OARepoQuasarSearch);
    },
};

export {
    OARepoQuasarCollectionList,
    OARepoQuasarCollection,
    OARepoQuasarCollectionItem,
    OARepoQuasarFacetList,
    OARepoQuasarValueCell,
    OARepoQuasar,
};
