import requests from "./index";
export const GetList = (params)=>{
    return requests({
        url:'/dress/list',
        method:'get',
        params
})
}
export const GetCloth = (params)=>{
    return requests({
        url:'/cloth/list',
        method:'get',
        params
})
}
export const GetBrand = (params)=>{
    return requests({
        url:'/brand/list',
        method:'get',
        params
})
}
export const GetTrend = (params)=>{
    return requests({
        url:'/trend/list',
        method:'get',
        params
})
}
export const GetNews = (params)=>{
    return requests({
        url:'/news/list',
        method:'get',
        params
})
}
export const Login = (data)=>{
    return requests({
        url:'/auth/login',
        method:'post',
        data
    })
}
export const Register = (data)=>{
    return requests({
        url:'/auth/register',
        method:'post',
        data
    })
}