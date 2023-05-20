import {createRouter,createWebHistory} from 'vue-router'
import Dress from '../pages/Dress.vue'
import Login from '../pages/Login.vue'
import Cloth from '../pages/Cloth.vue'
import Brand from '../pages/Brand.vue'
import Trend from '../pages/Trend.vue'
import News from '../pages/News.vue'
const router =  createRouter({
    history:createWebHistory('/base-directory/'),
    routes:[
        {
            path:'/dress',
            component:Dress,
            meta: { isAuth: true, title:'dress' }
        },
        {
            path:'/login',
            component:Login,
            meta: { isAuth: false, title:'login' }
        },
        {
            path:'/cloth',
            component:Cloth,
            meta: { isAuth: true, title:'cloth' }
        },
        {
            path:'/brand',
            component:Brand,
            meta: { isAuth: true, title:'brand' }
        },
        {
            path:'/trend',
            component:Trend,
            meta: { isAuth: true, title:'trend' }
        },
        {
            path:'/news',
            component:News,
            meta: { isAuth: true, title:'news' }
        },
        {
            path:'/',
            redirect:'Login',
        }
    ]
})
//全局前置路由守卫————初始化的时候被调用、每次路由切换之前被调用
router.beforeEach((to, from, next) => {
    //如果路由需要跳转
    if (to.meta.isAuth) {
        if (sessionStorage.getItem('username') !=undefined) {
            next()  //放行
        } else {
            alert('抱歉，您无权限查看！ 请先登录')
        }
    } else {
        // 否则，放行
        next()
    }
})
export default router