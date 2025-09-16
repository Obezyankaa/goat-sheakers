import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import App from './App.vue'
import MainLayout from './layouts/MainLayout.vue'
import Home from './pages/home/index.vue'
import AuthLayout from './layouts/AuthLayout.vue'
const Login = () => import('./pages/login/Login.vue')
const About = () => import('./pages/about/About.vue')
const Details = () => import('./pages/sneakers/[id].vue')

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', name: 'Home', component: Home },
      { path: 'about', name: 'About', component: About },
      { path: 'sneakers/:id', name: 'Details', component: Details },
    ],
  },
  {
    path: '/login',
    component: AuthLayout,
    children: [{ path: '', name: 'Login', component: Login }],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(App)
app.use(router)
app.use(autoAnimatePlugin)

app.mount('#app')
