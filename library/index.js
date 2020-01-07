import OARepoCollectionList from './components/OARepoCollectionList.vue';
import OARepoCollectionCards from './components/OARepoCollectionCards';
import OARepoCollectionTable from './components/OARepoCollectionTable';
import OARepoRecord from './components/OARepoRecord';
import OARepoRecordInplaceEditor from './components/OARepoRecordInplaceEditor';

export default {
    install(Vue, options) {
        Vue.component(OARepoCollectionList.name, OARepoCollectionList);
        Vue.component(OARepoCollectionCards.name, OARepoCollectionCards);
        Vue.component(OARepoCollectionTable.name, OARepoCollectionTable);
        Vue.component(OARepoRecord.name, OARepoRecord);
        Vue.component(OARepoRecordInplaceEditor.name, OARepoRecordInplaceEditor);

        options = {
            labelTranslator: function ({ label, schema }) {
                if (schema === 'inline' && label) {
                    return `${label}: `;
                }
                return label;
            },
            ...options
        };

        if (Vue.prototype.$oarepo === undefined) {
            Vue.prototype.$oarepo = {};
        }
        Vue.prototype.$oarepo.quasar = {
            ...options,
            schemas: {
                inline: {
                    wrapper: {},
                    label: {},
                    valueWrapper: {
                        style: { layout: 'inline' }
                    },
                    value: {
                        style: { layout: 'inline' }
                    },
                    childrenWrapper: {},
                    root: {
                        element: 'div',
                        class: '',
                        style: '',
                        attrs: ''
                    },
                    layoutCallback: () => {
                    }
                },
                block: {
                    wrapper: {},
                    label: {
                        style: { 'vertical-align': 'top' }
                    },
                    valueWrapper: {
                        style: { layout: 'block' }
                    },
                    value: {},
                    childrenWrapper: {},
                    root: {
                        element: 'div',
                        class: '',
                        style: '',
                        attrs: ''
                    },
                    layoutCallback: () => {
                    }
                },
                flex: {
                    wrapper: {
                        class: ['row', 'q-col-gutter-sm']
                    },
                    label: {
                        style: { 'vertical-align': 'top' },
                        class: ['col-3']
                    },
                    valueWrapper: {
                        style: { layout: 'block' },
                        class: ['col-9']
                    },
                    value: {},
                    childrenWrapper: {},
                    root: {
                        element: 'div',
                        class: '',
                        style: '',
                        attrs: ''
                    },
                    layoutCallback: () => {
                    }
                },
                table: {
                    wrapper: {
                        element: 'tr'
                    },
                    label: {
                        element: 'td',
                        style: { 'vertical-align': 'top' }
                    },
                    valueWrapper: {
                        element: 'td'
                    },
                    value: {},
                    childrenWrapper: {
                        element: 'table',
                        style: { 'border-collapse': 'collapse' },
                    },
                    root: {
                        element: 'table',
                        class: '',
                        style: { 'border-collapse': 'collapse' },
                        attrs: ''
                    },
                    layoutCallback: (layout) => {
                        if (!layout.label && layout.valueWrapper) {
                            layout.valueWrapper[0].data.attrs = {
                                colspan: 2,
                                ...(layout.valueWrapper[0].data.attrs || {})
                            };
                        }
                    }
                },
            }
        };
    }
};

export {
    OARepoCollectionList,
    OARepoCollectionCards,
    OARepoCollectionTable
};
