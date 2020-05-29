<template>
  <el-container style="border:2px solid #C0C0C0;border-radius:10px;height: 600px; width: 1200px; margin: auto">
    <!-- 页面顶部 -->
    <el-header class="logo">
<el-image
      style="width: 55px; height: 55px;margin:5px;float:left"
      :src="url"
      :fit="contain"></el-image>
<div style="float:left">提现
</div>
    </el-header>
<el-container style="height: 500px; width: 1200px; margin: auto">
      <el-aside width="200px"
              style="background-color:rgb(238, 241, 246)">
      <br /><br />
      <el-button  @click="menu()"> 返回 </el-button>
    </el-aside>
    
      <el-main>
       提现表单
      </el-main>
    </el-container>
  </el-container>
</template>

<style>
.el-header {
  background-color: #c1cbd8;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
.logo{
    font-family:"Microsoft YaHei";
	font-size:24px;
	color:#33CCFF;
	background-color:#CCFFFF
}
.mainbt{
	width: 300px;
	height: 150px;
	margin:40px
}
</style>

<script>
export default {
  name: 'UserIndex',
  data() {
      return {
        url:require('@/assets/logo.png')
      }
    },
    methods:{
    menu(){
    this.$router.push('userindex');
    }
    }
    
    
}
</script>