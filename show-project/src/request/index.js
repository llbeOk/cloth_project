import axios from 'axios'
import {ElLoading} from 'element-plus'
let loading 
function startLoading() {
    loading=ElLoading.service({
        lock:true,
        text:'正在加载数据',
        background:'rgba(0,0,0,0.7)'
    })
}
function endLoading(){
    loading.close()
}
const requests = axios.create({
    baseURL:'/api',
    timeout:5000
})
requests.interceptors.request.use(
    config=>{
        startLoading()
        return config
    },
    error=>{
     console.log(error)
     endLoading();
     return Promise.reject(error);
    }
)
requests.interceptors.response.use(
    response =>{
            endLoading();
        return response;
    },
    (err)=>{
        //响应失败的回调函数
        endLoading();
        return Promise.reject(new Error('faile')) //终止Promise链子
    }
)
// requests.interceptors.response.clear(
//     response =>{
//         endLoading();
//     return response;
// }
// )
// requests.interceptors.response.eject(
//     response =>{
//         endLoading();
//     return response;
//     }
// )
export default requests;