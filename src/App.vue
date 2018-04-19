<template>
  <div id="app">
    <!-- <header>
      <div class="logo">EL</div>
      <h2>EL后台管理系统</h2>
    </header> -->
    <el-container>
      <el-header style="height:80px;"><h1>EL</h1><h2>EL 后台管理系统</h2></el-header>
      <el-container>
        <el-aside width="200px">
          <el-row class="tac">
            <el-col :span="24">
              <el-menu default-active="1-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#545c64" text-color="#fff" active-text-color="#00877C">
                <el-submenu index="1">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>首页</span>
                  </template>
                  <el-menu-item-group>
                    <router-link to="/">
                      <el-menu-item index="1-1">内容管理</el-menu-item>
                    </router-link>
                    <router-link to="/category">
                      <el-menu-item index="1-2">分类管理</el-menu-item>
                    </router-link>
                  </el-menu-item-group>
                </el-submenu>
                 <el-submenu index="2">
                  <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>商城</span>
                  </template>
                  <el-menu-item-group>
                    <router-link to="/mall">
                      <el-menu-item index="2-1">内容管理</el-menu-item>
                    </router-link>
                    <router-link to="/category">
                      <el-menu-item index="2-2">分类管理</el-menu-item>
                    </router-link>
                  </el-menu-item-group>
                </el-submenu>
                <el-submenu index="3">
                  <template slot="title">
                    <i class="el-icon-document"></i>
                    <span>博客</span>
                  </template>
                  <el-menu-item-group>
                    <router-link to="/blog">
                      <el-menu-item index="3-1">内容管理</el-menu-item>
                    </router-link>
                    <router-link to="/category">
                      <el-menu-item index="3-2">分类管理</el-menu-item>
                    </router-link>
                  </el-menu-item-group>
                </el-submenu>
                <el-submenu index="4">
                  <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>关于</span>
                  </template>
                  <el-menu-item-group>
                    <router-link to="/about">
                      <el-menu-item index="4-1">内容管理</el-menu-item>
                    </router-link>
                  </el-menu-item-group>
                </el-submenu>
                <el-menu-item index="5">
                  <i class="el-icon-setting"></i>
                  <span slot="title">设置</span>
                </el-menu-item>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <el-container>
          <el-main>
            <router-view></router-view>
          </el-main>
          <el-footer>©2018 - 2021 深圳市意龙通信技术有限公司</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style>
h1,h2,h3,h4,h5,ul,ol,p{
  margin: 0;
  padding: 0;
  font-weight: normal;
}
a{
  text-decoration: none;
}
.el-button--primary:focus, .el-button--primary:hover {
    background: #00877C;
    border-color: #00877C;
    color: #fff;
}
.el-button--primary{
    color: #fff;
    background-color: #00877C;
    border-color: #00877C;
}
#app,
.el-container{
  height: 100%;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 80px;
  font-size: 24px;
}
.el-header{
  padding: 0;
}
.el-header>h2{
  width: 100%;
  font-family: "Helvetica Neue";
  letter-spacing: 1px;
  line-height: 80px;
}
.el-header>h1{
  float: left;
  font-family: "Hiragino Sans GB";
  font-size: 60px;
  line-height: 80px;
  color: #fff;
  letter-spacing: 10px;
  background-color: #333;
  width: 200px;
}
.el-aside {
  background-color: #545C64;
  color: #333;
  text-align: center;
  line-height: 200px;
  height: 100%;
}
.el-submenu{
  width: 200px;
}
.el-menu-item,
.el-menu-item.is-active,
.el-submenu .el-menu-item{
  width: 200px;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  line-height: 60px;
}
body > .el-container {
  margin-bottom: 40px;
}
.el-footer{
  font-size: 18px;
}
</style>
