import Vue from 'vue'
import Login from '@/components/HelloWorld'
import Main from '@/components/MainPage'
import axios from 'axios'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function createRouter (state) {
  async function beforeEnter (to, from, next) {
    try {
      const { data: user } = await axios.get('http://localhost:3000/api/v1/me')
      state.user = user
      console.log(state.user)
      next()
    } catch (err) {
      console.log('err', err)
      next('/login') // redirect the login if the user is not autenticated
    }
  }
  const routes = [
    {
      path: '/',
      name: 'Main',
      component: Main,
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
