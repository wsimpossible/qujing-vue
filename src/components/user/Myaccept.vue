<template>
  <el-container style="border:2px solid #C0C0C0;border-radius:10px;height: 600px; width: 1200px; margin: auto">
    <!-- 页面顶部 -->
    <el-header class="logo">
<el-image
      style="width: 55px; height: 55px;margin:5px;float:left"
      :src="url"
      :fit="contain"></el-image>
<div style="float:left">我接受的任务
</div>
    </el-header>
<el-container style="height: 500px; width: 1200px; margin: auto">
      <el-aside width="200px"
              style="background-color:rgb(238, 241, 246)">
      <br /><br />
      <br /><br />
      <el-button  @click="menu()"> 返回</el-button>
    </el-aside>
    
      <el-main style="height: 500px; width: 1000px; margin: auto">
       <div style="height: 200px; width: 950px; margin: auto">
        <el-table
    :data="tableData1"
    style="width: 100%">
    <el-table-column
      label="单号"
      width="100">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.id }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="任务名称"
      width="150">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.name}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="任务类型"
      width="100">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.ttid}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="加急"
      width="100">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.expedited }}</span>
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
      label="发布人"
      width="100">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.senderid }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="任务状态"
      width="100">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.state }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="150">
      <template slot-scope="scope">
        <el-button size="mini"  type="primary" @click="handleDeal(scope.$index, scope.row)">处理任务</el-button>
        <el-button type="text" size="mini" @click="setTag1(scope.row)">举报</el-button>

<el-dialog title="举报任务" :visible.sync="dialogFormVisible2">
  <el-form :model="upform2">
<el-form-item label="违规类型">
    <el-select v-model="upform2.suitType" placeholder="请选择违规类型" >
      <el-option label="敏感词汇" value="1"></el-option>
      <el-option label="政治敏感" value="2"></el-option>
      <el-option label="有害信息" value="3"></el-option>
      <el-option label="违规发布" value="4"></el-option>
    </el-select>
  </el-form-item>
    <el-form-item label="描述" :label-width="formLabelWidth">
      <el-input type="textarea" v-model="upform2.content" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible2 = false">取 消</el-button>
    <el-button type="primary" @click="handleReport()">确 定</el-button>
  </div>
</el-dialog> 
   </template>     
    </el-table-column>
    
        </el-table>
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
  name: 'Myaccept',
  data() {
      return {
        url:require('@/assets/logo.png'),
        dialogFormVisible2:false,
        tableData1:'',
        tableData2:'',
        upform2:{
        suitType:'',
        content:'',
        id:'',
        },
        pos:'0',
        result:'',
      }
    },
    //初始化任务列表
    created: function () {
     
    var sendJson = this.pos;
    console.log(sendJson);
      var self=this;
        axios.get('/task/listAccept/'+sendJson)
           .then(response => {
             console.log(response.data)
              self.tableData1 = JSON.parse(JSON.stringify(response.data));
              self.tableData2 = JSON.parse(JSON.stringify(response.data));
            });
        
    },
    methods:{
    menu(){
    this.$router.push('/userindex');
    },
    setTag1(row){
    this.upfoem2.id=row.id
    dialogFormVisible2 = true;
    },
    handleReport()
    {
    var sendJson =this.upform2;
      var self=this;
        axios.post('http://49.234.86.39:8081/qujin/client/list/suit',sendJson)
           .then(response => {
           self.result= JSON.parse(JSON.stringify(response.data));
              if (self.result=="success") {
    	this.$notify({
          title: '成功',
          message: '举报提交成功',
          type: 'success'
        });
        this.$router.push('userindex');
		} else  {
    	this.$notify({
          title: '失败',
          message: '举报提交失败',
          type: 'success'
        });
		}
            });
    dialogFormVisible2 = false;
    
    
    },
    handleDeal(index,row){
    this.$router.push({  
            path: '/userindex/taskdeal', 
            query: {   
                detail:row
            } 
            
        });
    },
    }
    
    
}
</script>