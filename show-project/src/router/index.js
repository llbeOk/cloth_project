import {createRouter,createWebHistory} from 'vue-router'
import Home from '../pages/Home.vue'
import Dress from '../pages/Dress.vue'
import Cloth from '../pages/Cloth.vue'
import Brand from '../pages/Brand.vue'
import School from '../pages/School.vue'
import News from '../pages/News.vue'
import Trend from '../pages/Trend.vue'
const router = createRouter({
    history: createWebHistory('/base-directory/'),
    routes: [
        {
            path:'/home',
            component:Home
        },
        {
            path:'/dress',
            component:Dress
        },
        {
            path:'/cloth',
            component:Cloth
        },
        {
            path:'/brand',
            component:Brand
        },
        {
            path:'/school',
            component:School
        },
        {
            path:'/news',
            component:News
        },
        {
            path:'/trend',
            component:Trend
        },
        {
            redirect:'',
            component:Home
        }
    ],
  })
export default router