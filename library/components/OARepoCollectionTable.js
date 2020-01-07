import { DataRendererComponent } from '@oarepo/data-renderer';
import OARepoCollectionCardsDefaultComponent from './OARepoCollectionCardsDefaultComponent';

function toIdentifier(label) {
    return label.replace(/[^a-zA-Z0-9-]/g, '');
}

export default {
    props: {
        query: Object,
        layout: {
            type: [Array, Function],
            default: () => [
                {
                    name: 'title',
                    path: 'title',
                    label: 'Title',
                    valueClass: 'text-weight-medium',
                    link: true,
                    sortable: true
                },
                {
                    name: 'creator',
                    label: 'Creator',
                    path: 'creator'
                },
                {
                    name: 'created',
                    label: 'Created',
                    path: 'created'
                }
            ]
        },
        gridLayout: {
            type: [Array, Function],
        },
        gridCardClass: {
            type: [String, Object],
            default: 'q-table__grid-item col-xs-12 col-sm-6 col-md-4 col-lg-3'
        },
        cardClass: {
            type: [String, Object],
            default: 'q-table__grid-item col-xs-12 col-sm-6 col-md-4 col-lg-3'
        },
        gridCardStyle: String,
        cardStyle: String
    },
    name: 'oarepo-collection-table',
    render(h) {
        const columns = this.layout.map(x => ({
            ...x,
            name: x.name || toIdentifier(x.label || x.path),
            label: x.label || x.name || x.path,
            align: x.align || 'left'
        }));
        return h('q-table', {
            props: {
                ...this.$attrs,
                columns: columns,
                data: this.$oarepo.collection.records,
                pagination: this.pagination
            },
            on: {
                request: this.paginationRequest
            },
            scopedSlots: {
                ...this.generateBody(h, columns),
                ...this.generateHeader(h, columns),
                item: this.$scopedSlots['item'] || ((props) => {
                    return h('div', {
                        class: this.gridCardClass,
                        style: this.gridClassStyle,
                    }, [
                        h(OARepoCollectionCardsDefaultComponent, {
                            key: props.key,
                            props: {
                                record: props.row,
                                layout: this.currentCardColumns,
                                icon: this.$attrs.icon,
                                renderer: this.$attrs.renderer,
                                url: this.recordUrl(props.row)
                            },
                            class: this.cardClass,
                            style: this.cardStyle
                        })
                    ]);
                }),
                body: this.$scopedSlots['body'],
                header: this.$scopedSlots['header'],
                'top-row': this.$scopedSlots['top-row'],
                'bottom-row': this.$scopedSlots['bottom-row'],
                'top-left': this.$scopedSlots['top-left'],
                'top-right': this.$scopedSlots['top-right'],
                'top-selection': this.$scopedSlots['top-selection'],
                'no-data': this.$scopedSlots['no-data'],
                top: this.$scopedSlots['top'],
                bottom: this.$scopedSlots['bottom'],
                pagination: this.$scopedSlots['pagination']
            }
        });
    },
    computed: {
        currentCardColumns() {
            return this.gridLayout || this.layout.map(x => ({
                ...x,
                label: x.gridLabel || `${x.label || x.name || x.path}: `
            }));
        },
        pagination() {
            let sortBy = this.$oarepo.collection.queryParams.sort;
            let descending = false;
            if (sortBy && sortBy[0] == '-') {
                sortBy = sortBy.substr(1);
                descending = true;
            }
            return {
                page: this.$oarepo.collection.page,
                rowsPerPage: this.$oarepo.collection.pageSize,
                rowsNumber: this.$oarepo.collection.totalRecords,
                descending,
                sortBy
            };
        }
    },
    methods: {
        recordUrl(record) {
            if (this.urlGetter !== undefined) {
                const ret = this.urlGetter(record);
                if (ret !== undefined) {
                    return ret;
                }
            }
            return record.links.ui;
        },
        generateBody(h, columns) {
            const vue = this;
            return Object.fromEntries(columns.map(col => {
                const slotName = `body-cell-${col.name}`;
                const slot = this.$scopedSlots[slotName] || this.$scopedSlots['body-cell'];
                if (slot !== undefined) {
                    return [slotName, slot];
                } else {
                    return [slotName, (props) => {
                        return h('q-td', [
                            h(DataRendererComponent, {
                                props: {
                                    data: props.row.metadata,
                                    layout: [{
                                        ...props.col,
                                        label: undefined
                                    }],
                                    url: vue.recordUrl(props.row)
                                }
                            })
                        ]);
                    }];
                }
            }));
        },
        generateHeader(h, columns) {
            // const vue = this;
            return Object.fromEntries(columns.map(col => {
                const slotName = `header-cell-${col.name}`;
                const slot = this.$scopedSlots[slotName] || this.$scopedSlots['header-cell'];
                if (slot !== undefined) {
                    return [slotName, slot];
                } else {
                    return [slotName, (props) => {
                        return h('q-th', {
                            props: {
                                props: props
                            }
                        }, props.col.label);
                    }];
                }
            }));
        },
        paginationRequest(paginationData) {
            const pagination = paginationData.pagination;
            this.query.page = pagination.page;
            this.query.size = pagination.rowsPerPage;
            if (pagination.sortBy) {
                if (!pagination.descending) {
                    this.query.sort = pagination.sortBy;
                } else {
                    this.query.sort = `-${pagination.sortBy}`;
                }
            } else {
                this.query.sort = undefined
            }
        }
    }
};

