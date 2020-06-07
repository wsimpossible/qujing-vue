<template>
  <el-container style="border:2px solid #C0C0C0;border-radius:10px;height: 600px; width: 1200px; margin: auto">
    <!-- 页面顶部 -->
    <el-header class="logo">
<el-image
      style="width: 55px; height: 55px;margin:5px;float:left"
      :src="url"
      :fit="contain"></el-image>
<div style="float:left">提现
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
       <el-form :model="form"  label-width="200px" width="400px">
  <el-form-item
    label="输入提现金额"
    
    :rules="[
      { required: true, message: '提现金额不能为空'},
      { type: 'number', message: '提现金额必须为数字值'}
    ]"
  >
    <el-input  v-model.number="form.amount" autocomplete="off" width="200px"></el-input>
  </el-form-item>
  <el-form-item
    label="输入支付宝账户（手机号）"
    
    :rules="[
      { required: true, message: '账户不能为空'},
      { type: 'number', message: '手机号必须为数字值'}
    ]"
  >
    <el-input  v-model.number="form.aliAccount" autocomplete="off" width="200px"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm">提交</el-button>
    <el-button @click="resetForm">重置</el-button>
  </el-form-item>
</el-form>
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
.mainbt{
	width: 300px;
	height: 150px;
	margin:40px
}
</style>

<script>
export default {
  name: 'UserIndex',
  data() {
      return {
        url:require('@/assets/logo.png'),
        form:{
          amount:'',
          aliAccount:'',
        
        }
      }
    },
    methods:{
    menu(){
    this.$router.push('/userindex');
    },
    submitForm(){
      var sendJson=this.form
      axios.put('/pay/withdraw',sendJson)
           .then(response => {
             if(response.status=='200'){
               this.$notify({
          title: '成功',
          message: '提现请求成功',
          type: 'success'
        });

             }else{
               this.$notify({
          title: '失败',
          message: '提现请求失败',
          
        });

             }
            });


    },
    
    }
    
    
}
</script>