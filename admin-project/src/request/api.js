import requests from "./index";
export const GetById = (type,id)=>{
    return requests({
        url:`/${type}/${id}`,
        method:'get',
    })
}
export const GetDress = (params)=>{
    return requests({
        url:'/dress/list',
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
export const NewDress = (name,detail,type,img)=>{
    // console.log(img)
    const formData = new FormData()
    formData.append('name',name)
    formData.append('detail',detail)
    formData.append('type',type)
    formData.append('image',img)
    // console.log(formData)
    return requests({
        url:'/dress',
        method:'post',
        data:formData
    })
}
export const NewTrend = (name,detail,type,img)=>{
    // console.log(img)
    const formData = new FormData()
    formData.append('name',name)
    formData.append('detail',detail)
    formData.append('type',type)
    formData.append('image',img)
    // console.log(formData)
    return requests({
        url:'/trend',
        method:'post',
        data:formData
    })
}
export const NewBrand = (name,detail,img)=>{
    // console.log(img)
    const formData = new FormData()
    formData.append('name',name)
    formData.append('detail',detail)
    formData.append('image',img)
    // console.log(formData)
    return requests({
        url:'/brand',
        method:'post',
        data:formData
    })
}
export const NewCloth = (name,detail,type,img)=>{
    // console.log(img)
    const formData = new FormData()
    formData.append('name',name)
    formData.append('detail',detail)
    formData.append('type',type)
    formData.append('image',img)
    // console.log(formData)
    return requests({
        url:'/cloth',
        method:'post',
        data:formData
    })
}
export const NewNews = (title,main,type,img)=>{
    // console.log(img)
    const formData = new FormData()
    formData.append('title',title)
    formData.append('main',main)
    formData.append('type',type)
    formData.append('image',img)
    // console.log(formData)
    return requests({
        url:'/news',
        method:'post',
        data:formData
    })
}
export const UploadDress = (id,name,detail,type,img)=>{
    // console.log(img)
    const formData = new FormData()
    formData.append('name',name)
    formData.append('detail',detail)
    formData.append('type',type)
    formData.append('image',img)
    // console.log(formData)
    return requests({
        url:`/dress/${id}`,
        method:'put',
        data:formData
    })
}
export const UploadCloth = (id,name,detail,type,img)=>{
    // console.log(img)
    const formData = new FormData()
    formData.append('name',name)
    formData.append('detail',detail)
    formData.append('type',type)
    formData.append('image',img)
    // console.log(formData)
    return requests({
        url:`/cloth/${id}`,
        method:'put',
        data:formData
    })
}
export const UploadTrend = (id,name,detail,type,img)=>{
    // console.log(img)
    const formData = new FormData()
    formData.append('name',name)
    formData.append('detail',detail)
    formData.append('type',type)
    formData.append('image',img)
    // console.log(formData)
    return requests({
        url:`/trend/${id}`,
        method:'put',
        data:formData
    })
}
export const UploadBrand = (id,name,detail,img)=>{
    // console.log(img)
    const formData = new FormData()
    formData.append('name',name)
    formData.append('detail',detail)
    formData.append('image',img)
    // console.log(formData)
    return requests({
        url:`/brand/${id}`,
        method:'put',
        data:formData
    })
}
export const UploadNews = (id,title,main,type,img)=>{
    // console.log(img)
    const formData = new FormData()
    formData.append('title',title)
    formData.append('main',main)
    formData.append('type',type)
    formData.append('image',img)
    // console.log(formData)
    return requests({
        url:`/news/${id}`,
        method:'put',
        data:formData
    })
}
export const Delete = (type,id)=>{
    return requests({
        url:`/${type}/${id}`,
        method:'delete',
    })
}
export const UploadImages = (tablename,id,images)=>{
    const formData = new FormData()
    formData.append('tableName',tablename)
    formData.append('recordId',id)
    for(let i=0;i<images.length;i++){
        formData.append('images',images[i])
    }
    // console.log(formData)
    return requests({
        url:`/image/upload`,
        method:'post',
        data:formData
    })
}
export const DeleteImage = (id)=>{
    return requests({
        url:`/image/${id}`,
        method:'delete',
    })
}
export const Login = (data)=>{
    return requests({
        url:'/auth/login',
        method:'post',
        data
    })
}