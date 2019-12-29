# invenio-quasar

A library for providing simple (but configurable) UI for ``@oarepo/invenio-api-vuex``

<!-- toc -->

- [Installation](#installation)
- [Usage](#usage)
  * [Collection](#collection)
- [Components](#components)
  * [``OARepoFacets``](#oarepofacets)
  * [``OARepoCollectionList``](#oarepocollectionlist)
  * [``OARepoCollectionCards``](#oarepocollectioncards)
  * [``OARepoCollectionTable``](#oarepocollectiontable)
  * [``OARepoRecord``](#oareporecord)
  * [``OARepoRecordInplaceEditor``](#oareporecordinplaceeditor)
  * [``OARepoRecordFormEditor``](#oareporecordformeditor)

<!-- tocstop -->

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

Inside the component, use either ``<oarepo-collection-list>``,
``<oarepo-collection-cards>`` 
or ``<oarepo-collection-table>``.
See the Components section below for the configuration, slots and signals.


## Components

The library provides the following components:

### ``OARepoFacets``
``<oarepo-facets>``

A list of facets using QExpansionList

### ``OARepoCollectionList``
``<oarepo-collection-list>``

A renderer for a single collection that presents the records as a list.

```jade
<template lang="pug">
q-page.flex.q-ma-lg
    oarepo-collection-list(:query="query")
</template>
```

#### Custom Rendering

There are three alternatives for custom rendering of record item:

* Configuring which properties should be shown
* Supplying your own component or component factory
* Using slot to set your own rendering code

##### Configuring shown properties

###### Icon

Tpo change the icon, set the ``:icon`` property:

```jade
<template lang="pug">
q-page.flex.q-ma-lg
    oarepo-collection-list(:query="query", :icon="iconObject")
</template>
```

The ``iconObject`` can be either an object with the following structure or 
a function accepting record and returning the object
``iconData(record, thisVue) -> iconObject``. 

```javascript
iconObject = {
    // only one of the following properties should be contained
    name: 'iconName',
    namePath: 'xpath to metadata that gives icon name',
    url: 'url of the image that should be used as an icon',
    urlPath: 'xpath to the record metadata that gives icon image',
    // the following props can be added as well
    cssClass: 'list of css classes to be set on the icon/image element'
}
```
See [CollectionPage.vue](src/components/CollectionPage.vue) for a custom icon name,
[CollectionPageImageIcon.vue](src/components/CollectionPageImageIcon.vue) for 
an icon taken from the data, 
[CollectionPageFunctionIcon.vue](src/components/CollectionPageFunctionIcon.vue) for
an icon given as a result of a function.

###### Shown data


#### Clickable URLs


### ``OARepoCollectionCards``
``<oarepo-collection-cards>``

A renderer for a single collection that presents the records as a grid of QCards

### ``OARepoCollectionTable``
``<oarepo-collection-table>``

A rendered for a single collection that presents the records as QTable

### ``OARepoRecord``
``<oarepo-record>``

A renderer for a single record

### ``OARepoRecordInplaceEditor``
``<oarepo-record-inplace-editor>``

A renderer of an in-place single-property record editor

### ``OARepoRecordFormEditor``
``<oarepo-record-form-editor>``

An editor component for a single record

