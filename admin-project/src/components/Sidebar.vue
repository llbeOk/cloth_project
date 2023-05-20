<template>
    <el-menu class="el-menu-vertical-demo">
        
        <el-menu-item index="1">
            <router-link to="/dress">
                <a href="">服装面料管理</a>
            </router-link>
        </el-menu-item>
        <el-menu-item index="2">
            <router-link to="/cloth">
                <a href="">面料图案管理</a>
            </router-link>
        </el-menu-item>
        <el-menu-item index="3">
            <router-link to="/brand">
                <a href="">品牌发布管理</a>
            </router-link>
        </el-menu-item>
        <el-menu-item index="4">
            <router-link to="/news">
                <a href="">新闻管理</a>
            </router-link>
        </el-menu-item>
        <el-menu-item index="5">
            <router-link to="/trend">
                <a href="">流行趋势管理</a>
            </router-link>
        </el-menu-item>
        <el-menu-item index="6">
            <router-link to="/login">
            <a href="">登录页</a>
            </router-link>
        </el-menu-item>
    </el-menu>
</template>

<script>
export default {

}
</script>

<style>

</style>