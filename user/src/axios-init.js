import axios from 'axios'
import router from './router'

export default()=>{

   axios.defaults.baseURL = 'http://localhost:8081/qujin/client'; // 配置axios请求的地址
   axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
   axios.defaults.crossDomain = true;  //设置cross跨域 并设置访问权限 
  
 
   //配置发送请求前的拦截器 可以设置token信息 
   axios.interceptors.request.use(config => {
       var token = localStorage.getItem('token');

       axios.defaults.headers.common['Authorization'] = token;

  
           return config;
       }, error => {
           loadingInstance.close();
           return Promise.reject(error);
       });
// 配置响应拦截器 
   axios.interceptors.response.use(res => {
       //对响应数据做些事
       console.log(res.status);
       
       const authorization = res.headers.authorization;
       localStorage.setItem('token',authorization);
 
       if(typeof(localStorage.getItem('token'))!=undefined&&typeof(localStorage.getItem('token'))!=null)
       localStorage.setItem('islogin',1);
       if(res.status=="401"){
        localStorage.setItem('token',null);
        localStorage.setItem('islogin',0);
        //全局登陆过滤，当判读token失效或者没有登录时 返回登陆页面
        router.push('/');
        return false;
    };
    return Promise.resolve(res);
      
   	},
   	error => {
   	  alert('请求失败，请稍后重试！')
   	  return Promise.reject(error)
   	}
   		
   	);

   return axios;
    }






   
	



    
    

/**
 * 
 */