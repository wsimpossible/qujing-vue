<template>
  <el-container style="border:2px solid #C0C0C0;border-radius:10px;height: 600px; width: 1200px; margin: auto">
    <el-header class="logo">
<el-image
      style="width: 55px; height: 55px;margin:5px;float:left"
      :src="url"
      :fit="contain"></el-image>
<div style="float:left">任务详细
</div>
    </el-header>

    <el-container >
    <el-aside width="200px"
              style="background-color: rgb(238, 241, 246)">
      
    </el-aside>
    <el-main>
    <div style="height:380px; width:900px">
    <div style="height:380px; width:200px; float:left">
    	<div style="height:45px">
    	<h5>任务名：</h5>
        </div>
        <div style="height:100px">
    	<h5>任务描述：</h5>
        </div>
    	<div style="height:100px">
    	<h5>积分：</h5>
        </div>
        
    </div>
    <div style="height:380px; width:450px;float:left">
    	<div style="height:45px">
    	<b><p>{{detail.name}}</p></b>
        </div>
        <div style="height:100px">
    	<b><p>{{detail.content}}</p></b>
        </div>
    	<div style="height:100px">
    	<b><p>{{detail.points}}</p></b>
        </div>
        
    </div>
    <div style="height:380px; width:200px;float:left">
    <el-button  @click="handleBack()"> 返回</el-button>
    </div>
    </div>
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

.div-inline{ 
	display:inline
} 
p{ 
	font-family:"Hiragino Sans GB";
	font-size:17px;
	font-weight:600;
} 
.logo{
    font-family:"Microsoft YaHei";
	font-size:24px;
	color:#33CCFF;
	background-color:#CCFFFF
}
	
</style>

<script>
import axios from 'axios'
export default {
  name: 'Taskdetail',
  data() {
      return {
      url:require('@/assets/logo.png'),
      detail:'',
      send:{id:''},
    }
   
   
   
    },
    //任务详情页
    created: function () {
    this.ID=this.$route.query.detail;

    
        
    },
  	methods: {
  			handleBack() {
       this.$router.push("/userindex/myaccept");
      }
    }
  
}
</script>
