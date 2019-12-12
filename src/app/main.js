// importar Vue
import Vue from 'vue';
import router from './router';


// Vue cookies
import VueCookies from 'vue-cookies'

// set default config
VueCookies.config('7d')

// set global cookie
VueCookies.set('theme','default');
VueCookies.set('hover-time','1s');
Vue.use(VueCookies)

// importar Bootstrap para Vue
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue);

// importar los iconos de fontawsome para vue 
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTimesCircle);
library.add(faUserCircle);


Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

// importar axios y VueAxios
import VueAxios from 'vue-axios';
import axios from 'axios';
Vue.use(VueAxios, axios);
axios.defaults.baseURL = 'http://127.0.0.1:9999';

// importar componentes de Vue
import Master from './layout/master.vue'
import App from './App.vue';
import navVar from './components/navVar.vue'
import card from './components/note.vue';
import newUser from './components/newUser.vue';
import login from './components/login.vue';
import listTodo from './components/list-todo.vue';
import forgotPass from './components/forgotPassword.vue';
import resetPass from './components/resetPassword.vue';
import userProfile from './components/userProfile.vue';

Vue.component('note-card', card);
Vue.component('notedo-nv', navVar);
Vue.component('newUser', newUser);
Vue.component('login', login);
Vue.component('listTodo', listTodo);
Vue.component( 'forgotPassword', forgotPass);
Vue.component( 'resetPassword', resetPass);
Vue.component('userProfile', userProfile);



new Vue({
    el: '#app',
    router: router,
    render: h => h(Master)
})


