// importar Vue
import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter)

// importar Bootstrap para Vue
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue);

// importar axios y VueAxios
import VueAxios from 'vue-axios';
import axios from 'axios';
Vue.use(VueAxios, axios);
axios.defaults.baseURL = 'http://c1fe4917.ngrok.io';

// importar componentes de Vue
import Master from './layout/master.vue'
import App from './App.vue';
import navVar from './components/navVar.vue'
import card from './components/note.vue';

Vue.component('note-card', card);
Vue.component('notedo-nv', navVar)


const routes = [
    {
        path: '/',
        component: App
    },
    {
        path: '/notes',
        component: card
    },
];

const router = new VueRouter({ routes });
new Vue({
    el: '#app',
    router: router,
    render: h => h(Master)
})


