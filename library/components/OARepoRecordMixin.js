import OARepoRecordDefaultComponent from './OARepoRecordDefaultComponent';

export default {
    props: {
        component: [Object, Promise],
        componentFactory: Function,
        layout: {
            type: [Array, Function],
        },
        options: {
            type: Object,
            default: () => ({
                pathLayouts: {
                    '-title': {
                        value: {
                            class: ['text-weight-medium']
                        }
                    }
                }
            })
        }
    },
    data: function() {
        return {
            defaultRecordComponent: OARepoRecordDefaultComponent
        }
    },
    computed: {
        record() {
            return this.$oarepo.record.record;
        },
        recordComponent() {
            if (this.componentFactory !== undefined) {
                const ret = this.componentFactory(this.record);
                if (ret !== undefined) {
                    return ret;
                }
            }
            return this.component || this.defaultRecordComponent;
        },
    },
};
