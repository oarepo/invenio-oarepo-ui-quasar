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
            q-expansion-item(header='' label="Record Lists")
                q-card
                    q-card-section
                        q-list
                            q-item(clickable='' :to="{name: 'list-simple'}")
                                q-item-section(avatar='')
                                    q-icon(name='list')
                                q-item-section
                                    q-item-label Simple list
                            q-expansion-item.q-mb-md(icon="image" label="Supplying Icons")
                                q-card
                                    q-card-section
                                        q-list
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
                            q-expansion-item.q-mb-md(icon="image" label="Record rendering within list")
                                q-card
                                    q-card-section
                                        q-list
                                            q-item-label(header='') Using default renderer
                                            q-item(clickable='' :to="{name: 'list-no-component'}")
                                                q-item-section(avatar='')
                                                    q-icon(name='list')
                                                q-item-section
                                                    q-item-label Complex rendering
                                            q-item(clickable='' :to="{name: 'list-table'}")
                                                q-item-section(avatar='')
                                                    q-icon(name='list')
                                                q-item-section
                                                    q-item-label props rendered as table
                                            q-item(clickable='' :to="{name: 'list-prop-value-component'}")
                                                q-item-section(avatar='')
                                                    q-icon(name='list')
                                                q-item-section
                                                    q-item-label prop value handled by a component
                                            q-item(clickable='' :to="{name: 'list-prop-component'}")
                                                q-item-section(avatar='')
                                                    q-icon(name='list')
                                                q-item-section
                                                    q-item-label whole prop handled by a component
                                            q-item-label(header='') Custom component or factory
                                            q-item(clickable='' :to="{name: 'list-component'}" exact)
                                                q-item-section(avatar='')
                                                    q-icon(name='list')
                                                q-item-section
                                                    q-item-label Custom record component
                                            q-item(clickable='' :to="{name: 'list-component-factory'}" exact)
                                                q-item-section(avatar='')
                                                    q-icon(name='list')
                                                q-item-section
                                                    q-item-label Custom record component factory
                                            q-item-label(header='') Using slot
                                            q-item(clickable='' :to="{name: 'list-slot'}" exact)
                                                q-item-section(avatar='')
                                                    q-icon(name='list')
                                                q-item-section
                                                    q-item-label Custom slot
            q-expansion-item(header='' label="Record cards")
                q-card
                    q-card-section
                        q-list
                            q-item(clickable='' :to="{name: 'cards-simple'}")
                                q-item-section(avatar='')
                                    q-icon(name='view_day')
                                q-item-section
                                    q-item-label 1 card in a row
                            q-item(clickable='' :to="{name: 'cards-grid', query: {size: 100}}")
                                q-item-section(avatar='')
                                    q-icon(name='view_module')
                                q-item-section
                                    q-item-label grid of cards
            q-expansion-item(header='' label="Miscelaneous")
                q-card
                    q-card-section
                        q-list
                            q-item(clickable='' :to="{name: 'list-ui-link'}" exact)
                                q-item-section(avatar='')
                                    q-icon(name='list')
                                q-item-section
                                    q-item-label Clickable records - using urlGetter
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
