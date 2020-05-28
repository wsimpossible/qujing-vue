<template>
  <div class="main" style="border:2px solid #C0C0C0;border-radius:10px;height: 600px; width: 1200px; margin: auto">
    <div style="width: 500px; margin: auto">
    <h3>取经系统注册</h3>
    
    <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="手机号：">
    <el-input  v-model="form.phone"></el-input>
    <el-button type="primary" @click="getExam">  获取验证码  </el-button>
  </el-form-item>
  <el-form-item label="验证码：">
    <el-input  v-model="form.examId"></el-input>
  </el-form-item>
  <el-form-item label="学号：">
    <el-input  v-model="form.studentId"></el-input>
  </el-form-item>
  <el-form-item label="用户名：">
    <el-input  v-model="form.username"></el-input>
  </el-form-item>
  <el-form-item label="密码：">
    <el-input v-model="form.password" show-password></el-input>
  </el-form-item>
  <el-form-item label="确认密码："  >
    <el-input  v-model="form.repasswd" :rules="{validator: rule_repasswd,trigger: 'blur'}" show-password></el-input>
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
          phone:'',
          examId:'',
          studentId:'',
          username: '',
          password: '',
          repasswd:''
          
        },
        session:'',
        rules: {
          phone: [
            { required: true, message: '请输入手机号码', trigger: 'blur' },
            {  max: 30, message: '长度小于22个字符', trigger: 'blur' }
          ],
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            {  max: 30, message: '长度小于30个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            {  max: 30, message: '长度小于30个字符', trigger: 'blur' }
          ],
          
          studentId: [
            { required: true, message: '请输入学号', trigger: 'blur' },
            { max: 30, message: '长度小于20个字符', trigger: 'blur' }
          ],
          
          examId: [
            { required: true, message: '验证码', trigger: 'blur' },
            { max: 10, message: '长度小于10个字符', trigger: 'blur' }
          ]
        }
        
       
      }
    },
    methods: {
    rule_repasswd(rule,value,callback) {
                console.log(value);
                // 密码不能为空
                if (!value) {
                    return callback(new Error('请输入密码'));
                };
                if(value!=this.password){
                    return callback(new Error('两次密码不同！'));
                };
                callback();
            },
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