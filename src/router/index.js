import Vue from 'vue';
import VueRouter from 'vue-router';
import { routerCollection } from '@oarepo/invenio-api-vuex';
import { query } from '@oarepo/vue-query-synchronizer';
import CollectionPage from '../components/CollectionPage';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: '/list'
    },
    routerCollection({
        path: '/list',
        component: CollectionPage,
        props: query([], { collectionId: 'records' })
    })
];

const router = new VueRouter({
    routes
});

export default router;
