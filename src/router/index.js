import Vue from 'vue';
import VueRouter from 'vue-router';
import { routerCollection } from '@oarepo/invenio-api-vuex';
import { query } from '@oarepo/vue-query-synchronizer';
import CollectionPage from '../components/CollectionPage';
import CollectionPageImageIcon from '../components/CollectionPageImageIcon';
import CollectionPageFunctionIcon from '../components/CollectionPageFunctionIcon';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: '/list-simple'
    },
    routerCollection({
        name: 'list-simple',
        path: '/list-simple',
        component: CollectionPage,
        props: query([], { collectionId: 'records' })
    }),
    routerCollection({
        name: 'list-image-icon',
        path: '/list-image-icon',
        component: CollectionPageImageIcon,
        props: query([], { collectionId: 'records' })
    }),
    routerCollection({
        name: 'list-function-icon',
        path: '/list-function-icon',
        component: CollectionPageFunctionIcon,
        props: query([], { collectionId: 'records' })
    })
];

const router = new VueRouter({
    routes
});

export default router;
