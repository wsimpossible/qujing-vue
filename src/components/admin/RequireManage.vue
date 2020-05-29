<template>
  <el-container style="border:2px solid #C0C0C0;border-radius:10px;height: 600px; width: 1200px; margin: auto">
    <el-header class="logo">
<el-image
      style="width: 55px; height: 55px;margin:5px;float:left"
      :src="url"
      :fit="contain"></el-image>
<div style="float:left">请求审核
</div>
    </el-header>

<el-container>
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
      </el-menu>
    </el-aside>
    
      <el-main style="position:relative">
    	<el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      label="任务名称"
      width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.taskName }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="送货方"
      width="120">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.sender }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="收货方"
      width="120">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.receiver }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="类型"
      width="100">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.type }}</span>
      </template>
    </el-table-column>
    
    <el-table-column
      label="描述"
      width="250">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.content }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleDetail(scope.$index, scope.row)">详细</el-button>
     
          
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
  name: 'RequireManage',
  data() {
      return {
      currentPage: 1,
      url:require('@/assets/logo.png'),
        tableData:''
      }
    },
    //初始化表格
    created: function () {
        axios.get('http://localhost:8080/qujing/admin/canclemanage/list.do')
           .then(response => {
              this.tableData = response.data
            })
        
    },
    methods: {
      handleDetail(index, row) {
      this.$router.push({  
            path: '/admin/requiredetail', 
            query:  {id:row.id} 
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