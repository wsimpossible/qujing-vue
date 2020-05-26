<template>
  <el-container style="border:2px solid #C0C0C0;border-radius:10px;height: 600px; width: 1200px; margin: auto">
    <el-header class="logo">
<el-image
      style="width: 55px; height: 55px;margin:5px;float:left"
      :src="url"
      :fit="contain"></el-image>
<div style="float:left">用户管理
</div>
    </el-header>

    <el-container >
    <el-aside width="200px"
              style="background-color: rgb(238, 241, 246)">
      <el-menu router='true'>
        <!-- 开启菜单中的router=true之后，点击菜单会把index作为路由跳转路径 -->
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
    <el-main style="position:relative">
    	<el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      label="UID"
      width="140">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.userIDNumber }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="姓名"
      width="100">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.userName }}</span>
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
      label="状态"
      width="100">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.state }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleChange(scope.row)">积分调整</el-button>
        <el-dialog title="积分调整" :visible.sync="dialogFormVisible">
  <el-form :model="upform">
    <el-form-item label="用户积分调整为" :label-width="formLabelWidth">
      <el-input v-model="upform.score" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="handleEdit()">确 定</el-button>
  </div>
</el-dialog>

  <el-button
	  slot="reference"
          size="mini"
          @click="handleReset(scope.$index, scope.row)">重置密码</el-button>

  <el-button
	  slot="reference"
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">注销账号</el-button>

          
  <el-button
	  slot="reference"
          size="mini"
          type="danger"
          @click="handleForbide(scope.$index, scope.row)">封禁账号</el-button>

  <el-button
	  slot="reference"
          size="mini"
          type="danger"
          @click="handleActive(scope.$index, scope.row)">解封账号</el-button>

      </template>
    </el-table-column>
    
  </el-table>

  <div class="block" style="position: absolute;bottom:10px">
    <span class="demonstration"></span>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage1"
      :page-size="8"
      layout="total, prev, pager, next"
      :total="1">
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
</style>

<script>
import axios from 'axios'  
  
export default {
    name: 'UserManage',
    data() {
      return {
      visible1: false,
      visible2: false,
      visible3: false,
      visible4: false,
      visible5: false,
      currentPage: 1,
      url:require('../assets/logo.png'),
        tableData:'',
        dialogFormVisible: false,
        upform: {
          score:'',
          id:''
        },
        formLabelWidth: '120px'
      }
    },
    //初始化表格
    created: function () {
       	axios.get('http://localhost:8080/qujing/admin/usermanage/list.do')
           .then(response => {
              this.tableData = response.data
            })
    },
    methods: {
    //修改用户积分
    handleChange(row)
    {
    	this.upform.id=row.userIDNumber;
    	this.dialogFormVisible = true;
    },
      handleEdit(index, row) {
      var self=this;
 
      	axios.get('http://localhost:8080/qujing/admin/usermanage/changepoints.do',{params: {IDNumber:self.upform.id,points:self.upform.score}})
           .then(response => {
   
            });
        this.$message({
          showClose: true,
          message: '修改成功'
        });
 		this.dialogFormVisible = false;
      },
      //重置用户密码
      handleReset(index, row) {

      	axios.get('http://localhost:8080/qujing/admin/usermanage/resetpassword.do',{params: {id:row.userIDNumber}})
           .then(response => {
 
            });
        this.$message({
          showClose: true,
          message: '重置成功'
        });

      },
      //注销用户
      handleDelete(index, row) {

      axios.get('http://localhost:8080/qujing/admin/usermanage/deleteaccount.do',{params: {id:row.userIDNumber}})
           .then(response => {
  
            });
        this.$message({
          showClose: true,
          message: '注销成功'
        });
 
      },
      //激活用户
      handleActive(index, row) {

      axios.get('http://localhost:8080/qujing/admin/usermanage/wakeaccount.do',{params: {id:row.userIDNumber}})
           .then(response => {
 
            });
        this.$message({
          showClose: true,
          message: '激活成功'
        });


      },
      //封禁用户
      handleForbide(index, row) {

      axios.get('http://localhost:8080/qujing/admin/usermanage/stopaccount.do',{params: {id:row.userIDNumber}})
           .then(response => {
       
            });
        this.$message({
          showClose: true,
          message: '封禁成功'
        });


      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    }
  }
</script>