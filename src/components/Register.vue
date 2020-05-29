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
    <el-input  v-model="form.check"></el-input>
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
          check:'',
          studentId:'',
          username: '',
          password: '',
          repasswd:''
          
        },
        examphone:{phone:''},
        
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
          
          check: [
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
            getExam(){
            var self=this;
            this.examphone.phone=this.form.phone
            this.$http.post('/user/checkPhone',self.examphone).then(res=>{
            if(res.data.code=="200")
            self.$message({
      showClose: true,
      message: '手机号已被注册'
    });
    else{
    	self.$http.post('/authenticated/sendCaptcha',self.examphone).then(res=>{
    	self.$message({
      showClose: true,
      message: '验证码已发送，请注意查收'
    });
    	}).catch(error=>{});
    }
            }).catch(error=>{});
            
            
            },
    //处理注册
      onSubmit() {
  var sendJson = this.form;
  var self=this;
  this.$http.get('/authenticated/verifyCaptcha',sendJson)
  .then(res=>{
  if(res.data.code =='200'){
  	 this.$http.post('/authenticated/register',sendJson)
  .then(response=>{
  self.session= response.data;
  if (self.session.code=="200") {
  this.$message({
      showClose: true,
      message: '注册请求成功'
    });
    this.$router.push('Login');
   this.$router.push('/');
}  else { 
    this.$message({
      showClose: true,
      message: '注册请求失败'
    });
  }
  }).
  catch(error=>{});
  this.$http.put('/authenticated/active',sendJson)
  .then(response=>{
  if (response.data.code=='200') {
  this.$message({
      showClose: true,
      message: '用户激活成功'
    });
    this.$router.push('Login');
   this.$router.push('/');
}  else { 
    this.$message({
      showClose: true,
      message: '用户激活失败'
    });
  }
  })
  .catch(error=>{
  
  });
  }else{
  this.$message({
      showClose: true,
      message: '验证码错误'
    });
  }
  })
  .catch(error=>{});
  
 
    console.log('submit!');
    
  }
    },
}
</script>