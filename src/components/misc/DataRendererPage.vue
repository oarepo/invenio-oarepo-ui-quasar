<template lang="pug">
q-page.q-ma-lg
    q-btn.float-right(icon="launch"
        href="https://github.com/oarepo/invenio-oarepo-ui-quasar/tree/invenio-3.2/src/components/misc/DataRendererPage.vue"
        type="a" target="_blank" flat) View source

    .q-gutter-sm.fixed-top-right.z-max.q-pt-xs.q-pr-lg.text-white
        span Display schema:
        q-radio(v-model="query.schema" val="inline" label="inline" color="yellow")
        q-radio(v-model="query.schema" val="block" label="block" color="yellow")
        q-radio(v-model="query.schema" val="table" label="table" color="yellow")
        q-radio(v-model="query.schema" val="flex" label="flex" color="yellow")

    h6 Default rendering and slots
    .row.q-col-gutter-sm
        .div.col-4
            .q-card.full-height
                q-card-section
                    .text-weight-medium Default rendering
                    q-separator.q-mb-md
                    data-renderer(:data="data" :definition="d1" :url="url" :schema="query.schema")

        .div.col-4
            .q-card.full-height
                q-card-section
                    .text-weight-medium Rendered with #[code v-slot:value-thumbnail]
                    q-separator.q-mb-md
                    data-renderer(:data="data" :definition="d2" :url="url" :schema="query.schema")
                        template(v-slot:value-thumbnail="{value}")
                            div
                                img(:src="value" style="height: 40px;")

        .div.col-4
            .q-card.full-height
                q-card-section
                    .text-weight-medium Rendered with #[code v-slot:-value-thumbnail]
                    q-separator.q-mb-md
                    data-renderer(:data="data" :definition="d2" :url="url" :schema="query.schema")
                        template(v-slot:-value-thumbnail="{value}")
                            div
                                img(:src="value" style="height: 40px;")
                        template(v-slot:value-thumbnail="{value}")
                            div should not be used

        .div.col-4
            .q-card.full-height
                q-card-section
                    .text-weight-medium Rendered with #[code v-slot:value-contact]
                    q-separator.q-mb-md
                    data-renderer(:data="data" :definition="d1" :url="url" :schema="query.schema")
                        template(v-slot:value-contact="{value}")
                            table(style="border-collapse: collapse;")
                                tr #[td Phone: ] {{ value.phone }}
                                tr #[td Email: ] {{ value.email }}

        .div.col-4
            .q-card.full-height
                q-card-section
                    .text-weight-medium Rendered with tree definition
                    q-separator.q-mb-md
                    data-renderer(:data="data" :definition="d3" :url="url" :schema="query.schema")

    h6 Supplying custom component
    .row.q-col-gutter-sm
        .div.col-4
            .q-card.full-height
                q-card-section
                    .text-weight-medium Rendered with custom component for Creator
                    q-separator.q-mb-md
                    data-renderer(:data="data" :definition="d1" :url="url"
                        :schema="query.schema" :components="creatorCustomComponent")

        .div.col-4
            .q-card.full-height
                q-card-section
                    .text-weight-medium Rendered with custom component for Creator label
                    q-separator.q-mb-md
                    data-renderer(:data="data" :definition="d1" :url="url"
                        :schema="query.schema" :components="creatorLabelCustomComponent")

        .div.col-4
            .q-card.full-height
                q-card-section
                    .text-weight-medium Rendered with custom component for Creator value
                    q-separator.q-mb-md
                    data-renderer(:data="data" :definition="d1" :url="url"
                        :schema="query.schema" :components="creatorValueCustomComponent")

        .div.col-4
            .q-card.full-height
                q-card-section
                    .text-weight-medium Skipping creator with a custom component set to null
                    q-separator.q-mb-md
                    data-renderer(:data="data" :definition="d1" :url="url"
                        :schema="query.schema" :components="creatorSkip")

        .div.col-4
            .q-card.full-height
                q-card-section
                    .text-weight-medium Rendered with custom component in definition
                    q-separator.q-mb-md
                    data-renderer(:data="data" :definition="d4" :url="url"
                        :schema="query.schema")
    h6 Dynamic definition
    .row.q-col-gutter-sm
        .div.col-4
            .q-card.full-height
                q-card-section
                    .text-weight-medium No definition at all
                    q-separator.q-mb-md
                    data-renderer(:data="data" :url="url" :schema="query.schema" :nestedChildren="true")

        .div.col-4
            .q-card.full-height
                q-card-section
                    .text-weight-medium Definition with dynamic contact details
                    q-separator.q-mb-md
                    data-renderer(:data="data" :url="url" :definition="d5"
                        :schema="query.schema" :nestedChildren="true")

        .div.col-4
            .q-card.full-height
                q-card-section
                    .text-weight-medium Dynamic definition with custom definition of Contact
                    q-separator.q-mb-md
                    data-renderer(:data="data" :url="url" :schema="query.schema"
                        :nestedChildren="true" :pathDefinitions="contactDefinition")

        .div.col-4
            .q-card.full-height
                q-card-section
                    .text-weight-medium Dynamic definition with removed Contact
                    q-separator.q-mb-md
                    data-renderer(:data="data" :url="url" :schema="query.schema"
                        :nestedChildren="true" :pathDefinitions="noContactDefinition")

</template>

<script>
import { DataRenderer } from '@oarepo/invenio-quasar';
/* eslint no-console:off */

const CustomComponent = {
    props: [
        'context',
        'definition',
        'data',
        'paths',
        'value',
        'values'
    ],
    render(h) {
        console.log('Custom component props', this.$props);
        console.log('Custom component attrs', this.$attrs);
        return h('span', {
            attrs: {
                title: 'See console log for details'
            },
            class: 'text-red',
        }, 'This is a custom component');
    }
};

const CustomTableComponent = {
    props: [
        'context',
        'definition',
        'data',
        'paths',
        'value',
        'values'
    ],
    render(h) {
        console.log('Custom table component props', this.$props);
        console.log('Custom table component attrs', this.$attrs);
        return h('td', {
            attrs: {
                title: 'See console log for details'
            },
            class: 'text-red',
        }, 'This is a custom component used only in a table');
    }
};

export default {
    components: {
        'data-renderer': DataRenderer
    },
    props: {
        query: Object
    },
    data: function () {
        return {
            url: '/',
            schema: 'inline',
            data: {
                '$schema': 'https://restaurovani.vscht.cz/schemas/draft/krokd/restoration-object-v1.0.0.json',
                'id': '1',
                'title': 'Object 1',
                'thumbnail': 'https://cis-login.vscht.cz/static/web/logo_small.png',
                'creator': 'Mary Black',
                'contact': {
                    phone: '+420123123123',
                    email: 'mary.black@gmail.com'
                }
            },
            d1: [
                {
                    path: 'title',
                    value: {
                        class: ['text-h6']
                    }
                },
                {
                    path: 'creator',
                    label: 'Creator'
                },
                {
                    path: 'thumbnail',
                    label: 'Thumbnail'
                },
                {
                    path: 'contact',
                    label: 'Contact'
                }
            ],
            d2: [
                {
                    path: 'thumbnail',
                    wrapper: {
                        class: ['float-left', 'q-ma-sm q-mr-lg']
                    }
                },
                {
                    path: 'title',
                    value: {
                        class: ['text-h6']
                    }
                },
                {
                    path: 'creator',
                    label: 'Creator'
                },
                {
                    path: 'contact',
                    label: 'Contact'
                }
            ],
            d3: [
                {
                    path: 'title',
                    value: {
                        class: ['text-h6']
                    }
                },
                {
                    path: 'creator',
                    label: 'Creator'
                },
                {
                    path: 'thumbnail',
                    label: 'Thumbnail'
                },
                {
                    path: 'contact',
                    label: 'Contact',
                    nestedChildren: true,
                    children: [
                        {
                            path: 'email',
                            label: 'E-mail'
                        },
                        {
                            path: 'phone',
                            label: 'Phone'
                        }
                    ]
                },
            ],
            d4: [
                {
                    path: 'title',
                    value: {
                        class: ['text-h6']
                    }
                },
                {
                    path: 'creator',
                    label: 'Creator',
                    wrapper: {
                        component: CustomComponent
                    }
                },
                {
                    path: 'thumbnail',
                    label: 'Thumbnail'
                },
                {
                    path: 'contact',
                    label: 'Contact'
                }
            ],
            d5: [
                {
                    path: 'title',
                    value: {
                        class: ['text-h6']
                    }
                },
                {
                    path: 'creator',
                    label: 'Creator',
                },
                {
                    path: 'thumbnail',
                    label: 'Thumbnail'
                },
                {
                    path: 'contact',
                    label: 'Contact',
                    dynamic: true
                }
            ],
            creatorCustomComponent: {
                'wrapper-creator': CustomComponent
            },
            creatorLabelCustomComponent: {
                'label-creator': CustomComponent,
                'label-creator$table': CustomTableComponent
            },
            creatorValueCustomComponent: {
                'value-creator': CustomComponent,
                'value-creator$table': CustomTableComponent
            },
            creatorSkip: {
                'wrapper-creator': null
            },
            contactDefinition: {
                'contact': {
                    path: 'contact',
                    label: 'Contact',
                    wrapper: {
                        class: ['q-card--bordered']
                    },
                    nestedChildren: true,
                    children: [
                        {
                            path: 'email',
                            label: 'E-mail'
                        },
                        {
                            path: 'phone',
                            label: 'Phone'
                        }
                    ]
                }
            },
            noContactDefinition: {
                'contact': null
            }
        };
    }
};
</script>
