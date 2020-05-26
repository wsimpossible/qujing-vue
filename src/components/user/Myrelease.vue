<template>
  <el-container style="border:2px solid #C0C0C0;border-radius:10px;height: 600px; width: 1200px; margin: auto">
    <!-- 页面顶部 -->
    <el-header class="logo">
<el-image
      style="width: 55px; height: 55px;margin:5px;float:left"
      :src="url"
      :fit="contain"></el-image>
<div style="float:left">我发布的任务
</div>
    </el-header>
<el-container style="height: 500px; width: 1200px; margin: auto">
      <el-aside width="200px"
              style="background-color:rgb(238, 241, 246)">
      <br /><br />
      <el-button type="primary"  @click="release()"> 发布新任务 </el-button>
      <br /><br />
      <el-button  @click="menu()"> 返回</el-button>
    </el-aside>
    
      <el-main style="height: 500px; width: 1000px; margin: auto">
       <div style="height: 200px; width: 800px; margin: auto">
        <el-table
    :data="tableData1"
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
      label="剩余时间(分钟)"
      width="150">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.deadline }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="是否已接单"
      width="100">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.receiverid }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
      <el-button type="text" @click="setTag1(scope.row)">取消任务</el-button>

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
    <el-form-item label="理由" :label-width="formLabelWidth">
      <el-input type="textarea" v-model="upform1.content" autocomplete="off"></el-input>
    </el-form-item>

  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible1 = false">取 消</el-button>
    <el-button type="primary" @click="handleCancel()">确 定</el-button>
  </div>
</el-dialog>
        
   </template>     
    </el-table-column>
    
  </el-table>
       </div>
       <el-divider></el-divider>
       <div style="height: 200px; width: 800px; margin: auto">
      <el-table
    :data="tableData2"
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
    
    <el-table-column label="操作">
      <template slot-scope="scope">
      <el-button type="primary" @click="setTag2(scope.row)">已收到</el-button>

<el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
  <span>确认任务已完成？</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="handleCom()">确 定</el-button>
  </span>
</el-dialog>

<el-button type="text" size="mini" style="margin:2px 2px 2px 40px" @click="setTag3(scope.row)">反馈</el-button>

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
  name: 'Myrelease',
  data() {
      return {
      dialogVisible:false,
      dialogFormVisible1:false,
      dialogFormVisible2:false,
        url:require('../assets/logo.png'),
        visible: false,
         tableData1:[{
          rank: '',
          name: '',
          time:'',
          acp:'',
        }],
        tableData2:[{
          rank: '',
          name: '',
          time:'',
          acp:'',
        }],
        upform1:{
          id:'',
          type:'',
          content:'',
        },
        upform2:{
        type:{id:'1'},
        task:{id:''},
        content:'',
        },
        pos:{"pos":"0"},
        result:'',
        tid:{id:''},
      }
    },
    //初始化任务列表
    created: function () {
    console.log(sendJson);
       var token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = token;
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    var sendJson =this.pos;
      var self=this;
        axios.post('http://49.234.86.39:8081/qujin/client/user/findSenderTask',sendJson)
           .then(response => {
             if(response.data != null) {
               console.log(response.data)
             if(response.data.senderUnfinishTask.publishTask != null)
              self.tableData1 = JSON.parse(JSON.stringify(response.data.senderUnfinishTask.publishTask));
            if(response.data.senderFinishTask.publishTask !=null)
              self.tableData2 = JSON.parse(JSON.stringify(response.data.senderFinishTask.publishTask));
           }
            });
        
    },
    methods:{
    menu(){
    this.$router.push('userindex');
    },
    release(){
    this.$router.push('/userindex/release');
    },
    setTag1(row){
    dialogFormVisible1 = true;
    this.upform1.id=row.id;
    },
    setTag2(row){
    dialogVisible = true
    this.tid.id=row.id;
    },
    
    //确认完成任务
    handleCom(){
    var sendJson = this.tid;
      var self=this;
        axios.post('http://49.234.86.39:8081/qujin/client/task/sender/accomplish',sendJson)
           .then(response => {
              self.result=JSON.parse(JSON.stringify(response.data));
              if(self.result=="success")
              {
              this.$notify({
          title: '成功',
          message: '确认任务成功',
          type: 'success'
        });
              }else{
              this.$notify({
          title: '失败',
          message: '确认任务失败',
          type: 'success'
        });
              }
            });
    	this.dialogVisible = false;
    },
    //请求取消任务
    handleCancel(){
        var sendJson =this.upform1;
      var self=this;
        axios.post('http://49.234.86.39:8081/qujin/client/task/sender/cancle',sendJson)
           .then(response => {
              self.result=JSON.parse(JSON.stringify(response.data));
              if(self.result=="success")
              {
              this.$notify({
          title: '成功',
          message: '取消请求提交成功',
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
    setTag3(row){
    this.upform2.task.id=row.id;
    dialogFormVisible2 = true;
    },
    //任务反馈
    handleBack(){
    var sendJson = this.upform2;
      var self=this;
        axios.post('http://49.234.86.39:8081/qujin/client/feedback/add',sendJson,{headers:{'Content-Type':'application/json'}})
           .then(response => {
              self.result=JSON.parse(JSON.stringify(response.data));
              if(self.result=="success")
              {
              this.$notify({
          title: '成功',
          message: '反馈成功',
          type: 'success'
        });
              }else{
              this.$notify({
          title: '失败',
          message: '反馈失败',
          type: 'success'
        });
              }
            });
    	this.dialogFormVisible2 = false;
    },
    }
    
    
}
</script>