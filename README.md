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
oarepo-collection-table(:query="query" 
                        :display='displayDefinition'
                        :grid-display='gridDisplayDefinition'
                        grid-card-class='q-table__grid-item col-xs-12 col-sm-6 col-md-4 col-lg-3'
                        card-class=''
)
    /* can use any qtable slots here */
``` 


### ``OARepoRecordInplaceEditor``
``<oarepo-record-inplace-editor>``

A renderer of an in-place single-property record editor

### ``OARepoRecordFormEditor``
``<oarepo-record-form-editor>``

An editor component for a single record

### DataRenderer

``DataRenderer`` is a component that iterates a tree of definitions and converts the definition
into Vuejs component. Without any settings, the created component tree will look like:

```pug
wrapper.wrapperClass(:style="wrapperStyle" ...wrapperAttrs)
    label.labelClass(:style="labelStyle" ...labelAttrs)
    valueWrapper.valueWrapperClass(:style="valueWrapperStyle" ...valueWrapperAttrs)
        value.valueClass(:style="valueStyle" ...valueAttrs) {{ valueOnPath }}
        value.valueClass(:style="valueStyle" ...valueAttrs) {{ valueOnPath }}
    childWrapper.childWrapperClass(:style="childWrapperStyle" ...childWrapperAttrs)
        // children rendered in here
```

This tree is defined via the following definition:

```javascript

elementProperties = {
   class: {},           // element classes
   style: '',           // element style
   attrs: {},           // element attrs
   visible: true        // set to false to not render the element, just its content        
}

definition = {
   wrapper: {
       element: 'div',      
       ...elementProperties
   },
   label: {
       element: 'label',
       value: 'Label to be shown',
       ...elementProperties
   },
   valueWrapper: {
       element: 'div',      
       ...elementProperties
   },
   value: {
       element: 'div',      
       ...elementProperties
   },
   childrenWrapper: {
       element: 'div',      
       ...elementProperties
   },
   path: '',                // json path pointing to the displayed value inside record metadata
   link: '',                // if true, <router-link> will be rendered around the value
   showEmpty: false,        // if true, the element will be rendered even if there is no value 
   nestedChildren: false,   // if true, children are nested inside the valueWrapper element
   children: []             // any children definitions of this node
}
```

Every property can be a function ``func({context, definition, data, vue, paths})`` where context
points to the actual parts of data being rendered

To apply this definition, add to template:

```pug
data-renderer(:definition="definition" :data="data" :url="url for a router-link" 
              schema="block|inline|table|<object with default definition>"
              :debug="true")
```

#### Overriding elements with slots

Each part of the definition can be overridden with a template:

```pug
data-renderer(:definition="definition" :data="data" :url="url for a" :debug="true")
    template(v-slot:value-thumbnail="{context, definition, data, paths, value}")
        <img :src="value">
```

Names of slots are in the form ``<element>-<path>``. 

``path`` 

is json path to the element (without array indices) with '/' replaced by '-'. For example, for path
``authors[0]/firstName``, the path would be ``authors-firstName``.   

``element`` 

Element is one of ``wrapper``, ``label``, ``value-wrapper``, 
``value``, ``values``, ``children-wrapper``. 
All these slots are provided with ``{context, definition, data, paths}``.
In addition, ``value-wrapper`` and ``values`` are given the array of ``values``.
 ``value`` is given the current value (and will be called multiple times for each value).

When slots are matched, the best matching slot is used. For example, jsonpath ``people[0]/firstName``
and element ``wrapper`` the resolution will try the following slots:
 * ``-wrapper-people-firstName``
 * ``wrapper-people-firstName``
 * ``wrapper-firstName``
 
 The difference between the first two is that the first one matches only ``people/firstName`` in the root
 of data, the second one would match any path ending with ``people/firstName``.

#### Overriding elements with custom components

Alternatively the elements can be overridden with custom components. Each component receives the same props
as those above for templates. To pass the components, supply ``data-renderer`` with ``components`` property.
The value of the property is either:

 * object with keys (same as slot names) and value the Component to be rendered
 * function taking ``({context, definition, data, paths, element})`` (element is 
   ``wrapper``, ``label``, ``value-wrapper``, ``value``, ``values``, ``children-wrapper``) 
   and returning 
   - vue Component
   - ``null`` if the element should not be rendered at all
   - ``undefined`` to use default rendering of the element 

#### Translating labels

A function can be registered to create/translate labels. Set either a global labelTranslator when the module is
initialized or a ``:labelTranslator`` prop containing function with the following definition:

``func({label, context, definition, data, vue, paths, schema})``

and returning the translated label or null if the label should not appear. The default implementation adds ':'
after the label for ``inline`` schema. 

#### Dynamic definition

There might be cases when the definition of the object is not known in advance and
the data (or a subtree of data) should be rendered as they are. In these cases
the definition can be created "on-the-fly".

To use this feature, either do not pass ``definition`` at all or pass the known
part of the definition and annotate the elements to be rendered dynamically
as ``dynamic: true`` (or use the global ``dynamicDefinition`` option or prop).

It might be useful to have the whole definition or parts dynamic but provide
custom definition for selected paths. To do this, pass ``:pathDefinitions``
property.

The value of the property is either:

 * object with keys (same as slot names but without the 'element' prefix) 
   and value the definition of the object at the given path
 * function taking ``({context, definition, data, paths})``  
   and returning 
   - the definition
   - ``null`` if the element should not be rendered at all
   - ``undefined`` to use dynamic rendering on the element
