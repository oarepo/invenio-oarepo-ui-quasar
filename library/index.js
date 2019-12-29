import OARepoCollectionList from './components/OARepoCollectionList.vue';

export default {
    install(Vue, options) {
        Vue.component(OARepoCollectionList.name, OARepoCollectionList)
        console.log(options)
    }
};
