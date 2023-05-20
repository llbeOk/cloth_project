<script setup>
import Header from './components/Header.vue'
</script>
<template>
  <!-- <div class="header">您好！，欢迎来到我们平台</div> -->
  <div class="common-layout">
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <router-view></router-view>
    </el-container>
  </div>
</template>

<style scoped>
.header{
  height:40px;
  width:100%;
  background-color:gray;
  color: black;
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
