<template>
<oarepo-facet-list :facets="facets" ref="oarepoFacetList">
    <q-list bordered v-if="facetsOpenedModel !== null">
        <q-expansion-item
                expand-separator
                icon="explore"
                :label="val.label" v-for="(val, key) in facets" v-bind:key="key"
                v-model="facetsOpenedModel[key]"
                @input="facetsOpenedModelChanged()"
        >
            <q-card>
                <q-card-section>
                    <div v-for="bucket in val.buckets" v-bind:key="bucket.key">
                        <q-checkbox :value="bucket.selected"
                                    @input="facetSelected(bucket, !bucket.selected)"
                                    :true-value="true"
                                    :false-value="false"
                                    :toggle-indeterminate="false"
                        ></q-checkbox>
                        {{ bucket.label }} ({{ bucket.doc_count }})
                    </div>
                </q-card-section>
            </q-card>
        </q-expansion-item>
    </q-list>
</oarepo-facet-list>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';

const LOCAL_STORAGE_KEY = 'oarepoFacetsOpenedModel';

export default @Component({
    name: 'oarepo-quasar-facet-list',
    props: {
        facets: Object,
    },
})
class OARepoQuasarFacetList extends Vue {
    // model
    facetsOpenedModel = null;

    facetSelected(bucketP, selected) {
        this.$refs.oarepoFacetList.facetSelected(bucketP, selected);
    }

    mounted() {
        this.facetsOpenedModel = this.$q.localStorage.getItem(LOCAL_STORAGE_KEY);
    }

    facetsOpenedModelChanged() {
        if (this.facetsOpenedModel !== null) {
            this.$q.localStorage.set(LOCAL_STORAGE_KEY, this.facetsOpenedModel);
        }
    }

    @Watch('facets')
    facetsChanged(newValue) {
        if (this.facetsOpenedModel === null) {
            this.facetsOpenedModel = {};
        }
        Object.keys(newValue).forEach((key) => {
            if (this.facetsOpenedModel[key] === undefined) {
                this.facetsOpenedModel[key] = true;
            }
        });
    }
}
</script>

<style>

</style>
