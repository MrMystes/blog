import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/main'
import home from '@/components/home'
import article from '@/components/article'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      children: [
        {
          path: '/home',
          name: 'home',
          component: home
        },
        {
          path: '/article/:id',
          name: 'article',
          component: article
        }
      ]
    }
  ]
})
