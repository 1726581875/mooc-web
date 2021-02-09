<template>
    <div>
        <div class="container layout layout-margin-top">


            <div class="row">
                <div class="col-md-9 layout-body">

                    <div class="content">
                        <div class="row course-cates">
                            <!-- 分类 categoryList -->
                            <div class="col-md-1 course-cates-title">类别：</div>
                            <div class="col-md-11 course-cates-content">
                                <a id="mooc-category-0" class="active" @click="onClickCategory(0,-1)">全部</a>
                                <a :id="'mooc-category-'+category.id" v-for="(category,index) in categoryList" :key="category.id" @click="onClickCategory(category.id,index)">
                                    {{category.name}}
                                </a>
                            </div>
                        </div>

                        <!-- 标签 tagList -->
                        <div class="row course-cates">
                            <div class="col-md-1 course-cates-title">标签：</div>
                            <div class="col-md-11 course-cates-content">
                                <a id="mooc-tag-0" class="active" @click="onClickTag(0)">全部</a>
                                <a :id="'mooc-tag-' + tag.id" class="" v-for="tag in tagList" :key="tag.id" @click="onClickTag(tag.id)"> {{tag.name}}</a>
                            </div>
                        </div>
                    </div>
                    <div class="content position-relative">
                        <ul class="nav nav-tabs" role="tablist">
                            <li class="active"><a href="/courses/?course_type=all&amp;tag=all&amp;fee=all">已上线</a></li>
                            <li class=""><a href="/courses/?status=preview" class="stat-event" data-stat="preview_course">即将上线</a></li>
                        </ul>
                        <div class="clearfix"></div>
                        <div class="courses-sort">
                            <a  href="/courses/?course_type=all&amp;tag=all&amp;fee=all&amp;order=latest">最新</a>
                            /
                            <a  href="/courses/?course_type=all&amp;tag=all&amp;fee=all&amp;order=hotest">最热</a>
                        </div>
                        <div class="search-result"></div>

                        <div class="row">
               <!--     展示课程列表开始       -->

                            <div class="col-md-4 col-sm-6  course" v-for="course in courseList" :key="course.id">
                                <a class="course-box" :href="'courses/' + course.id">
                                    <div class="sign-box">
                                        <i class="fa fa-star-o course-follow pull-right"
                                           data-follow-url="/courses/63/follow"
                                           data-unfollow-url="/courses/63/unfollow" style="display:none"></i>

                                    </div>
                                    <div class="course-img">

                                        <img alt="新手指南之玩转慕课" :src="course.imageUrl">

                                    </div>

                                    <div class="course-body">
                                        <span class="course-title" data-toggle="tooltip" data-placement="bottom"
                                              title="新手指南之玩转实验楼">{{course.name}}</span>
                                    </div>
                                    <div class="course-footer">
			<span class="course-per-num pull-left">
                <i class="fa fa-users"></i>

                {{course.learningNum}}

			</span>


                                    </div>
                                </a>
                            </div>

                        </div>


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
                <div class="col-md-3 layout-side">



           <!-- 用户信息 -->

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
                                    <span class="media-heading username">欢迎来到实验楼</span>
                                    <p class="vip-remain">做实验，学编程</p>

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
                                <div class="col-md-6 col-xs-6 pos-left">

                                    <a href="#sign-modal" data-toggle="modal" data-sign="signin"><span class="glyphicon glyphicon-bookmark"></span> 加入私有课</a>

                                </div>
                                <div class="col-md-6 col-xs-6 pos-right">
                                    <a href="/contribute" target="_blank"><span class="glyphicon glyphicon-send"></span> 我要投稿</a>
                                </div>

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
                            <h4 class="sidebox-title">课程教师</h4>
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
                                    资深程序员，5年Linux运维、企业级开发经验及数据库实战和教学经验。
                                </div>
                            </div>
                        </div>
                        <div class="sidebox-footer mooc-footer">
                            <a :href="'/users/' + user.id" target="_blank">查看收藏的所有课程 ></a>
                        </div>
                    </div>

                    <div class="sidebox">

                        <div class="sidebox-header">
                            <h4 class="sidebox-title">最热路径</h4>
                        </div>
                        <div class="sidebox-body course-content side-list-body">
                            <a href="/paths/python"><img style="width:25px;height:25px" src="../../../public/img/1471513769430.png"> Python 研发工程师</a>
                            <a href="/paths/bigdata"><img style="width:25px;height:25px" src="../../../public/img/1471513926288.png"> 大数据工程师</a>
                            <a href="/paths/cpp"><img style="width:25px;height:25px" src="../../../public/img/1471513793360.png"> C++ 研发工程师</a>
                            <a href="/paths/security"><img style="width:25px;height:25px" src="../../../public/img/1471513867033.png"> 信息安全工程师</a>
                            <a href="/paths/linuxsys"><img style="width:25px;height:25px" src="../../../public/img/1471514004752.png"> Linux 运维工程师</a>
                        </div>

                    </div>

                    <div class="side-image side-qrcode">
                        <img src="../../../public/img/ShiyanlouQRCode.png">
                        <div class="side-image-text">关注公众号，手机看教程</div>
                    </div>

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

                        <p><h4><a href="#sign-modal" data-toggle="modal" data-sign="signin">登录</a>后邀请好友注册，您和好友将分别获赠3个实验豆！</h4><p>

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
                        <!-- 登录弹出框 -->
                        <div class="tab-content">
                            <div role="tabpanel" class="tab-pane active" id="signin-form">
                                <form>
                                    <div class="form-group">
                                        <div class="input-group">
                                            <div class="input-group-addon">
                                                <i class="fa fa-envelope" style="margin:0;"></i>
                                            </div>
                                            <input type="text" name="username" class="form-control" v-model:value="param.username" placeholder="请输入账号">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="input-group">
                                            <div class="input-group-addon">
                                                <i class="fa fa-lock" style="margin:0;"></i>
                                            </div>
                                            <input type="password" name="password" class="form-control" v-model:value="param.password" placeholder="请输入密码">
                                        </div>
                                    </div>
                                    <div class="form-inline verify-code-item" >
                                        <div class="form-group">
                                            <div class="input-group">
                                                <input type="text" name="captcha_v" class="form-control" v-model:value="param.code" placeholder="请输入验证码">
                                            </div>
                                        </div>
                                        <img class="verify-code" :src="vcUrl" @click="updateVerificationCode">
                                    </div>
                                    <div class="form-group remember-login">
                                        <input name="remember" type="checkbox" value="y"> 下次自动登录
                                        <a class="pull-right" href="../reset_password/index.html">忘记密码？</a>
                                    </div>
                                    <div class="form-group">
                                        <input class="btn btn-primary" name="submit" type="submit" value="登录" @click.prevent="submitLogin">
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
                            <!-- 注册弹出框 -->
                            <div role="tabpanel" class="tab-pane" id="signup-form">
                                <form action="/register" method="post">
                                    <div class="form-group">
                                        <div class="input-group">
                                            <div class="input-group-addon">
                                                <i class="fa fa-envelope" style="margin:0;"></i>
                                            </div>
                                            <input type="email" name="username" class="form-control" placeholder="请输入用户名">
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
             data-loginurl="/login"
             data-private-course-url="/courses/join"
             data-site-type="0"

        ></div>



    </div>
</template>

<script>
    import { encrypt } from '@/utils/rsaEncrypt'
    export default {
        name: "Course",
        data() {
            return {
                categoryList: [],
                tagList:[],
                courseList:[],
                queryParam:{
                    tagIdList:[],
                    matchStr:'',
                    pageIndex:1,
                    pageSize:15
                },
                pageCount: 1,
                //用户基本信息
                user:{
                    id:''
                },
                //用户是否已经登录
                userIsLogin:false,
                //登录相关
                param: {
                    username: 'zhangsan',
                    password: 'root',
                    code:''
                },
                vcUrl: this.$requestBaseUrl.authorize+'/mooc/admin/code/image?time='+new Date().getTime(),
            };
        },
        created() {
            //判断登录状态
            this.initUserLoginStatus();
            //通知父组件（导航栏，更新视图）
            this.$emit('initUserLoginStatus', null);
            this.listAllCategory();
        },
        methods: {
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
             * 刷新二维码
             */
            updateVerificationCode() {
                this.vcUrl = this.$requestBaseUrl.authorize+'/mooc/admin/code/image?time='+new Date().getTime();
            },
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
             * 获取课程分类标签
             */
            listAllCategory(){
                this.$axios.get(this.$requestBaseUrl.core + '/admin/categorys/all')
                .then(res => {
                    if(res.data.success){
                        this.categoryList = res.data.data;
                        //给tagList赋值
                        this.categoryList.forEach(category => {
                            category.tagList.forEach(tag=>{
                                this.tagList.push(tag);
                            });
                        });
                        //获取分类标签id参数
                        this.tagList.forEach(tag => this.queryParam.tagIdList.push(tag.id));
                        //查询课程
                        this.listCourse();
                        console.log(this.tagList);
                    }
                });
            },
          /**
           * 根据标签id获取课程
           */
          listCourse(){
              //获取课程列表
                this.$axios.post(this.$requestBaseUrl.core + '/admin/courses/getByTag',this.queryParam)
                  .then(res=>{
                      if(res.data.success){
                          let respData = res.data.data;
                          this.courseList = respData.content;
                          //拼接图片完整url
                          this.courseList.forEach(course=>{
                              course.imageUrl = this.$requestBaseUrl.core + course.image;
                          });
                          this.pageCount = respData.pageCount;
                          //设置第一页样式active
                         if(this.queryParam.pageIndex == 1) {
                             $("#mooc-index-1").addClass("active");
                         }

                      }else {
                          this.$message.warning("获取课程列表失败，请重新刷新看看");
                      }
                }).catch(err =>{
                   this.$message.error(err);
                })

            },

            /**
             *  categoryId=0，index=-1 表示选择全部
             * @param categoryId
             * @param index
             */
          onClickCategory(categoryId,index){
              //样式改变
            $("#mooc-category-"+categoryId).siblings().removeClass("active");
            $("#mooc-category-"+categoryId).addClass("active");

            //分类下的标签样色也改变
                $("#mooc-tag-0").siblings().removeClass("active");
                $("#mooc-tag-0").addClass("active");

                this.tagList = [];
                //设置选择的分类下的标签
                if(index == -1){
                    this.categoryList.forEach(category=>{
                        category.tagList.forEach(tag=>{
                            this.tagList.push(tag);
                        });
                    });
                }else {
                    this.tagList = this.categoryList[index].tagList;
                }
                //获取分类标签id参数，查询课程列表
                this.tagList.forEach(tag => this.queryParam.tagIdList.push(tag.id));
                this.listCourse();
            console.log("onclick category id is " + categoryId + ",index=" + index);
          },

          onClickTag(tagId){
              //设置样式
            $("#mooc-tag-"+tagId).siblings().removeClass("active");
            $("#mooc-tag-"+tagId).addClass("active");

             //设置参数，查询
             this.queryParam.tagIdList = [];
              this.queryParam.tagIdList.push(tagId);
              this.queryParam.pageIndex = 1;
              this.listCourse();

            console.log("onclick tag is " + tagId);
          },

          onClickPage(index){
            $("#mooc-index-"+index).siblings().removeClass("active");
            $("#mooc-index-"+index).addClass("active");

              this.queryParam.pageIndex = index;
              this.listCourse();
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
              this.listCourse();
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
              this.listCourse();
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
            }

        }
    }
</script>

<style scoped>

</style>