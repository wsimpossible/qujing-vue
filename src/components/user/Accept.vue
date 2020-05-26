<template>
  <el-container style="border:2px solid #C0C0C0;border-radius:10px;height: 600px; width: 1200px; margin: auto">
    <!-- 页面顶部 -->
    <el-header class="logo">
<el-image
      style="width: 55px; height: 55px;margin:5px;float:left"
      :src="url"
      :fit="contain"></el-image>
<div style="float:left">任务列表
</div>
    </el-header>
<el-container style="height: 500px; width: 1200px; margin: auto">
      <el-aside width="200px"
              style="background-color:rgb(238, 241, 246)">
      <br /><br />
      <el-button  type="primary" @click="select1()"> 快递代取 </el-button>
      <br /><br />
      <el-button  type="primary" @click="select2()"> 文件代送 </el-button>
      <br /><br />
      <el-button  type="primary" @click="select3()"> 食堂代买</el-button>
      <br /><br />
      <el-button  type="primary" @click="select4()"> 物品代购</el-button>
      <br /><br />
      <el-button  type="primary" @click="select5()"> 其他</el-button>
      <br /><br />
      <el-button  @click="menu()"> 返回</el-button>
    </el-aside>
    
      <el-main>
       <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      label="序号"
      width="100">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.id }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="任务名"
      width="200">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.name }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="积分"
      width="100">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.points }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="截止时间"
      width="150">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.deadline }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="加急"
      width="100">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.expedited }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        
  <el-button
	  slot="reference"
          size="mini"
          @click="handleAccept(scope.$index, scope.row)">接受任务</el-button>

   </template>     
    </el-table-column>
    
  </el-table>
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
import axios from 'axios' 
export default {
  name: 'Accept',
  data() {
      return {
        url:require('../assets/logo.png'),
        visible: false,
         tableData:'',
        pos:{start:'0'},
        form:{
          start:'0',
          type:'',
        },
        result:'',
        tid:{id:''},
        
      }
    },
    //初始化任务列表
    created: function () {
    var sendJson = JSON.stringify(this.pos);
      var self=this;
      console.log(sendJson);
      var token = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = token;
      axios.defaults.headers.common['Content-Type'] = 'application/json';
        axios.post('http://49.234.86.39:8081/qujin/client/list/task',sendJson)
           .then(response => {
           console.log(response.data);
              self.tableData = JSON.parse(JSON.stringify(response.data.tasks));
            })
        
    },
    methods:{
    //筛选
    	select1(){
    	self.form.type=1;
    	var sendJson = this.form;
      var self=this;
      
        axios.post('http://49.234.86.39:8081/qujin/client/list/taskBytype',sendJson)
           .then(response => {
              self.tableData = JSON.parse(JSON.stringify(response.data.tasks));
            });
    	},
    	select2(){
    	
      self.form.type=2;
      var sendJson = this.form;
      var self=this;
        axios.post('http://49.234.86.39:8081/qujin/client/list/taskBytype',sendJson)
           .then(response => {
              self.tableData = JSON.parse(JSON.stringify(response.data.tasks));
            });
    	},
    	select3(){
    	
      self.form.type=3;
      var sendJson = this.form;
      var self=this;
        axios.post('http://49.234.86.39:8081/qujin/client/list/taskBytype',sendJson)
           .then(response => {
              self.tableData = JSON.parse(JSON.stringify(response.data.tasks));
            });
    	},
    	select4(){
    	
      self.form.type=4;
      var sendJson = this.form;
      var self=this;
        axios.post('http://49.234.86.39:8081/qujin/client/list/taskBytype',sendJson)
           .then(response => {
              self.tableData = JSON.parse(JSON.stringify(response.data.tasks));
            });
    	},
    	select5(){
    	
      self.form.type=5;
      var sendJson = this.form;
      var self=this;
        axios.post('http://49.234.86.39:8081/qujin/client/list/taskBytype',sendJson)
           .then(response => {
              self.tableData = JSON.parse(JSON.stringify(response.data.tasks));
            });
    	},
    	//接受某任务
    	handleAccept(index,row){
      this.tid.id=row.id;
    	var sendJson = this.tid;
    	console.log(sendJson)
      var self=this;
    	axios.post('http://49.234.86.39:8081/qujin/client/list/acceptTask',sendJson)
           .then(response => {
           self.result=JSON.parse(JSON.stringify(response.data));
    	this.$message({
          showClose: true,
          message: '任务接受成功'
            
        });

            });
    	
    	
    	},
    	menu(){
    this.$router.push('userindex');
    }
    }
    
    
}
</script>