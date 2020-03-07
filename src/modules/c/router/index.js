import Vue from 'vue'
import Router from 'vue-router'
import Sub from '../pages/sub'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      redirect: '/sub-module1'
    },
    {
      path: '/sub-module1',
      name: 'subModule1',
      component: Sub
    }
  ]
})
