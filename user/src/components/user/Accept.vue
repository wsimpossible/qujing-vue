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
<homebtn></homebtn>
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
      label="类型"
      width="100">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ tasktype[scope.row.ttid]  }}</span>
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
      width="200">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.deadline }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="加急"
      width="100">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ quick[scope.row.expedited]  }}</span>
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
  <div class="block">
    <span class="demonstration"></span>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="10"
      layout="total,prev, pager, next, jumper"
      :total="totalpage">
    </el-pagination>
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
        tasktype:{
          '1':'快递代取',
          '2':'文件代送',
          '3':'食堂代买',
          '4':'物品代购',
          '5':'其他',
        },
        quick:{
          '0':'否',
          '1':'是',
        },
        userstatus:{
          '0':'未激活',
          '1':'已激活',
          '2':'冻结中',
        },
        taskstatus:{
          '1':'未被接受',
          '2':'已被接受',
          '3':'取消审核中',
          '4':'取消审核中',
          '5':'已被完成',
          '6':'已被确认',
          '7':'已被删除',
        },
      }
    },
    
    //初始化任务列表
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
        console.log('/task/listUnacceptedTask/'+send);
      this.$http.get('/task/listUnacceptedTask/'+send)
      .then(response => {
           console.log(response.data);
              self.tableData = JSON.parse(JSON.stringify(response.data));
            });
        this.getPage();
      },
      devidetable(){
      var jr=[];
      
      if(this.tableData2.length>='1')
      for(var i in this.tableData2)
      {

      jr.push(this.tableData2[i].task);
      }
      this.tableData=jr;
      

    },

      select(id){
        var self=this;
        console.log('/task/listUnacceptedTaskByType/'+id.start+'/'+id.type);
        this.$http.get('/task/listUnacceptedTaskByType/'+id.start+'/'+id.type)
           .then(response => {
              self.tableData2 = JSON.parse(JSON.stringify(response.data));
            this.devidetable();
            this.getTypePage();
      
            });
            
            
      },
      getPage(){
        var self=this;
        axios.get('/task/getCount/unacceptedTask')
        .then(response => {
              self.totalpage=parseInt(response.data.count);
            });
      },
      getTypePage(){
        var self=this;
        axios.get('/task/getCount/UnacceptedTaskByType/'+self.form.type)
        .then(response => {
              self.totalpage=parseInt(response.data.count);
            });
      },
    //筛选
    	select1(){
    	this.form.type=1;
    	var sendJson = this.form;
      this.select(sendJson);
      },
      
    	select2(){
    	this.form.type=2;
    	var sendJson = this.form;
      this.select(sendJson);
      },
      
    	select3(){
      this.form.type=3;
    	var sendJson = this.form;
      this.select(sendJson);
      },
      
    	select4(){
    	this.form.type=4;
    	var sendJson = this.form;
      this.select(sendJson);
    	},
    	select5(){
    	this.form.type=5;
    	var sendJson = this.form;
      this.select(sendJson);
      },
      select6(){
    	this.form.type=6;
    	var sendJson = this.form;
      this.select(sendJson);
    	},
    	//接受某任务
    	handleAccept(index,row){
  
    	var sendJson = row.id;
    	console.log(sendJson)
      var self=this;
    	this.$http.put('/task/acceptTask/'+sendJson)
           .then(response => {
           if(response.status=="200"){
             this.$message({
          showClose: true,
          message: '任务接受成功',
           type: 'success'  
        });
        this.getData();

           }
             
  
          else{
            this.$message({
          showClose: true,
          message: '任务接受失败'
            
        });
          }
            });
    	
    	
    	},
      //处理跳页
      handleCurrentChange(val) {
        this.pos.start=val;
        if(this.form.type=='0'){
          this.getData();
        }
        else{
            this.form.start=val;
            var sendJson=this.form;
            this.select(sendJson);
        }
      },
    	menu(){
    this.$router.push('/userindex');
    }
    }
    
    
}
</script>