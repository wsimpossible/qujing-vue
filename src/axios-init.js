import axios from 'axios'；
 
export default()=>{
   let loadingInstance; //创建Loading 的实例
   axios.defaults.baseURL = 'localhost:8081/qujin/client'; // 配置axios请求的地址
   axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
   axios.defaults.crossDomain = true;
   axios.defaults.withCredentials = true;  //设置cross跨域 并设置访问权限 允许跨域携带cookie信息
  
 
   //配置发送请求前的拦截器 可以设置token信息 
   axios.interceptors.request.use(config => {
	   var token = localStorage.getItem('token');
       axios.defaults.headers.common['Authorization'] = token;
           return config;
       }, error => {
           loadingInstance.close();
           return Promise.reject(error);
       });
    }
 
    // 配置响应拦截器 
    axios.interceptors.response.use(res => {
        loadingInstance.close();
        const authorization = res.data.Authorization;
        localStorage.setItem('token',authorization);
        //这里面写所需要的代码
        if(res.data.code =='401'){
        	
            //全局登陆过滤，当判读token失效或者没有登录时 返回登陆页面
        	this.$router.push('/');
            return false;
        };
        return Promise.resolve(res);
    }, error => {
        loadingInstance.close();
        return Promise.reject(error);
    }
        return Promise.reject(error);
    };
    return axios;
);
/**
 * 
 */