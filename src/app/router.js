import Vue from "vue";
import Router from "vue-router";

import navVar from './components/navVar.vue'
import userProfile from './components/userProfile.vue'
import card from './components/note.vue';
import newUser from './components/newUser.vue';
import login from './components/login.vue';
import listTodo from './components/list-todo.vue';
import forgotPass from './components/forgotPassword.vue';
import resetPass from './components/resetPassword.vue';

Vue.component('note-card', card);
Vue.component('notedo-nv', navVar);
Vue.component('newUser', newUser);
Vue.component('login', login);
Vue.component('listTodo', listTodo);
Vue.component('forgotPassword', forgotPass);
Vue.component('resetPassword', resetPass);
Vue.component('profile', userProfile);



Vue.use(Router);


// Rutas de Vue
export default new Router({
    routes: [
        {
            path: '/',
            component: login
        },
        {
            path: '/notes',
            component: card
        },
        {
            path: '/login',
            component: login
        },
        {
            path: '/register',
            component: newUser
        },
        {
            path: '/todo',
            component: listTodo
        },
        {
            path: '/forgotPass',
            component: forgotPass
        },
        {
            path: '/newPass/:token',
            component: resetPass
        },
        {
            path: '/profile',
            component: userProfile
        }
    ]
})