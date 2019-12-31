# invenio-quasar

A library for providing simple (but configurable) UI for ``@oarepo/invenio-api-vuex``

<!-- toc -->

- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
  * [Collection](#collection)
- [Components](#components)
  * [``OARepoFacets``](#oarepofacets)
  * [``OARepoCollectionList``](#oarepocollectionlist)
    + [Custom Rendering](#custom-rendering)
      - [Default record renderer](#default-record-renderer)
      - [Supplying your own component or component factory](#supplying-your-own-component-or-component-factory)
      - [Using slot to set your own rendering code](#using-slot-to-set-your-own-rendering-code)
    + [Record UI url](#record-ui-url)
  * [``OARepoCollectionCards``](#oarepocollectioncards)
  * [``OARepoCollectionTable``](#oarepocollectiontable)
  * [``OARepoRecord``](#oareporecord)
  * [``OARepoRecordInplaceEditor``](#oareporecordinplaceeditor)
  * [``OARepoRecordFormEditor``](#oareporecordformeditor)

<!-- tocstop -->

## Demo

See the demo running at [http://mesemus.no-ip.org/demo-invenio-quasar](http://mesemus.no-ip.org/demo-invenio-quasar)

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

##### Default record renderer

###### Icon

To change the icon, set the ``:icon`` property:

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
    namePath: 'jsonpath to metadata that gives icon name',
    url: 'url of the image that should be used as an icon',
    urlPath: 'jsonpath to the record metadata that gives icon image',
    // the following props can be added as well
    iconClass: 'list of css classes to be set on the icon element',
    iconStyle: 'extra css style for the icon',
    imageClass: 'list of css classes to be set on the image element',
    imageStyle: 'extra css style for the image',
    avatarClass: 'list of css classes to be set on the avatar wrapper',
    avatarStyle: 'extra css style for the avatar wrapper',
}
```
See [CollectionPage.vue](src/components/CollectionPage.vue) for a custom icon name,
[CollectionPageImageIcon.vue](src/components/CollectionPageImageIcon.vue) for 
an icon taken from the data, 
[CollectionPageFunctionIcon.vue](src/components/CollectionPageFunctionIcon.vue) for
an icon given as a result of a function.

###### Record properties

To change the presented data, set the ``:display`` property:

```jade
<template lang="pug">
q-page.flex.q-ma-lg
    oarepo-collection-list(:query="query", :display="valuesDefinition")
</template>
```

The ``valuesDefinition`` is a list of ``definitionObject`` or ``definitionContainer``
or a function accepting record and returning the list
``valuesDefinition(record, thisVue) -> List[definitionObject|definitionContainer]``:

```javascript
definitionObject = {
   element: 'wrapper element name, defaults to div; set to null to not use wrapper',
   elementClass: 'extra class(es)',
   elementStyle: 'extra style',
   elementAttrs: {}, // extra html attrs
   label: 'the label to be shown',
   labelElement: 'the label element, defaults to label',
   labelClass: 'extra label class(es)',
   labelStyle: 'extra label style',
   labelAttrs: {},  // extra html attrs
   valueClass: 'extra value class',
   valueStyle: 'extra value style',
   valueAttrs: {},  // extra html attrs
   valueElement: 'the value element, defaults to span. Set to null to disable value display',
   path: 'jsonpath to the record metadata that gives the value',
   component: 'custom component to display the value, if not set valueElement will be used',
   groupValues: '' // if the result of jsonpath is array with multiple values and custom component is used, 
                   // setting this to true will supply the component with part.value=array.
                   // Otherwise the component is called multiple times with each value
}

definitionContainer = {
   element: 'element name',
   elementClass: 'extra class(es)',
   elementStyle: 'extra style',
   elementAttrs: {}, // extra html attrs
   label: 'the label to be shown',
   labelClass: 'extra label class(es)',
   labelStyle: 'extra label style',
   labelAttrs: {},  // extra html attrs
   path: 'jsonpath to the record metadata that gives the base value for children',
   children: [definitionObject, definitionContainer],   
   childrenClass: 'extra class(es) to be prepended for each child',
   childrenStyle: 'extra style to be prepended for each child',
   childrenAttrs: {}, // extra html attrs
}
```

Every property except component can be a function ``func(metadata, definitionObject, record, vue_inst)``
where metadata are metadata at the actual path

An example of definition object with attrs but without component is at 
[CollectionValuesNoComponentPage.vue](src/components/CollectionValuesNoComponentPage.vue)

Tabular layout of props is at 
[CollectionValuesTablePage.vue](src/components/CollectionValuesTablePage.vue).
This example also shows that a child value might be a callable as well.

Example at [CollectionValuesCustomComponentPage.vue](src/components/CollectionValuesCustomComponentPage.vue)
shows the way of using a custom component for rendering values.
The component gets ``:part`` containing the ``definitionObject`` with an added ``value`` property.

Example at [CollectionValuesCustomComponentElementPage.vue](src/components/CollectionValuesCustomComponentElementPage.vue)
shows the way of using a custom component for rendering the whole property component, without labels nor other decorations

##### Supplying your own component or component factory

A custom component can be passed via the ``:component`` property.
The component will receive ``:record`` prop.

```jade
<template lang="pug">
q-page.flex.q-ma-lg
    oarepo-collection-list(:query="query" :component="CustomComponent")
</template>
```

See example at [CollectionRecordComponentPage.vue](src/components/CollectionRecordComponentPage.vue)

###### ComponentFactory

A factory can be supplied with a signature ``factory(record, _vueList) -> Component``

```vue
<template lang="pug">
q-page.flex.q-ma-lg
    oarepo-collection-list(:query="query" :componentFactory="componentFactory")
</template>

<script>
import CustomComponent from './CustomComponent.vue'

export default {
    methods: {
        componentFactory(record, _vueList) {
            // do some decision and 
            return CustomComponent
        }
    }
}
</script>
```

See example at [CollectionRecordComponentFactoryPage.vue](src/components/CollectionRecordComponentFactoryPage.vue)

##### Using slot to set your own rendering code

If you want to have a complete control over the rendering and do not want to create an extra component,
you can use the default slot of the ``oarepo-collection-list``. The slot gets ``{record, url}`` in the 
context (the url being the url of the _ui_ page of the record). See [Record UI url](#record-ui-url)
section for details.

Please note that the template is rendered as a direct child of ``q-list``, so it is best to use ``q-item``
as the template's element:

```vue
<template lang="pug">
q-page.q-ma-lg
    oarepo-collection-list(:query="query")
        template(v-slot:default="{record, url}")
            q-item(:to="url" clickable)
                q-item-section
                    pre {{ record.metadata }}
</template>

<style>
</style>

<script>

export default {
    props: {
        query: Object
    }
};
</script>
```

#### Record UI url

This library counts on ``ui`` key present in ``links`` section of the record. It can be added there via:

**server side** 

using a custom link serializer. This might be the preferred solution as even machine client getting the json
can get the URL of the user representation of the record.

**@oarepo/invenio-api-vuex** configuration

You can supply ``@oarepo/invenio-api-vuex`` with a handler function (``defaultListRecordPreprocessors``, 
``listRecordPreprocessors``) that is called after a list of records is fetched from the server.
This function can infer the UI url (for example, from ``$schema`` or ``collectionId``) and place it in links

See [https://github.com/oarepo/invenio-api-vuex#configuration](https://github.com/oarepo/invenio-api-vuex#configuration)
for more info on that. 

**Handler as a prop to ``oarepo-collection-list``

You can also supply the handler directly on ``oarepo-collection-list``:

```vue
<template lang="pug">
q-page.q-ma-lg
    oarepo-collection-list(:query="query" :url-getter="urlGetter")
</template>

<style>
</style>

<script>

export default {
    props: {
        query: Object
    },
    methods: {
        urlGetter (record) {
            return `/records/${record.metadata.id}`
        }
    }
};
</script>
```

If the handler is supplied, it takes preference over the ``record.links.ui`` value.

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

