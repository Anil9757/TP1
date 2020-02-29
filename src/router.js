import Login from './views/Login'
import Home from './views/Home'
import axios from 'axios'
import VueRouter from 'vue-router'

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
      redirect: {
        name: 'login'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      beforeEnter
    }
  ]

  return new VueRouter({
    routes
  })
}

export default createRouter
