<template>
    <el-affix :offset="120">
      <el-menu
          default-active="0"
          class="el-menu-vertical-demo"
        >
        <h4 class="mb-2">热门栏目</h4>
          <el-menu-item index="1">
            <span>服装面料</span>
          </el-menu-item>
          <el-menu-item index="2">
            <span>面料分析</span>
          </el-menu-item>
          <el-menu-item index="3">
            <span>图案分析</span>
          </el-menu-item>
          <el-menu-item index="4">
            <span>品牌发布</span>
          </el-menu-item>
          <el-menu-item index="5" >
            <span>最新发布</span>
          </el-menu-item>
        </el-menu>
    </el-affix>
  </template>
  
  <script>
  export default {
  
  }
  </script>
  
  <style>
  
  </style>