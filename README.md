# invenio-quasar

A library for providing simple (but configurable) UI for ``@oarepo/invenio-api-vuex``

## Installation
```
yarn add @oarepo/invenio-quasar \
         @oarepo/invenio-api-vuex \
         @oarepo/vuex-preloader \
         @oarepo/vue-query-synchronizer \
         vue-uid axios deepmerge vuex-class-modules
```

To register/configure the library, add a new boot file to quasar 
(or main.js for vue-cli projects):

```javascript
import InvenioApi from '@oarepo/invenio-api-vuex'
import InvenioQuasar from '@oarepo/invenio-quasar'
import VueUid from 'vue-uid';
import VuexPreloader from '@oarepo/vuex-preloader'
import VueQuerySynchronizer from '@oarepo/vue-query-synchronizer'


export default async ({ Vue, store, router }) => {
    Vue.use(InvenioApi, {
        store,
        router,
        apiUrl: '/api'
    })
    Vue.use(VueUid);
   
    Vue.use(VuexPreloader, {
        router, store
    })
    
    Vue.use(VueQuerySynchronizer, {
        passUnknownProperties: true,
        router
    })

    Vue.use(InvenioQuasar, {
        
    })
 }
```

## Usage

### Collection

To show a collection as a list/table, create your own page ``CollectionPage`` 
and register it into the router:

```javascript
routes = [
    routerCollection({
        path: '/:collectionId',
        component: CollectionPage,
        props: query()
    })
]
``` 

Or, for a single collection:

```javascript
routes = [
    routerCollection({
        path: '/',
        component: CollectionPage,
        props: query([], {collectionId: 'records'})
    })
]
``` 

Inside the component, use either ``<oarepo-collection-card-list>`` or ``<oarepo-collection-table>``.
See the Components section below for the configuration, slots and signals.


## Components

The library provides the following components:

``OARepoFacets``<br>
``<oarepo-facets>``

A list of facets using QExpansionList

``OARepoCollectionCardList``<br>
``<oarepo-collection-card-list>``

A renderer for a single collection that presents the records as a list of QCards

``OARepoCollectionTable``<br>
``<oarepo-collection-table>``

A rendered for a single collection that presents the records as QTable

``OARepoRecord``<br>
``<oarepo-record>``

A renderer for a single record

``OARepoRecordInplaceEditor``<br>
``<oarepo-record-inplace-editor>``

A renderer of an in-place single-property record editor

``OARepoRecordFormEditor``<br>
``<oarepo-record-form-editor>``

An editor component for a single record

### ``OARepoFacets``


