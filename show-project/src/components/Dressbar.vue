<template>
    <el-affix :offset="120">
      <el-menu
          default-active="0"
          class="el-menu-vertical-demo"
        >
        <h4 class="mb-2">服装面料</h4>
          <el-menu-item index="1">
            <span>棉布</span>
          </el-menu-item>
          <el-menu-item index="2">
            <span>麻布</span>
          </el-menu-item>
          <el-menu-item index="3">
            <span>丝绸</span>
          </el-menu-item>
          <el-menu-item index="4">
            <span>呢绒</span>
          </el-menu-item>
          <el-menu-item index="5" >
            <span>皮革</span>
          </el-menu-item><el-menu-item index="6" >
            <span>化纤</span>
          </el-menu-item><el-menu-item index="7" >
            <span>混纺</span>
          </el-menu-item>
        <el-menu-item index="7" >
            <span>其他</span>
          </el-menu-item>
        </el-menu>
    </el-affix>
  </template>
  
  <script>
  export default {
  
  }
  </script>
  
  <style>
    .el-menu-item span{
        margin-left: 40px;
        font-size: 16px;
    }
  </style>