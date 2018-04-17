<template>
  <div id="app">
  <header>
    <div class="logo">EL</div>
    <h2>EL后台管理系统</h2>
  </header>
    <div class="aside"> 
      <ul class="item">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
    <div class="container">
      <router-view/>    
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>

html,body{
  padding: 0;
  margin: 0;
  height:100%;
  width:100%;
}
ul,ol{
  margin: 0;
  padding:0;
}
header{
  height:120px;  
  line-height:120px;
  background-color:skyblue;
}
header h2{
  color:#fff;
  font-size:40px;
  margin:0;
}
header .logo{
  font-size:100px;
  float:left;
  width:20%;
}
.aside{
  min-width:20%;
  height:100%;
  float:left;
  background-color:deeppink;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  height:100%;
}
.container{
  float:left;
  height:100%;
  width:80%;
  background-color: rgb(6, 39, 78);  
}
</style>
