import Vue from 'vue';
import VueRouter from 'vue-router';
import { routerCollection } from '@oarepo/invenio-api-vuex';
import { query } from '@oarepo/vue-query-synchronizer';
import CollectionPage from '../components/CollectionPage';
import CollectionPageImageIcon from '../components/CollectionPageImageIcon';
import CollectionPageFunctionIcon from '../components/CollectionPageFunctionIcon';
import CollectionValuesNoComponentPage from '../components/CollectionValuesNoComponentPage';
import CollectionValuesTablePage from '../components/CollectionValuesTablePage';
import CollectionValuesCustomComponentPage from '../components/CollectionValuesCustomComponentPage';
import CollectionValuesCustomComponentElementPage from '../components/CollectionValuesCustomComponentElementPage';
import CollectionRecordComponentPage from '../components/CollectionRecordComponentPage';
import CollectionRecordComponentFactoryPage from '../components/CollectionRecordComponentFactoryPage';
import CollectionRecordSlotPage from '../components/CollectionRecordSlotPage';

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
    }),
    routerCollection({
        name: 'list-no-component',
        path: '/list-no-component',
        component: CollectionValuesNoComponentPage,
        props: query([], { collectionId: 'records' })
    }),
    routerCollection({
        name: 'list-table',
        path: '/list-table',
        component: CollectionValuesTablePage,
        props: query([], { collectionId: 'records' })
    }),
    routerCollection({
        name: 'list-prop-value-component',
        path: '/list-prop-value-component',
        component: CollectionValuesCustomComponentPage,
        props: query([], { collectionId: 'records' })
    }),
    routerCollection({
        name: 'list-prop-component',
        path: '/list-prop-component',
        component: CollectionValuesCustomComponentElementPage,
        props: query([], { collectionId: 'records' })
    }),
    routerCollection({
        name: 'list-component',
        path: '/list-component',
        component: CollectionRecordComponentPage,
        props: query([], { collectionId: 'records' })
    }),
    routerCollection({
        name: 'list-component-factory',
        path: '/list-component-factory',
        component: CollectionRecordComponentFactoryPage,
        props: query([], { collectionId: 'records' })
    }),
    routerCollection({
        name: 'list-slot',
        path: '/list-slot',
        component: CollectionRecordSlotPage,
        props: query([], { collectionId: 'records' })
    }),

];

const router = new VueRouter({
    routes
});

export default router;
