import OARepoRecordDefaultComponent from './OARepoRecordDefaultComponent';
import deepmerge from 'deepmerge';

export default {
    props: {
        storeModule: String,
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
    data: function () {
        return {
            defaultRecordComponent: OARepoRecordDefaultComponent
        };
    },
    computed: {
        record() {
            const path = this.storeModule ? this.storeModule.split('/') : []
            const record = path.reduce((store, segment) => {
                return store[segment]
            }, this.$store.state)
            return record;
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
        currentOptions() {
            return deepmerge(
                {
                    extraProps: {
                        storeModule: this.storeModule
                    }
                },
                this.options);

        }
    },
};
