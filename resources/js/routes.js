import Vue from 'vue';
import VueRouter from 'vue-router';

import HomeComponent from './components/HomeComponent';
import ProfileComponent from './components/ProfileComponent';
import SinglePostComponent from './components/SinglePostComponent';
import LoginComponent from "./components/LoginComponent";

Vue.use(VueRouter);
const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeComponent
        },
        {
            path: '/profile',
            name: 'profile',
            component: ProfileComponent
        },
        {
            path: '/single-post/:id',
            name: 'single-post',
            component: SinglePostComponent
        },
        {
            path: '/login',
            name: 'login',
            component: LoginComponent
        }
    ]
});
export default router;
