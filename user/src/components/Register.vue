<template>
  <div class="main" style="border:2px solid #C0C0C0;border-radius:10px;height: 600px; width: 1200px; margin: auto">
    <div style="width: 500px; margin: auto">
    <h3>取经系统注册</h3>
    
    <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="手机号：">
    <el-input  v-model="form.phone" ></el-input>
    
  </el-form-item>
  <el-form-item label="验证码：">
    <el-input  v-model="form.check" style="width:250px;float:left"></el-input>
    <el-button type="primary" style="float:left;margin-left:20px" @click="getExam" :disabled="disabled" v-if="disabled==false">发送验证码
    </el-button>
    <el-button type="primary" style="float:left;margin-left:20px" @click="getExam" :disabled="disabled" v-if="disabled==true">{{btntxt}}
    </el-button>
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
  <el-button type="primary" @click="login">取消 </el-button>
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
  name: 'register',
  data() {
  let  rule_repasswd=(rule,value,callback)=> {
                console.log(value);
                // 密码不能为空
                if (!value) {
                    return callback(new Error('请输入密码'));
                };
                if(value!=this.password){
                    return callback(new Error('两次密码不同！'));
                };
                callback();
            };
      return {
        form: {
          phone:'',
          check:'',
          studentId:'',
          username: '',
          password: '',
          repasswd:''
          
        },
        upform:{
          check:'',
          phone:''

        },
        examphone:{phone:''},
        disabled: false,
        time: 0,
        btntxt: "重新发送",
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
          repasswd:[
            {validator:rule_repasswd,trigger:'blur'}

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
    getExam(){
    var self=this;
    this.examphone.phone=this.form.phone;
    console.log(this.examphone); 
    this.$http.get('/authenticated/checkPhone',{params:self.examphone}).then(res=>{
    if(res.status=="200")
    {
      self.$http.post('/authenticated/sendCaptcha/register',self.examphone).then(res=>{
    	self.$message({
      showClose: true,
      message: '验证码已发送，请注意查收',
      type: 'success'
    });
    self.time = 60;
    self.disabled = true;
    self.timer();
    	}).catch(error=>{});
            }
            
    else{
      self.$message({
      showClose: true,
      message: '手机号已被注册'
    });
      
    }
            }).catch(error=>{});
            
            
            },
            login(){
              this.$router.push('/');
            },
    //处理注册
      onSubmit() {
  var sendJson = this.form;
  var self=this;
  this.$http.get('/authenticated/verifyCaptcha/register',{params:{phone:self.form.phone,check:self.form.check}})
  .then(res=>{
  if(res.status =='200'){
  	 this.$http.post('/authenticated/register',sendJson)
  .then(response=>{
 
  if (response.status=="200") {
  this.$message({
      showClose: true,
      message: '注册请求成功',
      type: 'success'
    });
    self.upform.check=self.form.check;
    self.upform.phone=self.form.phone;
   this.$http.put('/authenticated/active',self.upform)
  .then(response=>{
  if (response.status=='200') {
  this.$message({
      showClose: true,
      message: '用户激活成功',
      type: 'success'
    });
  
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
 
}  else { 
    this.$message({
      showClose: true,
      message: '注册请求失败'
    });
  }
  }).
  catch(error=>{});
  
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