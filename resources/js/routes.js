import Vue from 'vue';
import VueRouter from 'vue-router';

import HomeComponent from './components/HomeComponent';
import ProfileComponent from './components/ProfileComponent';
import ViewPostComponent from './components/ViewPostComponent';
import UpdatePostComponent from './components/UpdatePostComponent';
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
            path: '/view/post/:id',
            name: 'view-post',
            component: ViewPostComponent
        },
        {
            path: '/update/post/:id',
            name: 'update-post',
            component: UpdatePostComponent
        },
        {
            path: '/login',
            name: 'login',
            component: LoginComponent
        }
    ]
});
export default router;
