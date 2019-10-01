/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i);
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));


/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
import Vue from 'vue'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import Vuelidate from "vuelidate";
import Routes from './routes.js';
import auth from './services/Auth';
import client from './services/ApiClient';

Vue.prototype.$auth = auth;
Vue.prototype.$client = client(auth);
Vue.use(VueMaterial);
Vue.use(Vuelidate);

Vue.component('home-component', require('./components/HomeComponent.vue').default);
Vue.component('post-component', require('./components/PostComponent.vue').default);
Vue.component('post-form-component', require('./components/PostFormComponent.vue').default);
Vue.component('menu-component', require('./components/MenuComponent.vue').default);

Vue.component('view-post-component', require('./components/ViewPostComponent.vue').default);

const app = new Vue({
    el: '#app',
    router: Routes
});
