<template>
  <div class="main" style="border:2px solid #C0C0C0;border-radius:10px;height: 600px; width: 1200px; margin: auto">
    <div style="width: 500px; margin: auto">
    <h3>取经系统登录</h3>
    <el-form ref="form" :model="form" rules="rules" label-width="80px">
  <el-form-item label="用户名：">
    <el-input  v-model="form.username"></el-input>
  </el-form-item>
  <el-form-item label="密码：">
    <el-input v-model="form.password" show-password></el-input>
  </el-form-item>
  <el-form-item>
  <el-button type="primary" @click="onReg">  注册 </el-button>
    <el-button type="primary" @click="onSubmit">  登录  </el-button>
    <el-button  type="text" >忘记密码？</el-button>
  </el-form-item>
</el-form>

    <router-link to="/adminlogin">我是管理员</router-link>
    <router-link to="/userindex">进入用户主页（供测试使用）</router-link>
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
import QS from 'qs'
export default {
  name: 'Login',
  data() {
      return {
        form: {
          username: '',
          password: '',
          
        },
        session:'',
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            {  max: 30, message: '长度小于30个字符', trigger: 'blur' }
          ],
          taskDetail: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { max: 30, message: '长度小于30个字符', trigger: 'blur' }
          ]
        }
        
        
      }
    },
    methods: {
    //处理登录
      onSubmit() {
      var sendJson =this.form;
      var self=this;
      axios.post('http://49.234.86.39:8081/qujin/client/jsonLogin',sendJson,{headers:{'Content-Type':'application/json'}})
        .then(res => {
          const authorization = res.data.Authorization;
          console.log(authorization)
        if (authorization != null && authorization != undefined) {
          localStorage.setItem('token',authorization);
          this.msg = authorization;
       
    	this.$router.push('userindex');
		} else { 
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
      },
      onReg() {
      this.$router.push('register');
      }
    }
}
</script>