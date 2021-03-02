import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/Home.vue'
import LogIn from './components/Login.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/logIn',
      name: 'LogIn',
      component: LogIn
    },
  ]
});

// router.beforeEach((to, from, next) => {
//   if (store.state.selectedProduct == undefined && to.name == "product") {
//     next({ name: 'home' })
//   }
//   next();
// })

export default router