import Vue from 'vue'
import Router from 'vue-router'
import Login from '../pages/login'

import Menu from '../pages/menu/Menu';

Vue.use(Router)

export default new Router({
    routes: [
/*        {
            path: '',
            redirect: '/login' // 路由重定向
        },*/
/*        {
            path: '/login',
            name: 'login',
            component: Login
        },*/
        // 系统管理
/*        {
            path: '/system',
            name: 'menu',
            component: Login,
            children: [
                {
                    path: '/menu',
                    name: 'menu',
                    component: Menu
                }
            ]
        }*/

        {
            path: '',
            redirect: '/login' // 如果后面路由为空，则进入menu页面
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        }
    ]
})
