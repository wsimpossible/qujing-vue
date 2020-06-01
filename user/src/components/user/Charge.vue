<template>
  <el-container style="border:2px solid #C0C0C0;border-radius:10px;height: 600px; width: 1200px; margin: auto">
    <!-- 页面顶部 -->
    <el-header class="logo">
<el-image
      style="width: 55px; height: 55px;margin:5px;float:left"
      :src="url"
      :fit="contain"></el-image>
<div style="float:left">充值
</div>
    </el-header>
<el-container style="height: 500px; width: 1200px; margin: auto">
      <el-aside width="200px"
              style="background-color:rgb(238, 241, 246)">

      <br /><br />
      <el-button  @click="menu()"> 返回 </el-button>
    </el-aside>
    
      <el-main>
       <div style="margin: auto">
         <el-form ref="form" :model="form"  label-width="120px">
         <el-form-item label="充值金额">
    <el-col :span="8">
      <el-input v-model="form.totalAmount" placeholder="请输入充值金额（1元=100积分）" ></el-input>
    </el-col>
    </el-form-item>
    <el-form-item>
    <el-button type="primary" @click="submitForm">提交</el-button>
    <el-button @click="resetForm">重置</el-button>
  </el-form-item>
         </el-form>
         
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
.mainbt{
	width: 300px;
	height: 150px;
	margin:40px
}
</style>

<script>
export default {
  name: 'Charge',
  data() {
      return {
        url:require('@/assets/logo.png'),
        form:{totalAccount:''}
      }
    },
    methods:{
    menu(){
    this.$router.push('/userindex');
    },
    submitForm(){
      var sendJson=this.form
      axios.post('/pay/recharge',sendJson)
           .then(response => {
             console.log(response.data);
              document.querySelector('body').innerHTML =response.data;
              document.forms[0].submit();
            });


    },
    resetForm(){
      this.form.totalAmount='';

    }

    }
    
    
}
</script>