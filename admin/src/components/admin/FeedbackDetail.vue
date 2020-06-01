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
      <el-menu router='true'>
        <!-- 开启菜单中的router=true之后，点击菜单会把index作为路由跳转路径 -->
        <el-menu-item index="/admin/user">
          <i class="el-icon-setting"></i>用户管理
        </el-menu-item>
        <el-menu-item index="/admin/report">
          <i class="el-icon-setting"></i>举报管理
        </el-menu-item>
        <el-menu-item index="/admin/feedback">
          <i class="el-icon-setting"></i>反馈管理
        </el-menu-item>
        <el-menu-item index="/admin/require">
          <i class="el-icon-setting"></i>请求审核
        </el-menu-item>
      </el-menu>
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
    	<h5>反馈详细：</h5>
        </div>
        <div style="height:45px">
    	<h5>收货人：</h5>
        </div>
        <div style="height:45px">
    	<h5>送货人：</h5>
        </div>
        <div style="height:45px">
    	<h5>反馈人：</h5>
        </div>
    </div>
    <div style="height:380px; width:450px;float:left">
    	<div style="height:45px">
    	<b><p>{{detail.taskName}}</p></b>
        </div>
        <div style="height:100px">
    	<b><p>{{detail.taskContent}}</p></b>
        </div>
    	<div style="height:100px">
    	<b><p>{{detail.backContent}}</p></b>
        </div>
        <div style="height:45px">
    	<b><p>{{detail.receiverName}}</p></b>
        </div>
        <div style="height:45px">
    	<b><p>{{detail.senderName}}</p></b>
        </div>
        <div style="height:45px">
    	<b><p>{{detail.backName}}</p></b>
        </div>
    </div>
    <div style="height:380px; width:200px;float:left">
    <el-col>
	<el-button type="primary" style="width:120px" @click="handleDelete()">反馈已读</el-button>
	<br /><br />
	<el-button type="primary" style="width:120px" @click="handleTrans()">用户管理</el-button>
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
      url:require('@/assets/logo.png'),
      detail:'',
      ID:''
    }
    
    },

    //请求反馈的任务详情页
    created: function () {
    this.ID=this.$route.query.id;
    var self=this;
        axios.get('url',{params: {id:self.ID}})
           .then(response => {
              this.detail=response.data;
            })
        
    },
   methods:{
   //处理反馈已读按钮
      handleDelete() {
      var self=this;
      axios.get('url',{params: {id:self.detail.backID}})
           .then(response => {
              
            });
      this.$alert('反馈已删除', '消息', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
      },
      handleUndelete() {
      var self=this;
      axios.get('url',{params: {id:self.detail.backID}})
           .then(response => {
              
            });
      	this.$alert('举报已移出', '消息', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
        this.$router.push("/admin/feedback");
      },
      handleTrans() {
      this.$router.push("/admin/user");
     
      },
      handleBack() {
      this.$router.push("/admin/feedback");
      
      }
   
   
    }
  
  
}
</script>
