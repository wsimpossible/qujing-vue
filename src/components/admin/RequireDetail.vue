<template>
  <el-container style="border:2px solid #C0C0C0;border-radius:10px;height: 600px; width: 1200px; margin: auto">
    <el-header class="logo">
<el-image
      style="width: 55px; height: 55px;margin:5px;float:left"
      :src="url"
      :fit="contain"></el-image>
<div style="float:left">请求详细
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
    	<h5>取消理由：</h5>
        </div>
        <div style="height:45px">
    	<h5>收货人：</h5>
        </div>
        <div style="height:45px">
    	<h5>送货人：</h5>
        </div>
        <div style="height:45px">
    	<h5>请求取消者：</h5>
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
    	<b><p>{{detail.cancleContent}}</p></b>
        </div>
        <div style="height:45px">
    	<b><p>{{detail.receiverName}}</p></b>
        </div>
        <div style="height:45px">
    	<b><p>{{detail.senderName}}</p></b>
        </div>
        <div style="height:45px">
    	<b><p>{{detail.cancleName}}</p></b>
        </div>
    </div>
    <div style="height:380px; width:200px;float:left">
    <el-col>
	<el-button type="primary" style="width:120px" @click="dialogFormVisible = true">同意取消</el-button>
<el-dialog title="双方积分调整" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="收货方积分调整" :label-width="formLabelWidth">
      <el-input v-model="form.score1" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="送货方积分调整：" :label-width="formLabelWidth">
      <el-input v-model="form.score2" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="handleCancel()">确 定</el-button>
  </div>
</el-dialog>
	<br /><br />
	<el-button type="primary" style="width:120px" @click="handleKnock()">退回请求</el-button>
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
  name: 'ReportDetail',
  data() {
      return {
      url:require('@/assets/logo.png'),
      detail:'',
      dialogFormVisible:false,
      form: {
          score1:'',
          score2:''
        },
       ID:'' 
    }
   
   
   
    },

    //请求举报的任务详情页
    created: function () {
    this.ID=this.$route.query.id;

    var self=this;
        axios.get('http://localhost:8080/qujing/admin/canclemanage/showDetail.do',{params: {id:self.ID}})
           .then(response => {
              this.detail=response.data;
            });
    
        
    },
  	methods: {
  	//处理同意取消
      handleCancel(index, row) {
      	this.dialogFormVisible = false;
      	var self=this;
      axios.get('http://localhost:8080/qujing/admin/canclemanage/cancle.do',{params: {id:self.detail.cancleID,senderpoints:self.form.score2,receiverpoints:self.form.score1,type:self.detail.type}})
           .then(response => {
              
            });
         this.$alert('请求已通过', '消息', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });   
      },
      //处理退回请求
      handleKnock() {
      var self=this;
      axios.get('http://localhost:8080/qujing/admin/canclemanage/refusecancle.do',{params: {id:self.detail.cancleID,type:self.detail.type}})
           .then(response => {
              
            });
      	this.$alert('请求已退回', '消息', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
      },
      handleBack(index, row) {
       this.$router.push("/admin/require");
      }
     
    }
  
}
</script>
