<template>
  <el-container style="border:2px solid #C0C0C0;border-radius:10px;height: 600px; width: 1200px; margin: auto">
    <!-- 页面顶部 -->
    <el-header class="logo">
<el-image
      style="width: 55px; height: 55px;margin:5px;float:left"
      :src="url"
      :fit="contain"></el-image>
<div style="float:left">修改密码
</div>
<homebtn></homebtn>
    </el-header>
<el-container style="height: 500px; width: 1200px; margin: auto">
      <el-aside width="200px"
              style="background-color:rgb(238, 241, 246)">
      <br /><br />
      <el-button  @click="menu()"> 返回 </el-button>
    </el-aside>
    
      <el-main>
       <div style="width: 500px; margin: auto">
  
    
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
    <el-form-item label="旧密码：" prop="oldPwd">
    <el-input  v-model="form.oldPwd"></el-input>
    </el-form-item>
  
  
  <el-form-item label="新密码：" prop="newPwd">
    <el-input v-model="form.newPwd" show-password></el-input>
  </el-form-item>
  <el-form-item label="确认新密码：" prop="repasswd" >
    <el-input  v-model="form.repasswd" :rules="{validator: rule_repasswd,trigger: 'blur'}" show-password></el-input>
  </el-form-item>
  <el-form-item>
  <el-button type="primary" @click="onSubmit">  确定 </el-button>
  </el-form-item>
</el-form>
    </div>
      </el-main>
    </el-container>
  </el-container>
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
  name: 'updatepwd',
  data() {
     let rule_repasswd=(rule,value,callback)=> {
                console.log(value);
                // 密码不能为空
                if (!value) {
                    return callback(new Error('请输入密码'));
                };
                if(value!=this.newPwd){
                    return callback(new Error('两次密码不同！'));
                };
                callback();
            };
      return {
        form: {
          oldPwd:'',
          newPwd: '',
          repasswd:''
          
        },
        url:require('@/assets/logo.png'),
        examphone:{phone:''},
        disabled: false,
        time: 0,
        examphone:{phone:''},
        session:'',
        rules: {
          oldPwd: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            {  max: 30, message: '长度小于30个字符', trigger: 'blur' }
          ],
          
          newPwd: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            {  max: 30, message: '长度小于30个字符', trigger: 'blur' }
          ],
            repasswd: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            {  validator:rule_repasswd,trigger:'blur' }
          ],
          
        }
        
        
      }
    },
    methods: {
    
    
    //处理修改密码
      onSubmit() {
  var sendJson = this.form;
  var self=this;
 
  this.$http.put('/user/updatePwd',sendJson)
  .then(res=>{
  if (res.status=="200") {
  this.$message({
      showClose: true,
      message: '密码修改成功',
      type: 'success'
    });


}  else { 
    this.$message({
      showClose: true,
      message: '密码修改失败'
    });
  }
  })
  .catch(error=>{});

  

  },
  menu(){
    this.$router.push('/userindex');
    }
    },
}
</script>