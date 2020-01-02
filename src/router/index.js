import Vue from 'vue';
import VueRouter from 'vue-router';
import { routerCollection } from '@oarepo/invenio-api-vuex';
import { query } from '@oarepo/vue-query-synchronizer';
import CollectionPage from '../components/lists/CollectionPage';
import CollectionPageImageIcon from '../components/lists/CollectionPageImageIcon';
import CollectionPageFunctionIcon from '../components/lists/CollectionPageFunctionIcon';
import CollectionValuesNoComponentPage from '../components/lists/CollectionValuesNoComponentPage';
import CollectionValuesTablePage from '../components/lists/CollectionValuesTablePage';
import CollectionValuesCustomComponentPage from '../components/lists/CollectionValuesCustomComponentPage';
import CollectionValuesCustomComponentElementPage from '../components/lists/CollectionValuesCustomComponentElementPage';
import CollectionRecordComponentPage from '../components/lists/CollectionRecordComponentPage';
import CollectionRecordComponentFactoryPage from '../components/lists/CollectionRecordComponentFactoryPage';
import CollectionRecordSlotPage from '../components/lists/CollectionRecordSlotPage';
import CollectionRecordUILinkPage from '../components/lists/CollectionRecordUILinkPage';
import CollectionCardsPage from '../components/cards/CollectionCardsPage';
import CollectionCardsGridPage from '../components/cards/CollectionCardsGridPage';
import CollectionTablePage from '../components/table/CollectionTablePage';
import RecordRendererPage from '../components/misc/DataRendererPage';

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
    routerCollection({
        name: 'cards-simple',
        path: '/cards-simple',
        component: CollectionCardsPage,
        props: query([], { collectionId: 'records' })
    }),
    routerCollection({
        name: 'cards-grid',
        path: '/cards-grid',
        component: CollectionCardsGridPage,
        props: query([], { collectionId: 'records' })
    }),
    routerCollection({
        name: 'list-ui-link',
        path: '/list-ui-link',
        component: CollectionRecordUILinkPage,
        props: query([], { collectionId: 'records' })
    }),
    routerCollection({
        name: 'table-simple',
        path: '/table-simple',
        component: CollectionTablePage,
        props: query([
            'number:page:1',
            'number:size:10',
            'sort'
        ], { collectionId: 'records' })
    }),
    {
        name: 'record-renderer',
        path: '/record-renderer',
        component: RecordRendererPage
    }
];

const router = new VueRouter({
    routes
});

export default router;
