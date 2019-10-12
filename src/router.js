import Vue from 'vue'
import Router from 'vue-router'
import login from './views/Login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: 'home',
      children:[
        {
          path: '/home',
          redirect: 'votes',
        },
        {
          path: 'votes',
          name: 'voteList',
          component: () => import(/* webpackChunkName: "about" */ './views/VoteList.vue')
        },
        {
          path: 'user/:id',
          name: 'userInfo',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ './views/User.vue')
        },
        {
          path: 'my',
          name: 'myInfo',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ './views/MyInfo.vue')
        },
        {
          path: 'vote/:voteId',
          name: 'vote',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ './views/Vote.vue')
        },
        {
          path: 'createvote',
          name: 'createvote',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ './views/CreateVote.vue')
        },
        {
          path: 'scuess',
          name: 'scuess',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ './views/Scuess.vue')
        }
      ],
      component: () => import(/* webpackChunkName: "about" */ './views/Home.vue')
    },
    
  ],
  // scrollBehavior (to, from, savedPosition) {
  //   // return 期望滚动到哪个的位置
  //   return { x: 0, y: 0 }
  // }
})
