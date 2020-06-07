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
<homebtn></homebtn>
    </el-header>
<el-container style="height: 500px; width: 1200px; margin: auto">
      <el-aside width="200px"
              style="background-color:rgb(238, 241, 246)">
      <br /><br />
      <el-button type="primary"  @click="release()"> 发布新任务 </el-button>
      <br /><br />
      <el-button  @click="menu()"> 返回</el-button>
    </el-aside>
      <el-main style="height: 500px; width: 1000px; margin:0">
       <div style="height: 200px; width: 950px; margin:auto">
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
      label="任务状态"
      width="100">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ taskstatus[scope.row.state]  }}</span>
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
      label="接单人"
      width="150">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.receiverid }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="300">
      <template slot-scope="scope">
      <el-button type="text" @click="setTag1(scope.row)" v-if="scope.row.state=='1'||scope.row.state=='2'" >取消任务</el-button>

<el-dialog title="取消任务" :visible.sync="dialogFormVisible1">
  <el-form :model="upform1" ref="upform1" :rules="rules">
  <el-form-item label="理由类型" prop="type">
    <el-select v-model="upform1.type" placeholder="请选择理由类型" >
      <el-option label="我已完成" value="1"></el-option>
      <el-option label="太久无人接单" value="2"></el-option>
      <el-option label="协商后取消" value="3"></el-option>
      <el-option label="临时有事" value="4"></el-option>
      <el-option label="其他" value="5"></el-option>
    </el-select>
  </el-form-item>
    <el-form-item label="理由" :label-width="formLabelWidth" prop="content">
      <el-input type="textarea" v-model="upform1.content" autocomplete="off"></el-input>
    </el-form-item>

  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible1 = false">取 消</el-button>
    <el-button type="primary" @click="handleCancel('upform1')">确 定</el-button>
  </div>
</el-dialog>
        <el-button type="primary" @click="setTag2(scope.row)" v-if="scope.row.state=='5'||scope.row.state=='2'" >已收到</el-button>

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

<el-button type="text" size="mini" style="margin:2px 2px 2px 40px" @click="setTag3(scope.row)" v-if="scope.row.state!='1'"  >反馈</el-button>

<el-dialog title="任务反馈" :visible.sync="dialogFormVisible2">
  <el-form :model="upform2"  ref="upform2" :rules="rules2">
    <el-form-item label="理由" :label-width="formLabelWidth" prop="content">
      <el-input type="textarea" v-model="upform2.content" autocomplete="off"></el-input>
    </el-form-item>

  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible2 = false">取 消</el-button>
    <el-button type="primary" @click="handleBack('upform2')">确 定</el-button>
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
        url:require('@/assets/logo.png'),
        visible: false,
         tableData1:[],
        tableData2:'',
        upform1:{
          id:'',
          type:'',
          content:'',
        },
        upform2:{
        type:'',
        task:'',
        content:'',
        },
        pos:'1',
        result:'',
        tid:'',
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
        rules: {
          type: [
            { required: true, message: '请选择理由类型', trigger: 'change' }
          ],
          content: [
            { required: true, message: '请输入描述', trigger: 'blur' }
          ]
        },
        rules2: {
          
          content: [
            { required: true, message: '请输入反馈描述', trigger: 'blur' }
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
      var sendJson =this.pos;
    console.log(sendJson);
      var self=this;
        axios.get('/task/listPublish/'+sendJson)
           .then(response => {
             if(response.data != null) {
               console.log(response.data)
             if(response.data!= null)
              self.tableData2 = JSON.parse(JSON.stringify(response.data));
              self.devidetable();
           }
            });

      },
    devidetable(){
      var jr=[];
      for(var i in this.tableData2)
      {
        if(typeof(this.tableData2[i].receiver)!=undefined&&this.tableData2[i].receiver!=null)
        this.tableData2[i].task.receiverid=this.tableData2[i].receiver.username;
      }
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
    release(){
    this.$router.push('/userindex/release');
    },
    setTag1(row){
    this.dialogFormVisible1 = true;
    this.upform1.id=row.id;
    },
    setTag2(row){
    this.dialogVisible = true
    this.tid=row.id;
    },
    
    //确认完成任务
    handleCom(){
    var sendJson = this.tid;
      var self=this;
        axios.put('/task/sender/confirm/'+sendJson)
           .then(response => {
              
              if(response.status=="200")
              {
              this.$notify({
          title: '成功',
          message: '确认任务成功',
          type: 'success'
        });
        this.getdata();
              }else{
              this.$notify({
          title: '失败',
          message: '确认任务失败',
       
        });
              }
            });
    	this.dialogVisible = false;
    },
    //请求取消任务
    handleCancel(){
        var sendJson =this.upform1;
      var self=this;
      console.log(sendJson);
      
           axios.delete('/task/sender/cancel/'+sendJson.id,{data:sendJson})
           .then(response => {
              
              if(response.status=="200")
              {
              this.$notify({
          title: '成功',
          message: '取消请求提交成功',
          type: 'success'
        });
        this.getdata();
              }else{
              this.$notify({
          title: '失败',
          message: '取消请求失败',
      
        });
              }
            });
          

        
        
    	this.dialogFormVisible1 = false;
    },
    setTag3(row){
    this.upform2.task=row.id;

    this.dialogFormVisible2 = true;

    },
    //任务反馈
    handleBack(){
    var sendJson = this.upform2;
      var self=this;
      
            axios.post('/feedback/suitTask',sendJson)
           .then(response => {
              
              if(response.status=="200")
              {
              this.$notify({
          title: '成功',
          message: '反馈成功',
          type: 'success'
        });
        this.getdata();
              }else{
              this.$notify({
          title: '失败',
          message: '反馈失败',
        
        });
              }
            });
          
        
    	this.dialogFormVisible2 = false;
    },
    }
    
    
}
</script>