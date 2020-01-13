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
    + [Record Rendering](#record-rendering)
      - [Default record renderer](#default-record-renderer)
      - [Supplying your own component or component factory](#supplying-your-own-component-or-component-factory)
      - [Using slot to set your own rendering code](#using-slot-to-set-your-own-rendering-code)
    + [Record UI url](#record-ui-url)
  * [``OARepoCollectionCards``](#oarepocollectioncards)
  * [``OARepoCollectionTable``](#oarepocollectiontable)
  * [``OARepoRecord``](#oareporecord)
  * [``OARepoRecordInplaceEditor``](#oareporecordinplaceeditor)
  * [``OARepoRecordFormEditor``](#oareporecordformeditor)
  * [DataRenderer](#datarenderer)
    + [Overriding elements with slots](#overriding-elements-with-slots)
    + [Overriding elements with custom components](#overriding-elements-with-custom-components)
    + [Translating labels](#translating-labels)
    + [Dynamic definition](#dynamic-definition)

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
import DataRenderer from '@oarepo/data-renderer'


export default async ({ Vue, store, router }) => {
    Vue.use(DataRenderer, {
        icon: {
            component: 'q-icon',
            attrs: {
                name: ({layout}) => {
                    return layout.icon && layout.icon.value
                },
            }
        }
    });
    
    Vue.use(InvenioApi, {
        store,
        router,
        apiUrl: '/api'
    })
    Vue.use(VueUid);
   
    Vue.use(VuexPreloader, {
        router, store,
        injection: true,
    })
    
    Vue.use(VueQuerySynchronizer, {
        passUnknownProperties: true,
        router
    })

    Vue.use(InvenioQuasar, {
        
    })
 }
```

**Note**: To use the provided editor components, you have to configure the ``VuexPreloader``
to use injection. This is not needed for view-only components.

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
    oarepo-collection-list(:query="query" itemClass="" itemStyle="")
</template>
```

#### Record Rendering

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
See [CollectionPage.vue](src/components/lists/CollectionPage.vue) for a custom icon name,
[CollectionPageImageIcon.vue](src/components/lists/CollectionPageImageIcon.vue) for 
an icon taken from the data, 
[CollectionPageFunctionIcon.vue](src/components/lists/CollectionPageFunctionIcon.vue) for
an icon given as a result of a function.

###### Record properties

This component internally uses [``DataRenderer``](#datarenderer).
To change the presented data, set the ``:display`` property:

```jade
<template lang="pug">
q-page.flex.q-ma-lg
    oarepo-collection-list(:query="query", :display="valuesDefinition")
</template>
```

An example of definition object with attrs but without component is at 
[CollectionValuesNoComponentPage.vue](src/components/lists/CollectionValuesNoComponentPage.vue)

Tabular layout of props is at 
[CollectionValuesTablePage.vue](src/components/lists/CollectionValuesTablePage.vue).
This example also shows that a child value might be a callable as well.

Example at [CollectionValuesCustomComponentPage.vue](src/components/lists/CollectionValuesCustomComponentPage.vue)
shows the way of using a custom component for rendering values.
The component gets ``:part`` containing the ``definitionObject`` with an added ``value`` property.

Example at [CollectionValuesCustomComponentElementPage.vue](src/components/lists/CollectionValuesCustomComponentElementPage.vue)
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

See example at [CollectionRecordComponentPage.vue](src/components/lists/CollectionRecordComponentPage.vue)

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

See example at [CollectionRecordComponentFactoryPage.vue](src/components/lists/CollectionRecordComponentFactoryPage.vue)

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

**Handler as a prop to ``oarepo-collection-list``**

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

If the handler is supplied, its return value is used instead of the ``record.links.ui`` value.

### ``OARepoCollectionCards``
``<oarepo-collection-cards>``

A renderer for a single collection that presents the records as a grid of QCards. Similarly to 
``OARepoCollectionList`` this component can display the record with the help of display definition, 
custom component or factory or a filled slot. See the section above for details.

```pug
oarepo-collection-cards(:query="query" :display='displayDefinition' itemClass="" itemStyle="")

oarepo-collection-cards(:query="query" :component='MyComponent')

oarepo-collection-cards(:query="query" :componentFactory='createComponent')

oarepo-collection-cards(:query="query")
    template(v-slot:default="{record, url}")
        q-card ...
``` 


### ``OARepoCollectionTable``
``<oarepo-collection-table>``

A rendered for a single collection that presents the records as QTable

```pug
oarepo-collection-table(:query="query" 
                        :display='displayDefinition'
                        :grid-display='gridDisplayDefinition'
                        grid-card-class='q-table__grid-item col-xs-12 col-sm-6 col-md-4 col-lg-3'
                        card-class=''
)
    /* can use any qtable slots here */
``` 

``displayDefinition`` is a list of ``definitionObjects`` as defined earlier. The ``label`` of the 
object will be used for the heading of the table. 

``gridDisplay`` is used when the table is displayed in the grid mode (for example on lower resolutions).
If not set, ``displayDefinition`` is used with the modification that labels are followed by ':'.
This can be changed by defining ``gridLabel`` property on the column.

Property ``grid-card-class`` gives the class of the wrapper record element in grid layout.
Property ``card-class`` gives the class of the card element.

### ``OARepoRecord``
``<oarepo-record>``

A renderer for a single record

```pug
oarepo-record(:display='displayDefinition' :options="options")
    /* can use any data-renderer slots here; :options are any data-renderer options */
``` 


### ``OARepoRecordInplaceEditor``
``<oarepo-record-inplace-editor :options="options" storeModule="oarepoRecord" :layout="optional layout">``

In-place single-property record editor. The ``options`` dictionary
contains options that will be passed to the underlying ``data-renderer``. ``storeModule``
is a path to a store module that contains the loaded record and whose ``patch`` action 
will be used to store any changes. The record to be displayed (and edited) will be fetched
automatically from the provided store module (it must be already loaded in the store module,
no explicit load is performed). 

#### Initially undefined values

With the configuration mentioned above, the record editor only displays the values present
in the loaded record. To be able to edit values not present in the editor, you have to define
the expected document structure.

To do this, pass ``showEmpty`` in the options and add ``layout`` definition with 
the complete record structure.

```javascript

const options = {
  showEmpty: true,
}

const  layout = [
    'title',
    'creator',
    'created',
    { 
      path: 'location',
      label: 'Location',
      children: [
        'street', 
        'number', 
        'city', 
        'zipcode'
      ]
    }
  ]
```

#### Arrays

To be able to work with arrays of values, the component needs to know if a value is supposed
to be a scalar or an array.

If the array is present in the data, the component will pick it up and allow adding/removing
values from the array.

If the array might not be initially present, add ``array: true`` into the layout definition.

For example:

```javascript
const  layout = [
    { 
        path: 'keywords',
        array: true
    }
  ]
```

#### Validation rules

#### Custom value editor



Implicitly with dynamic definition
the editor can edit only the properties present in the document. 

### ``OARepoRecordFormEditor``
``<oarepo-record-form-editor>``

An editor component for a single record
