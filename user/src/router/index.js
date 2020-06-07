import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Forget from '@/components/Forget'
import updatepwd from '@/components/user/updatepwd'
import sprecord from '@/components/user/sprecord'
import czrecord from '@/components/user/czrecord'
import UserIndex from '@/components/user/UserIndex'
import Charge from '@/components/user/Charge'
import Postal from '@/components/user/Postal'
import News from '@/components/user/News'
import NewsDetail from '@/components/user/NewsDetail'
import Release from '@/components/user/Release'
import Accept from '@/components/user/Accept'
import Myrelease from '@/components/user/Myrelease'
import Myaccept from '@/components/user/Myaccept'
import Taskdeal from '@/components/user/Taskdeal'
import Taskdetail from '@/components/user/Taskdetail'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
      },
      {
          path: '/forget',
          name: 'Forget',
          component: Forget
        },
   
    {
        path: '/userindex/charge',
        name: 'Charge',
        component: Charge,
        meta: { // 在路由配置中加入meta:{requireAuth: true}
               requireAuth: true
              }
      },
      {
          path: '/userindex/postal',
          name: 'Postal',
          component: Postal,
          meta: { // 在路由配置中加入meta:{requireAuth: true}
                 requireAuth: true
                }
        },
        {
            path: '/userindex/updatepwd',
            name: 'updatepwd',
            component: updatepwd,
            meta: { // 在路由配置中加入meta:{requireAuth: true}
                   requireAuth: true
                  }
          },
          {
            path: '/userindex/sprecord',
            name: 'sprecord',
            component: sprecord,
            meta: { // 在路由配置中加入meta:{requireAuth: true}
                   requireAuth: true
                  }
          },
          {
            path: '/userindex/czrecord',
            name: 'czrecord',
            component: czrecord,
            meta: { // 在路由配置中加入meta:{requireAuth: true}
                   requireAuth: true
                  }
          },
        {
            path: '/userindex/newsdetail',
            name: 'NewsDetail',
            component: NewsDetail,
            meta: { // 在路由配置中加入meta:{requireAuth: true}
                   requireAuth: true
                  }
          },
          {
              path: '/userindex/news',
              name: 'News',
              component: News,
              meta: { // 在路由配置中加入meta:{requireAuth: true}
                     requireAuth: true
                    }
            },
        {
            path: '/userindex/release',
            name: 'Release',
            component: Release,
            meta: { // 在路由配置中加入meta:{requireAuth: true}
                   requireAuth: true
                  }
          },
          {
              path: '/userindex/accept',
              name: 'Accept',
              component: Accept,
              meta: { // 在路由配置中加入meta:{requireAuth: true}
                     requireAuth: true
                    }
            },
            {
                path: '/userindex/myrelease',
                name: 'Myrelease',
                component: Myrelease,
                meta: { // 在路由配置中加入meta:{requireAuth: true}
                       requireAuth: true
                      }
              },
              {
                  path: '/userindex/myaccept',
                  name: 'Myaccept',
                  component: Myaccept,
                  meta: { // 在路由配置中加入meta:{requireAuth: true}
                         requireAuth: true
                        }
                },
                {
                    path: '/userindex/taskdeal',
                    name: 'Taskdeal',
                    component: Taskdeal,
                    meta: { // 在路由配置中加入meta:{requireAuth: true}
                           requireAuth: true
                          }
                  },
                  {
                      path: '/userindex/taskdetail',
                      name: 'Taskdetail',
                      component: Taskdetail,
                      meta: { // 在路由配置中加入meta:{requireAuth: true}
                             requireAuth: true
                            }
                    },
    {
        path: '/userindex',
        name: 'UserIndex',
        component: UserIndex,
        meta: { // 在路由配置中加入meta:{requireAuth: true}
               requireAuth: true
              }
      }
   

      

  ]
})