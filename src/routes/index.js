import Vue from 'vue'
import VueRouter from 'vue-router'
import cookie from '../util/cookie.js'

Vue.use(VueRouter)


const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/registry',
    name: 'Registry',
    component: () => import('../views/Registry.vue'),
    meta:{
      title: '注册'
    }
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/home/index.vue'),
    meta: {
      showCommon: true,
      title: '主页'
    }
  },
  {
    path: '/user/userInfo',
    name: 'UserInfo',
    component: () => import ('../views/user/index.vue'),
    meta: {
      showCommon: true,
      title: '用户信息'
    }
  },
  {
    path: '/project/list',
    name: 'listProject',
    component:  () => import('../views/project/index.vue'),
    meta: {
      showCommon: true,
      title: '我的项目'
    }
  },
  {
    path: '/project/add',
    name: 'addProject',
    component:  () => import('../views/project/addProject.vue'),
    meta: {
      showCommon: true,
      title: '添加项目'
    }
  },
  {
    path: '/project/:projectName/list',
    name: 'projectDetail',
    component: () => import('../views/project/detail.vue'),
    meta: {
      showCommon: true,
    }
  },
  {
    path: '/project/:projectName/edit',
    name: 'projectEdit',
    component: () => import('../views/project/editProject.vue'),
    meta: {
      showCommon: true
    }
  },
  {
    path: '/project/:projectName/coding',
    name: 'projectCoding',
    component: () => import('../views/project/code.vue'),
    meta: {
      showCommon: true
    }
  },
  {
    path: '/project/:projectName/build',
    name: 'projectCoding',
    component: () => import('../views/project/buildPanel.vue'),
    meta: {
      showCommon: true
    }
  }
]

const router = new VueRouter({
    mode: 'history',
    routes
})
router.beforeEach((to, from,next) => {
  if (cookie.getCookie('token') === ''){
    switch(to.path){
      case '/registry': next();break;
      case '/login': next();break;
      default: next('/login');to.meta.title = '登录'
    }
  }else{
    switch(to.path){
      case '/login': next('/');to.meta.title = '主页';break;
      default: next();
    }
  }

  if (to.meta.title){
      document.title = to.meta.title +' - e5Code'
  }
})

export default router
