<template>
  <div class="main" style="border:2px solid #C0C0C0;border-radius:10px;height: 600px; width: 1200px; margin: auto">
    <div style="width: 500px; margin: auto">
    <h3>取经系统注册</h3>
    
    <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="邮箱：">
    <el-input  v-model="form.email"></el-input>
  </el-form-item>
  <el-form-item label="学号：">
    <el-input  v-model="form.studentId"></el-input>
  </el-form-item>
  <el-form-item label="用户名：">
    <el-input  v-model="form.username"></el-input>
  </el-form-item>
  <el-form-item label="密码：">
    <el-input v-model="form.password"></el-input>
  </el-form-item>
  <el-form-item label="确认密码：">
    <el-input  v-model="form.repasswd"></el-input>
  </el-form-item>
  <el-form-item>
  <el-button type="primary" @click="onSubmit">  注册 </el-button>
  </el-form-item>
</el-form>
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
  name: 'Login',
  data() {
      return {
        form: {
          email:'',
          studentId:'',
          username: '',
          password: '',
          repasswd:''
          
        },
        session:''
      }
    },
    methods: {
    //处理注册
      onSubmit() {
  var sendJson = this.form;
  var self=this;
  axios.post('http://49.234.86.39:8081/qujin/client/user/register',sendJson,{headers:{'Content-Type':'application/json'}})
    .then(response => {
    self.session= response.data;
    console.log(self.session)
    })
    .catch((error) => {
      console.log(error)
    });
    console.log('submit!');
    if (self.session=="success") {
  this.$message({
      showClose: true,
      message: '注册成功'
    });
    this.$router.push('Login');
   this.$router.push('/');
}  else { 
    this.$message({
      showClose: true,
      message: '注册失败'
    });
  }
  }
    },
}
</script>