<template>
    <div>
      <div class="container layout layout-margin-top">


        <div class="row">
          <div class="col-md-9 layout-body">

            <div class="content">
                <input type="text" class="form-control" style="width: 70%;display: inline-block"
                       name="search" autocomplete="off" placeholder="搜索课程" v-model="queryParam.keyWord">
              <button type="button" class="btn btn-info" style="margin-left: 20px;margin-bottom: 7px" @click="getCourseListByKeyWord">搜索</button>




              <ul class="nav nav-tabs question-types" role="tablist">


              </ul>
              <div class="tab-content">
                <div role="tabpanel" class="tab-pane active">

                  <ul class="row question-items">

                    <!-- 课程 List-->
                    <li class="question-item" v-for="course in courseList" :key="course.courseId">
                      <div class="col-md-10"  style="display: inline-block;float: left">
                        <div class="col-sm-2 question-item-author">
                          <div class="course-image">
                            <a class="image" href="javascript:void(0);"  @click="toCourseDetail(course.courseId)"
                               style="display: inline-block;float: left">
                              <img :src="course.courseImage">
                            </a>
                          </div>
                        </div>
                        <div style="margin-left: 80px;display: inline-block;float: left">
                          <h4>
                            <a class="question-item-title" href="javascript:void(0);"  @click="toCourseDetail(course.courseId)"
                               v-html="course.courseName"></a>
                          </h4>
                          <div class="question-item-summary">
                            <span class="question-item-date" v-html="course.summary"></span>

                          </div>
                           <div class="question-item-summary">
                             &nbsp;&nbsp;&nbsp;&nbsp;  教师：
                          <a class="username" href="javascript:void(0);"  @click="toUserDetail(course.teacherId)">
                            {{course.teacherName}}
                          </a>
                          创建时间：{{course.createTime}}
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>


                  <!-- 分页 -->
                  <nav class="pagination-container">
                    <ul class="pagination">

                      <li>
                        <a href="javascript:void(0);" aria-label="Previous" @click="prePage">
                          <span aria-hidden="true">上一页</span>
                        </a>
                      </li>

                      <li :id="'mooc-index-' + index" class="" v-for="index in pageCount" :key="index" @click="onClickPage(index)">
                        <a href="javascript:void(0);">{{index}}</a>
                      </li>

                      <li class="">
                        <a aria-label="Next" href="javascript:void(0);" @click="nextPage">
                          <span aria-hidden="true">下一页</span>
                        </a>
                      </li>

                    </ul>
                  </nav>



                </div>
              </div>
            </div>

          </div>
          <div class="col-md-3 layout-side">


            <div class="panel panel-default panel-userinfo" v-if="!userIsLogin">
              <div class="panel-body body-userinfo">
                <div class="media userinfo-header">
                  <div class="media-left">
                    <div class="user-avatar">

                      <a class="avatar" href="#sign-modal" data-toggle="modal" data-sign="signin">
                        <img class="circle" src="../../../public/img/logo-grey.png">
                      </a>

                    </div>
                  </div>
                  <div class="media-body">
                    <span class="media-heading username">欢迎来到在线慕课用户端</span>
                    <p class="vip-remain">免费看课程，学知识</p>

                  </div>
                </div>

                <div class="row userinfo-data">

                  <hr>
                  <div class="btn-group-lr">
                    <a href="#sign-modal" type="button" class="btn btn-success col-md-5 col-xs-6 login-btn" data-toggle="modal" data-sign="signin">登录</a>
                    <a href="#sign-modal" type="button" class="btn btn-success col-md-5 col-xs-6 col-md-offset-1 register-btn" data-toggle="modal" data-sign="signup">注册</a>
                  </div>

                </div>

                <div class="userinfo-footer row">
                  <!--                                <div class="col-md-6 col-xs-6 pos-left">

                                                      <a href="#sign-modal" data-toggle="modal" data-sign="signin"><span class="glyphicon glyphicon-bookmark"></span> 加入私有课</a>

                                                  </div>
                                                  <div class="col-md-6 col-xs-6 pos-right">
                                                      <a href="/contribute" target="_blank"><span class="glyphicon glyphicon-send"></span> 我要投稿</a>
                                                  </div>-->

                  <div id="join-private-course" class="modal fade words-ctrl" tabindex="-1" role="dialog">
                    <div class="modal-dialog" role="document">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h4 class="modal-title">加入私有课</h4>
                        </div>
                        <div class="modal-body">
                          <div style="margin:15px 0; font-size:16px;">输入教师提供的私有课程码可以加入教师的私有课程。</div>
                          <form id="private-course-form" method="POST" action="/courses/join">
                            <div class="form-group">
                              <label for="code">邀请码</label>
                              <input class="form-control" id="code" name="code" type="text" value="">
                              <input name="_csrf_token" type=hidden value="1483780974##87f89328c5616669f00302a263fe9061bb852818">
                            </div>
                          </form>

                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                          <button type="button" class="btn btn-primary" onclick="document.getElementById('private-course-form').submit();">确定</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="sidebox mooc-teacher"  v-if="userIsLogin">
              <div class="sidebox-header mooc-header">
                <h4 class="sidebox-title">用户信息</h4>
              </div>
              <div class="sidebox-body mooc-content">
                <a :href="'/users/' + user.id" target="_blank">
                  <img :src="user.imageUrl">
                </a>
                <div class="mooc-info">
                  <div class="name"><strong>{{user.name}}</strong> </div>

                  <div class="courses">共收藏过<strong>18</strong>门课程</div>
                </div>
                <div class="mooc-extra-info">
                  <div class="word long-paragraph">
                    {{user.motto ? user.motto : '该用户什么也没写..'}}
                  </div>
                </div>
              </div>
              <div class="sidebox-footer mooc-footer">
                <a :href="'/users/' + user.id" target="_blank">查看收藏的所有课程 ></a>
              </div>
            </div>

            <div class="sidebox">
              <div class="sidebox-header">
                <h4 class="sidebox-title">热门课程top10</h4>
              </div>
              <div class="sidebox-body course-content side-list-body">
                            <span  v-for="topCourse in top10CourseList">
                             <a :href="'courses/' + topCourse.courseId">
                               <img style="width:25px;height:25px" :src="topCourse.imageUrl">
                               {{topCourse.courseName}} <!--{{topCourse.count}}-->
                             </a>
                            </span>
              </div>
            </div>

<!--
            <div class="side-image side-qrcode">
              <img src="../../../public/img/ShiyanlouQRCode.png">
              <div class="side-image-text">关注公众号，手机看教程</div>
            </div>

            <div class="sidebox side-list">
              <div class="sidebox-header">
                <h4 class="sidebox-title">常见问题</h4>
              </div>
              <div class="sidebox-body side-list-body">
                <a href="/questions/80" target="_blank">实验操作很卡怎么办？</a>
                <a href="/questions/91" target="_blank">为什么连不上实验桌面？</a>
                <a href="/questions/360" target="_blank">"我的代码库"如何用？</a>
                <a href="/questions/92" target="_blank">实验楼环境默认用户及密码？</a>
                <a href="/questions/235" target="_blank">环境中是否可以联网？</a>
              </div>
              <div class="sidebox-footer">
                <div class="pull-right"><a href="/questions/?tag=%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98" target="_blank">查看全部</a></div>
              </div>
            </div>
-->


          </div>
        </div>
      </div>

      <div class="modal fade" id="invite-user" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
              <h4 class="modal-title">邀请好友，双方都可获赠实验豆！</h4>
            </div>
            <div class="modal-body">

              <p><h4><a href="#sign-modal" data-toggle="modal" data-sign="signin">登录</a>后邀请好友注册，您和好友将分别获赠3个实验豆！</h4></p>

              <div id="msg-modal"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="modal fade" id="flash-message" tabindex="-1" role="dialog">
        <div class="modal-dialog" rolw="document">
        </div>
      </div>
      <div class="modal fade" id="modal-message" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
              <h4 class="modal-title">注意</h4>
            </div>
            <div class="modal-body">
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
              <button type="button" class="btn btn-primary confirm" data-dismiss="modal">确定</button>
            </div>
          </div>
        </div>
      </div>

      <div class="modal fade askquestion-modal" id="askquestion" tabindex="-1" role="dialog">
        <div class="modal-dialog" role=document>
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 class="modal-title">发帖</h4>
            </div>
            <div class="modal-body words-ctrl">
              <form class="form-horizontal" action="/questions/">
                <input name="_csrf_token" type=hidden value="1483789088##bbf83c51243ab12daa94911c8865a65bdc66c4d8">
                <div class="form-group">
                  <label class="col-md-2 control-label">标题</label>
                  <div class="col-md-10">
                    <input type="text" name="title" min="5" max="100" class="form-control" placeholder="至少输入5个字" value="">
                    <span class="help-block"></span>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-md-2 control-label">描述</label>
                  <div class="col-md-10">



                    <div class="tabpanel mkeditor">
                      <ul class="nav nav-tabs" role="tablist">
                        <li role="presentation" class="active">
                          <a href="#mkeditor-editor" role="tab" data-toggle="tab">编辑</a>
                        </li>
                        <li role="presentation">
                          <a class="mkeditor-btn-view" href="#mkeditor-viewer" role="tab" data-toggle="tab">预览</a>
                        </li>
                      </ul>
                      <div class="tab-content">
                        <div class="tab-pane active mkeditor-editor" id="mkeditor-editor" role="tabpanel">

                          <div class="btn-group" role="group">

                            <button type="button" class="btn btn-default mkeditor-btn-bold">
                              <i class="fa fa-bold"></i>
                            </button>
                            <button type="button" class="btn btn-default mkeditor-btn-italic">
                              <i class="fa fa-italic"></i>
                            </button>
                            <button type="button" class="btn btn-default mkeditor-btn-link">
                              <i class="fa fa-link"></i>
                            </button>
                            <button type="button" class="btn btn-default mkeditor-btn-quote">
                              <i class="fa fa-quote-left"></i>
                            </button>
                            <button type="button" class="btn btn-default mkeditor-btn-code">
                              <i class="fa fa-code"></i>
                            </button>
                            <button id="mkeditor-pickfile" type="button" class="btn btn-default mkeditor-btn-img">
                              <i class="fa fa-image"></i>
                            </button>

                            <button type="button" class="btn btn-default mkeditor-btn-listol">
                              <i class="fa fa-list-ol"></i>
                            </button>
                            <button type="button" class="btn btn-default mkeditor-btn-listul">
                              <i class="fa fa-list-ul"></i>
                            </button>
                          </div>
                          <div class="btn-group pull-right" role="group">
                            <a style="font-size:12px; color:#666; text-decoration:underline;" href="/questions/764" target="_blank">
                              <i class="fa fa-question-circle"></i>Markdown 语法
                            </a>
                          </div>
                          <textarea name="content" class="content"
                                    min="0" max="20000"
                                    placeholder="推荐使用 Markdown 语法，至少输入 5 个字"></textarea>
                          <div class="help-block"></div>
                        </div>
                        <div class="tab-pane mkeditor-viewer markdown-body" id="mkeditor-viewer" role="tabpanel">
                          <div></div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
                <div class="form-group" >
                  <label class="col-md-2 control-label">板块</label>
                  <div class="col-md-10">
                    <div class="q-types" data-type="">
                    </div>
                  </div>
                </div>


              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
              <button type="button" class="submit-question btn btn-primary" data-dismiss="modal">提交</button>
            </div>
          </div>
        </div>
      </div>


      <div class="modal fade" id="sign-modal" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-sm" role="document">
          <div class="modal-content">
            <button type="button" class="close-modal" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <div class="modal-body">
              <ul class="nav nav-tabs" role="tablist">
                <li role="presentation" class="active">
                  <a href="#signin-form" aria-controls="signin-form" role="tab" data-toggle="tab">登录</a>
                </li>
                <li role="presentation">
                  <a href="#signup-form" aria-controls="signup-form" role="tab" data-toggle="tab">注册</a>
                </li>
              </ul>
              <div class="tab-content">
                <div role="tabpanel" class="tab-pane active" id="signin-form">
                  <form action="/login" method="post">
                    <div class="form-group">
                      <div class="input-group">
                        <div class="input-group-addon">
                          <i class="fa fa-envelope" style="margin:0;"></i>
                        </div>
                        <input type="email" name="login" class="form-control" placeholder="请输入邮箱">
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="input-group">
                        <div class="input-group-addon">
                          <i class="fa fa-lock" style="margin:0;"></i>
                        </div>
                        <input type="password" name="password" class="form-control" placeholder="请输入密码">
                      </div>
                    </div>
                    <div class="form-inline verify-code-item" style="display:none;">
                      <div class="form-group">
                        <div class="input-group">
                          <input type="text" name="captcha_v" class="form-control" placeholder="请输入验证码">
                        </div>
                      </div>
                      <img class="verify-code" src="" source="https://www.shiyanlou.com/captcha.gif">
                    </div>
                    <div class="form-group remember-login">
                      <input name="remember" type="checkbox" value="y"> 下次自动登录
                      <a class="pull-right" href="../reset_password/index.html">忘记密码？</a>
                    </div>
                    <div class="form-group">
                      <input class="btn btn-primary" name="submit" type="submit" value="进入实验楼">
                    </div>
                    <div class="form-group widget-signin">
                      <span>快速登录</span>
                      <a href="/auth/qq?next="><i class="fa fa-qq"></i></a>
                      <a href="/auth/weibo?next="><i class="fa fa-weibo"></i></a>
                      <a href="/auth/weixin?next="><i class="fa fa-weixin"></i></a>
                      <a href="/auth/github?next="><i class="fa fa-github"></i></a>
                      <a href="/auth/renren?next="><i class="fa fa-renren"></i></a>
                    </div>
                    <div class="form-group error-msg">
                      <div class="alert alert-danger" role="alert"></div>
                    </div>
                  </form>
                </div>
                <div role="tabpanel" class="tab-pane" id="signup-form">
                  <form action="/register" method="post">
                    <div class="form-group">
                      <div class="input-group">
                        <div class="input-group-addon">
                          <i class="fa fa-envelope" style="margin:0;"></i>
                        </div>
                        <input type="email" name="email" class="form-control" placeholder="请输入邮箱">
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="input-group">
                        <div class="input-group-addon">
                          <i class="fa fa-lock" style="margin:0;"></i>
                        </div>
                        <input type="password" name="password" class="form-control" placeholder="请输入密码">
                      </div>
                    </div>
                    <div class="form-inline">
                      <div class="form-group">
                        <div class="input-group">
                          <input type="text" name="captcha_v" class="form-control" placeholder="请输入验证码">
                        </div>
                      </div>
                      <img class="verify-code" src="" source="https://www.shiyanlou.com/captcha.gif">
                    </div>
                    <div class="form-group">
                      <input class="btn btn-primary" name="submit" type="submit" value="注册">
                    </div>
                    <div class="form-group agree-privacy">
                      注册表示您已经同意我们的<a href="../privacy/index.html" target="_blank">隐私条款</a>
                    </div>
                    <div class="form-group widget-signup">
                      <span>快速注册</span>
                      <a href="/auth/qq?next="><i class="fa fa-qq"></i></a>
                      <a href="/auth/weibo?next="><i class="fa fa-weibo"></i></a>
                      <a href="/auth/weixin?next="><i class="fa fa-weixin"></i></a>
                      <a href="/auth/github?next="><i class="fa fa-github"></i></a>
                      <a href="/auth/renren?next="><i class="fa fa-renren"></i></a>
                    </div>
                    <div class="form-group error-msg">
                      <div class="alert alert-danger" role="alert"></div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="base-data"


           data-flash="false"



           data-is-login=false

           data-is-jwt=true
           data-socket-url="wss://comet.shiyanlou.com"
           data-msg-user=""
           data-msg-system=""
      ></div>

      <div id="jinja-data"

           data-question-form="/questions/meta"
           data-is-authenticated="false"
           data-login-url="/login?next=%2Fquestions%2F"
           data-qiniu-token-url="/api/qiniu/token"
           data-userid=""
      ></div>
    </div>
</template>

<script>
  import { encrypt } from '@/utils/rsaEncrypt'
    export default {
      name: "SearchCourse",
      data() {
        return {
          courseList:[],
          queryParam:{
            keyWord:'',
            pageIndex:1,
            pageSize:10
          },
          pageCount: 1,

          //切换样式active，全部0,课程评论1，课程问答2
          activeIndex: 0,
          //排名前10的课程
          top10CourseList:[
            {courseName:"SpringCloud入门实践",imageUrl:'../../../public/img/1471513769430.png'}
          ],
          //用户是否已经登录
          userIsLogin:false,

          //用户基本信息
          user:{
            id:''
          },
          //登录相关
          param: {
            username: 'zhangsan',
            password: 'root',
            code:''
          },
          vcUrl: this.$requestBaseUrl.authorize+'/mooc/admin/code/image?time='+new Date().getTime(),
          //注册对象
          register:{
            account:'',
            password:'',
            confirmPassword:'',
            userType: '普通用户'
          },
        }
      },
      watch:{
      },
      created() {
        //判断登录状态
        this.initUserLoginStatus();
        //通知父组件（导航栏，更新视图）
        this.$emit('initUserLoginStatus', null);

        this.getCourseListByKeyWord(-1);
        //查询top10的课程
        this.listTop10Course();
      },
      methods: {

        /**
         * 判断是否是登录状态
         */
        initUserLoginStatus(){
          console.log('initUserIsLogin..');

          this.$axios.get(this.$requestBaseUrl.authorize + '/user/isLogin')
            .then(res=>{
              if(res.data.success){
                this.userIsLogin = res.data.data;
                //获取用户基本信息
                if(this.userIsLogin) {
                  let userId = localStorage.getItem('user-id');
                  this.findUserById(userId);
                }
              }else {
                this.$message.warning('判断登录状态发生异常');
              }
            }).catch(err=>{
            this.$message.error('判断登录状态发生异常');
          });
        },
        /**
         * 查找用户基本信息
         * @param id
         */
        findUserById(id){
          this.$axios.get(this.$requestBaseUrl.core + '/users/' + id)
            .then(res=>{
              if(res.data.success){
                this.user = res.data.data;
                this.user.imageUrl = this.$requestBaseUrl.core + this.user.userImage;
              }else {
                this.$message.warning('加载用户信息失败,请刷新看看');
              }
            }).catch(err=>this.$message.error('加载用户信息失败'));
        },

        getCourseListByKeyWord(){
          console.log("keyWord=" + this.queryParam.keyWord);
          this.$axios.get(this.$requestBaseUrl.statistics + '/courses/search', {
            params: this.queryParam
          }).then(resp =>{
               if(resp.data.success){
                 this.courseList = resp.data.data.content;
                 //设置图片全路径
                 this.courseList.forEach(course=>course.courseImage = this.$requestBaseUrl.core + course.courseImage);
                 //设置总页数
                 this.pageCount = resp.data.data.pageCount;
                 //设置第一页样式active
                 if(this.queryParam.pageIndex == 1) {
                   $("#mooc-index-1").addClass("active");
                 }
               }else {
                 this.$message.warning('获取评论列表失败');
               }

          }).catch(err=>this.$message.error('获取评论列表失败'));
        },
        onClickPage(index){
          $("#mooc-index-"+index).siblings().removeClass("active");
          $("#mooc-index-"+index).addClass("active");

          this.queryParam.pageIndex = index;
          this.getCourseListByKeyWord();
        },

        prePage(){
          //参数判断
          let prePageIndex = this.queryParam.pageIndex - 1;
          if(prePageIndex < 1){
            return;
          }
          //样式改变
          $("#mooc-index-"+prePageIndex).siblings().removeClass("active");
          $("#mooc-index-"+prePageIndex).addClass("active");
          //查询
          this.queryParam.pageIndex = prePageIndex;
          this.getCourseListByKeyWord();
        },
        nextPage(){
          //参数判断
          let nextPageIndex = this.queryParam.pageIndex + 1;
          if(this.pageCount < nextPageIndex){
            return;
          }
          //样式改变
          $("#mooc-index-"+nextPageIndex).siblings().removeClass("active");
          $("#mooc-index-"+nextPageIndex).addClass("active");
          //查询
          this.queryParam.pageIndex = nextPageIndex;
          this.getCourseListByKeyWord();
        },
        toUserDetail(userId){
          this.$router.push('/users/' + userId)
        },
        toCourseDetail(courseId){
          this.$router.push('/courses/' + courseId);
        },
        toCommentDetail(courseId){
          this.$router.push('/question/' + courseId);
        },

        listTop10Course() {
          this.$axios.get(this.$requestBaseUrl.statistics + '/courses/listTop10')
            .then(resp => {
              if (resp.data.success) {
                this.top10CourseList = resp.data.data;
                this.top10CourseList.forEach(course => course.imageUrl = this.$requestBaseUrl.core + course.courseImage)
              } else {
                this.$message.warning('获取排名前10的课程失败');
              }
            }).catch(err => {
            this.$message.error('获取排名前10的课程失败');
          });
        },

        /**
         * 点击登录
         */
        submitLogin() {
          let valid = true;
          if (valid) {
            let loginParam =JSON.parse(JSON.stringify(this.param));
            //密码加密传输
            loginParam.password = encrypt(this.param.password);
            this.$axios.post(this.$requestBaseUrl.authorize+'/user/login',loginParam)
              .then(resp => {
                let respResult = resp.data;
                // 如果登录成功
                if(respResult.success) {
                  // let path = this.$route.query.redirect;
                  // this.$router.replace((path == '/' || path == undefined) ? '/about' : path);
                  console.log("登录成功...")
                  localStorage.setItem('user-token', respResult.data.token);
                  localStorage.setItem('user-id', respResult.data.userId);
                  localStorage.setItem('user-account', this.param.username);
                  location.reload();
                }else {
                  this.$message.warning(respResult.msg);
                  this.updateVerificationCode();
                }
              });
          } else {
            this.$message.error('请输入账号和密码');
            return false;
          }
        },
        /**
         * 刷新验证码
         */
        updateVerificationCode() {
          this.vcUrl = this.$requestBaseUrl.authorize+'/mooc/admin/code/image?time='+new Date().getTime();
        },
        /**
         * 注册方法
         */
        toRegister(){
          console.log("register=" + this.register.userType);
          console.log("account=" + this.register.account);
          console.log("password=" + this.register.password);
          console.log("confirmPassword=" + this.register.confirmPassword);

          let registerParam =JSON.parse(JSON.stringify(this.register));
          //密码加密传输rsa
          registerParam.password = encrypt(registerParam.password);
          registerParam.confirmPassword = encrypt(registerParam.confirmPassword);

          this.$axios.post(this.$requestBaseUrl.authorize + '/user/register',registerParam)
            .then(resp=>{
              if(resp.data.success){

                if(this.register.userType == '教师'){
                  this.$message.success('提交申请成功，等待管理员审批');
                }else {
                  this.$message.success('注册成功');
                }
                location.reload();
              }else {
                this.$message.warning('注册失败');
              }
            }).catch(err=>{
            this.$message.error('获取排名前10的课程失败');
          });


        },
      },
    }
</script>

<style scoped>

 /deep/ .course-image .image img {
    width: 120px;
    height: 80px;
   display: inline-block;
    /* border-radius: 50%; */
  }
</style>