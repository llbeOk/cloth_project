<script setup>
import { Login,Register } from '../request/api'
</script>
<template>
   <el-dialog
    v-model="Logindialog"
    title="登录"
    width="30%"
  >
    <div>
    <span>用户名:</span>
    <el-input v-model="user.username"></el-input>
    </div>
    <div>
    <span >密码:</span>
    <el-input v-model="user.password"/> 
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click=" Logindialog= false">Cancel</el-button>
        <el-button type="primary" @click="CheckLogin()">
          登录
        </el-button>
      </span>
    </template>
  </el-dialog><el-dialog
    v-model="Registerlog"
    title="登录"
    width="30%"
  >
    <div>
    <span>用户名:</span>
    <el-input v-model="newuser.username"></el-input>
    </div>
    <div>
    <span >密码:</span>
    <el-input v-model="newuser.password"/> 
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click=" Registerlog= false">Cancel</el-button>
        <el-button type="primary" @click="CheckRegiter()">
          注册
        </el-button>
      </span>
    </template>
  </el-dialog>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
    >
      <el-menu-item index="0">LOGO</el-menu-item>
      <div class="flex-grow" />
      <router-link to="/home">
      <el-menu-item index="1">首页</el-menu-item>
      </router-link>
      <router-link to="/dress">
      <el-menu-item index="2">服装面料</el-menu-item>
      </router-link>
      <router-link to="/cloth">
      <el-menu-item index="3">面料图案</el-menu-item>
      </router-link>
      <router-link to="/trend">
      <el-menu-item index="4">流行趋势</el-menu-item>
      </router-link>
      <router-link to="/brand">
      <el-menu-item index="5">品牌发布</el-menu-item>
      </router-link>
      <router-link to="/news">
      <el-menu-item index="6">行业资讯</el-menu-item>
      </router-link>
      <router-link to="/school">
      <el-menu-item index="7">校企合作</el-menu-item>
      </router-link>
      <el-button @click="Logindialog=true">登录</el-button>
      <el-button @click="Registerlog=true">注册</el-button>
    </el-menu>
  </template>
  <script>
 export default {
   data(){
    return{
      Logindialog:false,
      Registerlog:false,
      user:{
        username:'',
        password:''
      },
      newuser:{
        username:'',
        password:''
      }
    }
   },
   methods:{
    CheckLogin(){
      this.Logindialog = false,
      Login(this.user).then((res)=>{
        if(res.data.message='login success')
        alert('登陆成功')
      }).catch((err)=>{
        alert('用户名或密码错误')
        console.log(err)
      })
    },
    CheckRegiter(){
      this.Registerlog=false
      Register(this.newuser).then((res)=>{
        if(res.data.message= "register success")
        alert('注册成功')
        else
        alert('注册失败，用户名重复')
      }).catch((err)=>{
        console.log(err);
        alert('用户名已存在或服务器未响应')
      })
    }
   }
  }
  </script>
  
  
  <style>
  .flex-grow {
    flex-grow: 1;
  }
  .el-menu .el-button{
    margin-left:20px;
    margin-top:10px
  }
  </style>
  
  