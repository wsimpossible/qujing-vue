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
    </el-header>
<el-container style="height: 500px; width: 1200px; margin: auto">
      <el-aside width="200px"
              style="background-color:rgb(238, 241, 246)">
      <br /><br />
      <el-button  @click="menu()"> 返回 </el-button>
    </el-aside>
    
      <el-main>
       <div>
       <el-form ref="form" :model="form" rules="rules" label-width="120px">
  <el-form-item label="任务名称" >
    <el-input v-model="form.name" autocomplete="off" placeholder="请输入简单描述（取货地址与目的地）"></el-input>
  </el-form-item>
  <el-form-item label="任务描述">
    <el-input type="textarea" v-model="form.content" autocomplete="off" placeholder="请输入任务描述（50汉字以内，标注姓名、取货码等必须信息）"></el-input>
  </el-form-item>
  <el-form-item label="支付积分">
    <el-col :span="5">
      <el-input v-model="form.points" autocomplete="off" placeholder="请输入支付积分"></el-input>
    </el-col>
    </el-form-item>
  <el-form-item label="截止时间">
    <el-col :span="5">
      <el-input v-model="form.ttl" autocomplete="off" placeholder="请输入截止时间（分钟）"></el-input>
    </el-col>
  </el-form-item>
  <el-form-item label="发布为加急">
    <el-switch v-model="form.quick" ></el-switch>
  </el-form-item>
  <el-form-item label="服务类型">
    <el-select v-model="form.ttid" autocomplete="off" placeholder="请选择服务类型" >
      <el-option label="快递代取" value="1"></el-option>
      <el-option label="文件代送" value="2"></el-option>
      <el-option label="文件代取" value="3"></el-option>
      <el-option label="食堂代买" value="4"></el-option>
      <el-option label="物品代购" value="5"></el-option>
      <el-option label="其他" value="6"></el-option>
    </el-select>
  </el-form-item>
 
  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即发布</el-button>
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
      { type: 'number', message: '必须为数字'}
    ],
          ttl:[
      { required: true, message: '截止时间不能为空'},
      { type: 'number', message: '截止时间必须为数字值'}
    ],
          ttid : [
            { required: true, message: '请选择任务类型', trigger: 'change' }
          ]
        }
      }
    },
    methods:{
    menu(){
    this.$router.push('/userindex');
    },
    //处理发布任务
    onSubmit() {
    if(this.form.quick=="true")
    this.form.expedited='1';
    else{
      this.form.expedited='0';
    }
    var sendJson =this.form;
      var self=this;
      console.log(sendJson);
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
    
        console.log('submit!');
        
      }
    }
    
    
}
</script>