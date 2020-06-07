<template>
  <div class="main" style="border:2px solid #C0C0C0;border-radius:10px;height: 600px; width: 1200px; margin: auto">
    <div style="width: 500px; margin: auto">
    <h3>{{loginstyle}}登录</h3>

    <el-form ref="form" v-show="show" :model="form" :rules="rules" label-width="80px">
  <el-form-item label="用户名：" prop="username">
    <el-input  v-model="form.username" ></el-input>
    
  </el-form-item>
  <el-form-item label="密码：" prop="password">
    <el-input v-model="form.password"  show-password></el-input>
    
  </el-form-item>
  <el-form-item>
  <el-button type="primary" @click="onReg" style="float:left;margin-left:50px">  注册 </el-button>
    <el-button type="primary" @click="onSubmit('form')" style="float:left;">  登录  </el-button>
    <el-button  type="text"  @click="forget" style="float:left;">忘记密码？</el-button>
  </el-form-item>
  <el-form-item>
    <el-button  type="text"  @click="changestyle">切换登录方式</el-button>
  </el-form-item>
  
</el-form>
<el-form ref="form" v-show="!show" :model="form" :rules="rules" label-width="80px">
  <el-form-item label="手机号：" prop="username">
    <el-input  v-model="form.username" ></el-input>
  </el-form-item>
  <el-form-item label="验证码：" prop="password">
    <el-input v-model="form.password" style="width:300px;float:left;" show-password></el-input>
    <el-button type="primary" size="small" style="float:left;margin-left:20px" @click="getexam" :disabled="disabled" v-if="disabled==false">发送验证码
    </el-button>
    <el-button type="primary" size="small" style="float:left;margin-left:20px" @click="getexam" :disabled="disabled" v-if="disabled==true">{{btntxt}}
    </el-button>
    
  </el-form-item>
  <el-form-item>
  <el-button type="primary" @click="onReg" style="float:left;margin-left:50px">  注册 </el-button>
    <el-button type="primary" @click="onSubmit('form')" style="float:left;">  登录  </el-button>
    <el-button  type="text"  @click="forget" style="float:left;">忘记密码？</el-button>
  </el-form-item>
  <el-form-item>
    <el-button  type="text"  @click="changestyle">切换登录方式</el-button>
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
import QS from 'qs'
export default {
  name: 'Login',
  data() {
      return {
        show:'true',
        form: {
          username: '',
          password: '',
          
        },
        phone:{
          phone:'',
          check:''

        },
        disabled: false,
        time: 0,
        btntxt: "重新发送",
        loginnum:0,
        loginstyle:'学号',
        session:'',
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            {  max: 30, message: '长度小于30个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { max: 30, message: '长度小于30个字符', trigger: 'blur' }
          ]
        }
        
        
      }
    },
    methods: {
      //60S倒计时
            timer() {
                if (this.time > 0) {
                    this.time--;
                    this.btntxt = this.time + "s后重新获取";
                    setTimeout(this.timer, 1000);
                } else {
                    this.time = 0;
                    this.btntxt = "获取验证码";
                    this.disabled = false;
                }
            },
      getexam(){
        var self=this;
        axios.post('/authenticated/sendCaptcha/login',{phone:self.form.username})
        .then(res=>{
          if (res.status=="200") {
  this.$message({
      showClose: true,
      message: '登录码已发送',
      type: 'success'
    });
    self.time = 60;
    self.disabled = true;
    self.timer();

   
}  else { 
    this.$message({
      showClose: true,
      message: '发送失败'
    });
  }
        })

      },
    changestyle(){
      this.show=!(this.show);
      if(this.loginnum==0){
        this.loginstyle='手机号';
        this.loginnum=1;
      }
      else{
        this.loginstyle='学号';
        this.loginnum=0;
      }


    },
    //处理登录
      onSubmit(form) {
     
      if(this.loginnum==0)
      this.login('/authenticated/loginByStudentId',form);
      else
      {
        this.phone.phone=this.form.username;
        this.phone.check=this.form.password;
        this.login('/authenticated/loginByPhone',form);
      }
      },

      login(url,form){
        if(this.loginnum==0)
      var sendJson =this.form;
      else
     var sendJson =this.phone;
      var self=this;
      this.$refs[form].validate((valid) => {
          if (valid) {
            this.$http.post(url,sendJson)
      .then(response=>{
      console.log(response.status);
      if (response.status=='200') {
      console.log('submit!');
      var token = localStorage.getItem('token');
       axios.defaults.headers.common['Authorization'] = token;
       self.$router.push('userindex');
    	
		} else { 
    		self.$message({
          showClose: true,
          message: '用户名或密码错误'
        });
		}
      })
      .catch(error=>{
      
      });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      onReg() {
      this.$router.push('register');
      },
      forget() {
      this.$router.push('forget');
      }
    }
}
</script>