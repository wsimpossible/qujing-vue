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
<homebtn></homebtn>
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
      label="加急"
      width="100">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ quick[scope.row.expedited]  }}</span>
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
      label="任务状态"
      width="100">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ taskstatus[scope.row.state]  }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="150">
      <template slot-scope="scope">
        <el-button size="mini"  type="primary" @click="handleDeal(scope.$index, scope.row)" v-if="scope.row.state!='6'">处理任务</el-button>
        <el-button type="text" size="mini" @click="setTag1(scope.row)">举报</el-button>

<el-dialog title="举报任务" :visible.sync="dialogFormVisible2">
  <el-form :model="upform2" ref="upform2" :rules="rules">
<el-form-item label="违规类型" prop="type">
    <el-select v-model="upform2.type" placeholder="请选择违规类型" >
      <el-option label="敏感词汇" value="1"></el-option>
      <el-option label="政治敏感" value="2"></el-option>
      <el-option label="有害信息" value="3"></el-option>
      <el-option label="违规发布" value="4"></el-option>
    </el-select>
  </el-form-item>
    <el-form-item label="描述" :label-width="formLabelWidth" prop="content">
      <el-input type="textarea" v-model="upform2.content" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible2 = false">取 消</el-button>
    <el-button type="primary" @click="handleReport('upform2')">确 定</el-button>
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
        task:'',
        type:'',
        content:'',
        id:'',
        },
        pos:'1',
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
        result:'',
        rules: {
          type: [
            { required: true, message: '请选择违规项', trigger: 'change' }
          ],
          content: [
            { required: true, message: '请输入违规描述', trigger: 'blur' }
          ]
        }
      }
    },
    //初始化任务列表
    created: function () {
     this.getdata();
        
    },
    methods:{
      getdata(){
        var token = localStorage.getItem('token');
       axios.defaults.headers.common['Authorization'] = token;
    var sendJson = this.pos;
    console.log(sendJson);
      var self=this;
        axios.get('/task/listAccept/'+sendJson)
           .then(response => {
             console.log(response.data)
              self.tableData1 = JSON.parse(JSON.stringify(response.data));
              self.tableData2 = JSON.parse(JSON.stringify(response.data));
              this.devidetable();
            });


      },
      devidetable(){
      var jr=[];
      
      for(var i in this.tableData2)
      {

      jr.push(this.tableData2[i].task);
      }
      this.tableData1=jr;
      console.log(this.tableData1);

    },
    menu(){
    this.$router.push('/userindex');
    },
    setTag1(row){
    this.upform2.task=row.id
    this.dialogFormVisible2 = true;
    },
    handleReport(upform2)
    {
    var sendJson =this.upform2;
      var self=this;
      console.log(sendJson);
      this.$refs[upform2].validate((valid) => {
          if (valid) {
            axios.post('/suit/suitTask',sendJson)
           .then(response => {
           self.result= JSON.parse(JSON.stringify(response.data));
              if (response.status=="200") {
    	this.$notify({
          title: '成功',
          message: '举报提交成功',
          type: 'success'
        });
        this.getdata();
       
		} else  {
    	this.$notify({
          title: '失败',
          message: '举报提交失败',
          
        });
		}
            });

          } else {
            console.log('error submit!!');
            return false;
          }
        });
    
    this.dialogFormVisible2 = false;
    
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