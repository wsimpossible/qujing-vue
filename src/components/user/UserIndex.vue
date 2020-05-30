<template>
  <el-container style="border:2px solid #C0C0C0;border-radius:10px;height: 600px; width: 1200px; margin: auto">
    <!-- 页面顶部 -->
    <el-header class="logo">
<el-image
      style="width: 55px; height: 55px;margin:5px;float:left"
      :src="url"
      :fit="contain"></el-image>
<div style="float:left">个人中心
</div>
    </el-header>
<el-container style="height: 500px; width: 1200px; margin: auto">
      <el-aside width="200px"
              style="background-color:rgb(238, 241, 246)">
      <br /><br />
      <el-button  @click="charge()"> 充值 </el-button>
      <br /><br />
      <el-button  @click="postal()"> 提现 </el-button>
    </el-aside>
    
      <el-main>
       <div style="margin: auto">
        <el-button type="primary" class="mainbt" @click="release()"> 发布任务 </el-button>
      <el-button type="primary" class="mainbt" @click="accept()"> 接受任务 </el-button>
       </div>
       <div style="margin: auto">
      <el-button type="primary" class="mainbt" @click="myrelease()"> 我发布的任务 </el-button>
      <el-button type="primary" class="mainbt" @click="myaccept()"> 我接受的任务 </el-button>
      </div>
      <el-button  type="text" @click="listnews()">查看通知</el-button>
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
	height: 140px;
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
    charge(){
    this.$router.push('/userindex/charge');
    },
    
    postal(){
    this.$router.push('/userindex/postal');
    },
    release(){
    this.$router.push('/userindex/release');
    },
    accept(){
    this.$router.push('/userindex/accept');
    },
    myrelease(){
    this.$router.push('/userindex/myrelease');
    },
    myaccept(){
    this.$router.push('/userindex/myaccept');
    },
    listnews(){
    this.$router.push('/userindex/news');
    },
    }
    
    
}
</script>