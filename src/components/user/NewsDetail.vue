<template>
  <el-container style="border:2px solid #C0C0C0;border-radius:10px;height: 600px; width: 1200px; margin: auto">
    <el-header class="logo">
<el-image
      style="width: 55px; height: 55px;margin:5px;float:left"
      :src="url"
      :fit="contain"></el-image>
<div style="float:left">反馈详细
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
    	<h5>通知发布时间：</h5>
        </div>
        <div style="height:100px">
    	<h5>通知类型：</h5>
        </div>
    	<div style="height:100px">
    	<h5>通知详细：</h5>
        </div>
        <div style="height:45px">
    	<h5>发布者：</h5>
        </div>
    </div>
    <div style="height:380px; width:450px;float:left">
    	<div style="height:45px">
    	<b><p>{{detail.data}}</p></b>
        </div>
        <div style="height:100px">
    	<b><p>{{detail.type}}</p></b>
        </div>
    	<div style="height:100px">
    	<b><p>{{detail.content}}</p></b>
        </div>
        
        <div style="height:45px">
    	<b><p>{{detail.senderName}}</p></b>
        </div>
        
    </div>
    <div style="height:380px; width:200px;float:left">
    <el-col>
	<el-button type="primary" style="width:120px" @click="handleDelete()">删除通知 </el-button>
	<br /><br />
	
	<el-button style="width:120px" @click="handleBack()">返回</el-button>
	</el-col>
    
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
	display:inline;
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
  name: 'ReportDetail',
  data() {
      return {
      url:require('../assets/logo.png'),
      detail:'',
      ID:''
    }
    
    },

    //请求通知详情页
    created: function () {
    this.ID=this.$route.query.id;
    var self=this;
        axios.get('url',{params: {id:self.ID}})
           .then(response => {
              this.detail=response.data;
            })
        
    },
   methods:{
   //处理s删除通知
      handleDelete() {
      var self=this;
      axios.get('url',{params: {id:self.detail.backID}})
           .then(response => {
              
            });
      this.$alert('通知已删除', '消息', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
      },
      
     
      handleBack() {
      this.$router.push("/userindex/news");
      
      }
   
   
    }
  
  
}
</script>
