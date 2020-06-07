<template>
  <el-container style="border:2px solid #C0C0C0;border-radius:10px;height: 600px; width: 1200px; margin: auto">
    <!-- 页面顶部 -->
    <el-header class="logo">
<el-image
      style="width: 55px; height: 55px;margin:5px;float:left"
      :src="url"
      :fit="contain"></el-image>
<div style="float:left">发布任务
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
       <div>
       <el-form ref="form" :model="form" :rules="rules" label-width="120px">
  <el-form-item label="任务名称" prop="name">
    <el-input v-model="form.name" autocomplete="off" placeholder="请输入简单描述（取货地址与目的地）" style="width:500px;float:left"></el-input>
  </el-form-item>
  <el-form-item label="任务描述" prop="content">
    <el-input type="textarea" v-model="form.content" autocomplete="off" style="width:500px;float:left" placeholder="请输入任务描述（50汉字以内，标注姓名、取货码等必须信息）"></el-input>
  </el-form-item>
  <el-form-item label="支付积分" prop="points">
    <el-col :span="5">
      <el-input v-model.number="form.points" autocomplete="off" type="number" placeholder="请输入支付积分" ></el-input>
    </el-col>
    </el-form-item>
    <el-form-item label="剩余积分">
    <el-col :span="5">
      {{user.points}}
    </el-col>
    </el-form-item>
  <el-form-item label="截止时间" prop="ttl">
    <el-col :span="5">
      <el-input v-model.number="form.ttl" autocomplete="off" type="number" placeholder="请输入截止时间（分钟）"></el-input>
    </el-col>
  </el-form-item>
  <el-form-item label="发布为加急" >
    <el-switch v-model="form.quick" style="float:left" ></el-switch>
  </el-form-item>
  <el-form-item label="服务类型" prop="ttid">
    <el-select v-model="form.ttid" autocomplete="off" style="float:left" placeholder="请选择服务类型" >
      <el-option label="快递代取" value="1"></el-option>
      <el-option label="文件代送" value="2"></el-option>
      
      <el-option label="食堂代买" value="3"></el-option>
      <el-option label="物品代购" value="4"></el-option>
      <el-option label="其他" value="5"></el-option>
    </el-select>
  </el-form-item>
 
  <el-form-item>
    <el-button type="primary" @click="onSubmit('form')">立即发布</el-button>
    <el-button @click="menu()">取消</el-button>
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
import axios from 'axios'
export default {
  name: 'Release',
  data() {
  let validpoint=(rule,value,callback)=> {
                console.log(value);
                // 积分不能为负
                if (value<=0) {
                    return callback(new Error('积分不能为负数或0'));
                };
                
                callback();
            };
  let validtime =(rule,value,callback)=> {
                console.log(value);
                // 时间不能小于10分钟
                if (value<=10) {
                    return callback(new Error('时间不能小于十分钟'));
                };
                
                callback();
            };
      return {
        url:require('@/assets/logo.png'),
        form: {
          name: '',
          content: '',
          points:'',
          ttl:'',
          quick:'false',
          expedited:'',
          ttid :'',
        },
        user:'',
        result:'',
        rules: {
          name: [
            { required: true, message: '请输入任务名称', trigger: 'blur' },
            { min: 1, max: 30, message: '不能为空，长度小于30个字符', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '请输入任务描述', trigger: 'blur' },
            { min: 1, max: 100, message: '不能为空，长度小于100个字符', trigger: 'blur' }
          ],
          points:[
      { required: true, message: '不能为空'},
      { type: 'number', message: '必须为数字'},
      {validator:validpoint,trigger:'blur'}
    ],
          ttl:[
      { required: true, message: '截止时间不能为空'},
      { type: 'number', message: '截止时间必须为数字值'},
      {validator:validtime,trigger:'blur'}
    ],
          ttid : [
            { required: true, message: '请选择任务类型', trigger: 'change' }
          ]
        }
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
    
    menu(){
    this.$router.push('/userindex');
    },
    //处理发布任务
    onSubmit(form) {
    if(this.form.quick=="true")
    this.form.expedited='1';
    else{
      this.form.expedited='0';
    }
    var sendJson =this.form;
      var self=this;
      console.log(sendJson);
      this.$refs[form].validate((valid) => {
          if (valid) {
            this.$http.post('/task/post',sendJson)
        .then((response) => {
        self.result=response.data;
        if (response.status=="200") {
    	this.$notify({
          title: '成功',
          message: '任务发布成功',
          type: 'success'
        });
        this.$router.push('/userindex');
		} else  {
    	this.$notify({
          title: '失败',
          message: '任务发布失败'
        });
		}
        })
        .catch((error) => {
          console.log(error)
        })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      

      }
    }
    
    
}
</script>