<template lang="pug">
q-layout(view='lHh Lpr lFf')
    q-header.glossy(elevated='')
        q-toolbar
            q-btn(flat='', dense='', round='', @click='leftDrawerOpen = !leftDrawerOpen', aria-label='Menu', icon='menu')
                q-toolbar-title
                    | @oarepo/invenio-quasar
                div Quasar v{{ $q.version }}
    q-drawer(v-model='leftDrawerOpen', show-if-above='', bordered='', content-class='bg-grey-2')
        q-list
            q-item-label(header='') Lists
            q-item(clickable='' :to="{name: 'list-simple'}")
                q-item-section(avatar='')
                    q-icon(name='list')
                q-item-section
                    q-item-label Simple list
            q-item(clickable='' :to="{name: 'list-image-icon'}")
                q-item-section(avatar='')
                    q-icon(name='list')
                q-item-section
                    q-item-label List with image icon
            q-item(clickable='' :to="{name: 'list-function-icon'}")
                q-item-section(avatar='')
                    q-icon(name='list')
                q-item-section
                    q-item-label List with icon given by a function
            q-item(clickable='' :to="{name: 'list-no-component'}")
                q-item-section(avatar='')
                    q-icon(name='list')
                q-item-section
                    q-item-label List with item rendering given by paths without custom component
            q-item(clickable='' :to="{name: 'list-table'}")
                q-item-section(avatar='')
                    q-icon(name='list')
                q-item-section
                    q-item-label List with props rendered as table
            q-item(clickable='' :to="{name: 'list-prop-value-component'}")
                q-item-section(avatar='')
                    q-icon(name='list')
                q-item-section
                    q-item-label List with a prop value handled by a component
            q-item(clickable='' :to="{name: 'list-prop-component'}")
                q-item-section(avatar='')
                    q-icon(name='list')
                q-item-section
                    q-item-label List with a prop handled by a component
            q-item(clickable='' :to="{name: 'list-component'}" exact)
                q-item-section(avatar='')
                    q-icon(name='list')
                q-item-section
                    q-item-label List with a record handled by a component
            q-item(clickable='' :to="{name: 'list-component-factory'}" exact)
                q-item-section(avatar='')
                    q-icon(name='list')
                q-item-section
                    q-item-label List with a record handled by a component factory
    q-page-container
        router-view
</template>

<script>

export default {
    name: 'LayoutDefault',

    components: {},

    data() {
        return {
            leftDrawerOpen: false
        };
    }
};
</script>

<style>
</style>
