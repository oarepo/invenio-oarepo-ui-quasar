<template>
<div>
    <q-input v-model="queryString" :label="$t('message.search')" @keyup.enter="entered">
        <template v-slot:append>
        <q-avatar>
            <q-icon name="search"></q-icon>
        </q-avatar>
        </template>
    </q-input>
</div>
</template>

<script>
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Query } from '@oarepo/invenio-oarepo-ui-vue';

export default @Component({
    name: 'oarepo-quasar-search',
    props: {
        input: String,
    },
})
class OARepoQuasarSearch extends Vue {
    // query
    queryString = '';

    entered() {
        const q = new Query(this.$route.query);
        q.replace('q', this.queryString);
        console.log(q.query);
        this.$router.push({
            query: q.query,
        });
    }

    @Watch('input')
    inputChanged() {
        this.queryString = this.input;
    }

    mounted() {
        this.inputChanged();
    }
}
</script>

<style>

</style>
