import Vue from 'vue'
import Home from '@/components/HelloWorld'
import Login from '@/components/Login'
import axios from 'axios'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function createRouter (state) {
  async function beforeEnter (to, from, next) {
    try {
      const { data: user } = await axios.get('/api/me')
      state.user = user
      next()
    } catch (err) {
      console.log('err', err)
      next('/login') // redirect the login if the user is not autenticated
    }
  }
  const routes = [
    {
      path: '/',
      name: 'Home',
      component: Home,
      beforeEnter
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]

  return new VueRouter({
    routes
  })
}

export default createRouter
