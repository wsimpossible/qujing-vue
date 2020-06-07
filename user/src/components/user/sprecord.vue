<template>
  <el-container style="border:2px solid #C0C0C0;border-radius:10px;height: 600px; width: 1200px; margin: auto">
    <!-- 页面顶部 -->
    <el-header class="logo">
<el-image
      style="width: 55px; height: 55px;margin:5px;float:left"
      :src="url"
      :fit="contain"></el-image>
<div style="float:left">充值记录
</div>
<homebtn></homebtn>
    </el-header>
<el-container style="height: 500px; width: 1200px; margin: auto">
      <el-aside width="200px"
              style="background-color:rgb(238, 241, 246)">
      <br /><br />
      <el-button  @click="menu()"> 返回</el-button>
    </el-aside>
    
      <el-main>
       <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      label="消费id"
      width="100">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.id }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="类型"
      width="100">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ type[scope.row.type]  }}</span>
      </template>
    </el-table-column>
    
    <el-table-column
      label="金额"
      width="100">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.amount }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="消费时间"
      width="200">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.time }}</span>
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
  name: 'Sprecord',
  data() {
      return {
        url:require('@/assets/logo.png'),
        visible: false,
         tableData:'',
         tableData2:'',
        pos:{start:1},
        form:{
          start:1,
          type:'',
        },
        result:'',
        tid:{id:''},
        totalpage:100,
        currentPage:1,
        type:{
          '1':'发布任务',
          '2':'提现',
          '3':'违规惩罚',
          
        },
        
      }
    },
    
    //初始化列表
    created: function () {
      var token = localStorage.getItem('token');
       axios.defaults.headers.common['Authorization'] = token;
      this.form.type='0';
      this.getData();
      
    },
    methods:{
      getData(){
        var send =this.pos.start;
        var self=this;
     
      this.$http.get('/pay/listExpenseRecord/'+send)
      .then(response => {
    
              self.tableData = JSON.parse(JSON.stringify(response.data));
            });
        
      },
      
      
    	menu(){
    this.$router.push('/userindex');
    }
    }
    
    
}
</script>