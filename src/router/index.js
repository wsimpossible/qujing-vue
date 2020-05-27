import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Forget from '@/components/Forget'
import AdminLogin from '@/components/AdminLogin'
import AdminIndex from '@/components/admin/AdminIndex'
import UserManage from '@/components/admin/UserManage'
import ReportManage from '@/components/admin/ReportManage'
import RequireManage from '@/components/admin/RequireManage'
import ReportDetail from '@/components/admin/ReportDetail'
import RequireDetail from '@/components/admin/RequireDetail'
import FeedbackManage from '@/components/admin/FeedbackManage'
import FeedbackDetail from '@/components/admin/FeedbackDetail'
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
        path: '/adminlogin',
        name: 'AdminLogin',
        component: AdminLogin
      },
    {
      path: '/admin',
      name: 'AdminIndex',
      component: AdminIndex
    },
    {
      path: '/admin/user',
      name: 'UserManage',
      component: UserManage
    },
    {
        path: '/userindex/charge',
        name: 'Charge',
        component: Charge
      },
      {
          path: '/userindex/postal',
          name: 'Postal',
          component: Postal
        },
        {
            path: '/userindex/newsdetail',
            name: 'NewsDetail',
            component: NewsDetail
          },
          {
              path: '/userindex/news',
              name: 'News',
              component: News
            },
        {
            path: '/userindex/release',
            name: 'Release',
            component: Release
          },
          {
              path: '/userindex/accept',
              name: 'Accept',
              component: Accept
            },
            {
                path: '/userindex/myrelease',
                name: 'Myrelease',
                component: Myrelease
              },
              {
                  path: '/userindex/myaccept',
                  name: 'Myaccept',
                  component: Myaccept
                },
                {
                    path: '/userindex/taskdeal',
                    name: 'Taskdeal',
                    component: Taskdeal
                  },
                  {
                      path: '/userindex/taskdetail',
                      name: 'Taskdetail',
                      component: Taskdetail
                    },
    {
        path: '/userindex',
        name: 'UserIndex',
        component: UserIndex
      },
    {
      path: '/admin/report',
      name: 'ReportManage',
      component: ReportManage
    },
    {
        path: '/admin/feedback',
        name: 'FeedbackManage',
        component: FeedbackManage
      },
      
    {
        path: '/admin/require',
        name: 'RequireManage',
        component: RequireManage
      },
      {
          path: '/admin/feedbackdetail',
          name: 'FeedbackDetail',
          component: FeedbackDetail
        },
      {
          path: '/admin/reportdetail',
          name: 'ReportDetail',
          component: ReportDetail
        },
        {
            path: '/admin/requiredetail',
            name: 'RequireDetail',
            component: RequireDetail
          }

      

  ]
})