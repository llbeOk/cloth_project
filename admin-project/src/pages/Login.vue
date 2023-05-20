<template>
  Login
  <span>用户名<el-input v-model="username"/></span>
  <span>密码<el-input v-model="password"/></span>
  <el-button @click="login()">登录</el-button>
</template>

<script>
import { Login } from '../request/api';
export default {
 data(){
    return{
        username:'',
        password:''
    }
 },
 methods:{
    login(){
        Login({"username":this.username,"password":this.password})
        .then((res)=>{
            console.log(res)
            sessionStorage.setItem('username',this.username)
            alert('登录成功，可以访问其他页面')
        }).catch((err)=>{
            alert('用户名或密码错误')
            console.log(err)
        })
    }
 }
}
</script>

<style>

</style>