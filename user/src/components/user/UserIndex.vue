<template>
  <el-container style="border:2px solid #C0C0C0;border-radius:10px;height: 600px; width: 1200px; margin: auto">
    <!-- 页面顶部 -->
    <el-header class="logo">
<el-image
      style="width: 55px; height: 55px;margin:5px;float:left"
      :src="url"
      :fit="contain"></el-image>
<div style="float:left">个人中心
</div>
    </el-header>
<el-container style="height: 500px; width: 1200px; margin: auto">
      <el-aside width="200px"
              style="background-color:rgb(238, 241, 246)">
      <div style="margin: auto">
        <br /><br />
        <el-button type="primary"  @click="release()"> 发布任务 </el-button>
        <br /><br />
      <el-button type="primary"  @click="accept()"> 接受任务 </el-button>
       </div>
       <div style="margin: auto">
        <br /><br />
      <el-button type="primary"  @click="myrelease()"> 我发布的任务 </el-button>
        <br /><br />
      <el-button type="primary"  @click="myaccept()"> 我接受的任务 </el-button>
      </div>
      <br /><br />
      <el-button  @click="charge()"> 充值 </el-button>
      <br /><br />
      <el-button  @click="postal()"> 提现 </el-button>
      <br />
      <el-button  type="text" @click="crecord">消费记录 </el-button>
      <br />
      <el-button  type="text" @click="srecord">充值记录 </el-button>
      <br />
      <el-button  type="text" @click="listnews()">查看通知</el-button>
    </el-aside>
    
      <el-main>
       <el-card class="card">
         <div style="float:left;">
         <div class="col">
           <h5>用户名：</h5>
          </div>
          <div class="col">
            <h5>学号：</h5>
          </div>
          <div class="col">
            <h5>手机：</h5>
          </div>
          <div class="col">
            <h5>积分：</h5>
          </div>
          <div class="col">
            <h5>账号状态：</h5>
          </div>
          <div class="col">
            <el-button  type="text" @click="updatepwd()">修改密码 </el-button>
            
          </div>

       </div>
       <div style="float:left">
         <div class="col">
            <h5>{{user.username}}</h5>
          </div>
         <div class="col">
            <h5>{{user.studentId}}</h5>
          </div>
          <div class="col">
            <h5>{{user.phone}}</h5>
          </div>
          <div class="col">
            <h5>{{user.points}}</h5>
          </div>
          <div class="col">
            <h5>{{userstatus[user.state] }}</h5>
          </div>
          <br />
          <div class="col">
            
            <el-button  type="text" @click="quit()">退出登录 </el-button>
            
          </div>
        
          
       </div>
        
       </el-card>
      
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
	height: 140px;
	margin:40px
}
.col{
  width:100px;
  height:20px;
}
.card{
  height:400px;
  width:500px;
  margin:auto;
}
</style>

<script>
export default {
  name: 'UserIndex',
  data() {
      return {
        url:require('@/assets/logo.png'),
        user:'',
        userstatus:{
          '0':'未激活',
          '1':'已激活',
          '2':'冻结中',
        },
      }
    },
    created: function () {
      var token = localStorage.getItem('token');
       axios.defaults.headers.common['Authorization'] = token;
      var self=this;
        axios.get('/user/getUserInfo')
           .then(response => {
             console.log(response.data)
            this.user=response.data;
            });
        
    },
    methods:{
    charge(){
    this.$router.push('/userindex/charge');
    },
    
    postal(){
    this.$router.push('/userindex/postal');
    },
    release(){
    this.$router.push('/userindex/release');
    },
    accept(){
    this.$router.push('/userindex/accept');
    },
    myrelease(){
    this.$router.push('/userindex/myrelease');
    },
    myaccept(){
    this.$router.push('/userindex/myaccept');
    },
    listnews(){
    this.$router.push('/userindex/news');
    },
    crecord(){
    this.$router.push('/userindex/czrecord');
    },
    srecord(){
    this.$router.push('/userindex/sprecord');
    },
    updatepwd()
    {
      this.$router.push('/userindex/updatepwd');

    },
    quit(){
      axios.get('/authenticated/logout').then(response => {
             if(response.status=="200")
             {
               localStorage.setItem('token',null);
              localStorage.setItem('islogin',0);
              this.$router.push('/');
             }
            });
    }
    }
    
    
}
</script>