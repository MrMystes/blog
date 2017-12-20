import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/main'
import Article from '@/components/article'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      children: [
        {
          path: '/',
          name: 'Article',
          component: Article
        }
      ]
    }
  ]
})
