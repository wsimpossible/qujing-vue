<template>
  <div class="main" style="border:2px solid #C0C0C0;border-radius:10px;height: 600px; width: 1200px; margin: auto">
    <div style="width: 500px; margin: auto">
    <h3>取经管理员登录</h3>
    <el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="用户名：">
    <el-input  v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="密码：">
    <el-input v-model="form.passwd" show-password></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">  登录  </el-button>
    <el-button  type="text" style="">忘记密码？</el-button>
  </el-form-item>
</el-form>

    <router-link to="/admin">进入后台管理首页（仅供测试使用，测试结束删除）</router-link>
    </div>
  </div>
</template>

<style>
.main{
	background:-webkit-linear-gradient(
	top,#D0D0D0,#E8E8E8,lightblue
	);
}
</style>

<script>
import axios from 'axios'
export default {
  name: 'AdminLogin',
  data() {
      return {
        form: {
          name: '',
          passwd: '',
          
        },
        session:''
      }
    },
    methods: {
    
      onSubmit() {
      var sendJson = this.form;
      axios.defaults.crossDomain = true;
      axios.post('http://49.234.86.39:8081/qujin/client/jsonLogin',sendJson)
        .then((response) => {
        this.session = response.data
          if(this.session=="success")
          {
          const authorization = response.data.Authorization;
          axios.defaults.headers.common['Authorization'] = authorization;
          this.$router.push('admin');
          }
          else{
          this.$message({
          showClose: true,
          message: '用户名或密码错误'
        });
          }
        })
        .catch((error) => {
          console.log(error)
        })
        console.log('submit!');
        
      }
    }
}
</script>