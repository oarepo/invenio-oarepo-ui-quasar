import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './quasar';

import InvenioApi from '@oarepo/invenio-api-vuex';
import InvenioQuasar from '@oarepo/invenio-quasar';
import VueUid from 'vue-uid';
import VuexPreloader from '@oarepo/vuex-preloader';
import VueQuerySynchronizer from '@oarepo/vue-query-synchronizer';
import DataRenderer from '@oarepo/data-renderer';

Vue.config.productionTip = false;

Vue.use(InvenioApi, {
    store,
    router,
    apiURL: '/demo-invenio-quasar/api'
});
Vue.use(VueUid);

Vue.use(VuexPreloader, {
    router,
    store
});

Vue.use(VueQuerySynchronizer, {
    passUnknownProperties: true,
    router
});

Vue.use(DataRenderer, {

});

Vue.use(InvenioQuasar, {});


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
