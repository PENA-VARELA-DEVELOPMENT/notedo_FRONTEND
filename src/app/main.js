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

// importar componentes de Vue
import App from './App.vue';
import navVar from './components/navVar.vue'
import card from './components/note.vue';
import newUser from './components/newUser.vue';
import login from './components/login.vue';

Vue.component('note-card', card);
Vue.component('notedo-nv', navVar);
Vue.component('newUser', newUser);
Vue.component('login', login);



new Vue({
    render: h => h(App)
}).$mount('#app');
