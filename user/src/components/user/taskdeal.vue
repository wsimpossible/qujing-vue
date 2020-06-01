<template>
  <el-container style="border:2px solid #C0C0C0;border-radius:10px;height: 600px; width: 1200px; margin: auto">
    <el-header class="logo">
<el-image
      style="width: 55px; height: 55px;margin:5px;float:left"
      :src="url"
      :fit="contain"></el-image>
<div style="float:left">处理任务
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
        <div style="height:45px">
    	<h5>积分：</h5>
        </div>
        <div style="height:45px">
    	<h5>加急：</h5>
        </div>
        <div style="height:100px">
    	<h5>任务详情：</h5>
        </div>
        <div style="height:45px">
    	<h5>发布者：</h5>
        </div>
    	<div style="height:100px">
    	<h5>截止时间：</h5>
        </div>
        
    </div>
    <div style="height:380px; width:400px;float:left">
    	<div style="height:45px">
    	<b><p>{{detail.name}}</p></b>
        </div>
        <div style="height:45px">
    	<b><p>{{detail.points}}</p></b>
        </div>
        <div style="height:45px">
    	<b><p>{{detail.expedited}}</p></b>
        </div>
        
        <div style="height:100px">
    	<b><p>{{detail.content}}</p></b>
        </div>
        <div style="height:45px">
    	<b><p>{{detail.senderid}}</p></b>
        </div>
    	<div style="height:100px">
    	<b><p>{{detail.deadline}}</p></b>
        </div>
        
    </div>
    <div style="height:380px; width:150px;float:left">
    <br /><br />
      <el-button type="primary" @click="compelete()"> 完成任务 </el-button>
      <br /><br />
      <el-button type="primary" @click="dialogFormVisible1 = true">取消任务</el-button>

<el-dialog title="取消任务" :visible.sync="dialogFormVisible1">
  <el-form :model="upform1">
    <el-form-item label="理由类型">
    <el-select v-model="upform1.type" placeholder="请选择理由类型" >
      <el-option label="我已完成" value="1"></el-option>
      <el-option label="太久无人接单" value="2"></el-option>
      <el-option label="协商后取消" value="3"></el-option>
      <el-option label="临时有事" value="4"></el-option>
      <el-option label="其他" value="5"></el-option>
    </el-select>
  </el-form-item>
    <el-form-item label="描述" :label-width="formLabelWidth">
      <el-input type="textarea" v-model="upform1.content" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible1 = false">取 消</el-button>
    <el-button type="primary" @click="handleCancel()">确 定</el-button>
  </div>
</el-dialog>
      <br /><br />
      <el-button type="primary"  @click="dialogFormVisible2 = true"> 欺诈反馈</el-button>

<el-dialog title="任务反馈" :visible.sync="dialogFormVisible2">
  <el-form :model="upform2">
    <el-form-item label="理由" :label-width="formLabelWidth">
      <el-input type="textarea" v-model="upform2.content" autocomplete="off"></el-input>
    </el-form-item>

  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible2 = false">取 消</el-button>
    <el-button type="primary" @click="handleBack()">确 定</el-button>
  </div>
</el-dialog>
      <br /><br />
      <el-button type="primary" @click="back()"> 返回 </el-button>
      
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
  name: 'Tsakdeal',
  data() {
      return {
      url:require('@/assets/logo.png'),
      detail:'',
      dialogFormVisible:false,
      form: {
          score1:'',
          score2:''
        },
       ID:'',
       upform1:{
       		id:'',
          type:'',
          content:''
        },
        upform2:{
          task:'',
          type:'',
          content:'',
        } ,
        dialogFormVisible1:false,
        dialogFormVisible2:false,
        tid:{id:''},
    }
   
   
   
    },
    //任务详情页
    created: function () {
     this.detail=this.$route.query.detail;  
    var sendJson = this.detail.id;
    console.log(sendJson);
      var self=this;
        axios.get('/task/getDetailTask/'+sendJson)
           .then(response => {
             console.log(response.data)
              self.detail=response.data;
            });
        
    },
  
  	methods: {
  	back(){
  	this.$router.push('/userindex/myaccept');
  	},
  	//请求取消任务
  	handleCancel(){
     var sendJson = this.upform1;
     console.log(sendJson);
      var self=this;
        axios.delete('/task/receiver/cancel/'+self.detail.id,{data:sendJson})
           .then(response => {
             
              if(response.status=="200")
              {
              this.$notify({
          title: '成功',
          message: '取消请求成功',
          type: 'success'
        });
              }else{
              this.$notify({
          title: '失败',
          message: '取消请求失败',
          type: 'success'
        });
              }
            });
    	this.dialogFormVisible1 = false;
    },
    //任务反馈
    handleBack(){
      this.upform2.task=this.detail.id;
     var sendJson = this.upform2;
      var self=this;
        axios.post('/feedback/suitTask',sendJson)
           .then(response => {
             
              if(response.status=="200")
              {
              this.$notify({
          title: '成功',
          message: '反馈提交成功',
          type: 'success'
        });
              }else{
              this.$notify({
          title: '失败',
          message: '反馈提交失败',
          type: 'success'
        });
              }
            });
    	this.dialogFormVisible2 = false;
    },
    compelete(){
  
      var self=this;
        axios.put('/task/receiver/accomplish/'+self.detail.id)
           .then(response => {
              self.result=JSON.parse(JSON.stringify(response.data));
              if(response.status=="200")
              {
              this.$notify({
          title: '成功',
          message: '确认任务成功',
          type: 'success'
        });
        this.$router.push('/userindex/myaccept');
              }else{
              this.$notify({
          title: '失败',
          message: '确认任务失败',
          
        });
              }
            });
    } 
    }
  
}
</script>
