<template>
    <div>
        <!-- nav 导航栏  -->
        <nav class="navbar navbar-default navbar-fixed-top header">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#header-navbar-collapse" aria-expanded="false">
                        <span class="sr-only">实验楼</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="/">
                       <!-- <img src="img/logo_03.png">-->
                    </a>
                </div>
                <div class="collapse navbar-collapse" id="header-navbar-collapse">
                    <ul class="nav navbar-nav">
                        <li class="dropdown ">
                            <a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown" @click="toAllCourse">
                                课程
                            </a>
                        </li>
<!--                        <li class="">-->
<!--                            <a href="paths/index.html">路径</a>-->
<!--                        </li>-->
                        <li class="">
                            <a href="javascript:void(0);" @click="toQuestion">讨论区</a>
                        </li>
<!--                        <li class=" bootcamp new-nav logo-1111">
                            <a href="bootcamp/index.html">训练营</a>
                        </li>
                        <li class=" new-nav logo-1111">
                            <a href="vip/index.html">会员</a>

                        </li>-->

                    </ul>

                    <!-- 登录、注册、退出登录按钮-->
                    <div class="navbar-right btns" v-if="!userIsLogin">
                        <a class="btn btn-default navbar-btn sign-in" data-sign="signin" href="#sign-modal" data-toggle="modal">登录</a>
                        <a class="btn btn-default navbar-btn sign-up" data-sign="signup" href="#sign-modal" data-toggle="modal">注册</a>
                    </div>
                    <div class="navbar-right btns" v-if="userIsLogin">
                        <a class="btn btn-default navbar-btn sign-up" data-sign="signup" @click.prevent="loginOut">退出</a>
                    </div>


                    <form class="navbar-form navbar-right" action="search" method="get" role="search">
                        <div class="form-group btns">
                            <input type="text" class="form-control" name="search" autocomplete="off" placeholder="搜索 课程/问答">
                            <a class="btn btn-default" data-sign="signup" href="#sign-modal" data-toggle="modal">搜索</a>
                        </div>
                    </form>
                </div>
            </div>
        </nav>

        <!-- body -->
        <router-view></router-view>

        <!-- footer-->
        <div class="footer">
            <div class="container">
                <div class="row">
                    <!--                    <div class="col-md-4 clearfix footer-col">
                                            <img src="img/logo_03.png">
                                            <div class="footer-slogan">动手做实验，轻松学编程</div>
                                            <div class="col-xs-2">
                                                <div class="social-item footer-weixin-item">
                                                    <i class="fa fa-weixin"></i>
                                                    <div class="footer-weixin">
                                                        <img src="img/footer-weixin.png">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xs-2">
                                                <div class="social-item footer-qq-item">
                                                    <i class="fa fa-qq"></i>
                                                </div>
                                            </div>
                                            <div class="col-xs-2">
                                                <div class="social-item footer-weibo-item">
                                                    <a href="http://weibo.com/shiyanlou2013" target="_blank">
                                                        <i class="fa fa-weibo"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-6 col-sm-3 col-md-2 footer-col">
                                            <div class="col-title">公司</div>
                                            <a href="privacy/index.html" target="_blank">关于我们</a><br>
                                            <a href="privacy/index.html" target="_blank">联系我们</a><br>
                                            <a href="" target="_blank">加入我们</a><br>
                                            <a href="" target="_blank">技术博客</a><br>
                                        </div>
                                        <div class="col-xs-6 col-sm-3 col-md-2 footer-col">
                                            <div class="col-title">合作</div>
                                            <a href="privacy/index.html" target="_blank">我要投稿</a><br>
                                            <a href="labs/index.html" target="_blank">教师合作</a><br>
                                            <a href="edu/index.html" target="_blank">高校合作</a><br>
                                            <a href="privacy/index.html" target="_blank">友情链接</a>
                                        </div>
                                        <div class="col-xs-6 col-sm-3 col-md-2 footer-col">
                                            <div class="col-title">服务</div>
                                            <a href="bootcamp/index.html" target="_blank">实战训练营</a><br>
                                            <a href="vip/index.html" target="_blank">会员服务</a><br>
                                            <a href="courses/reports.html" target="_blank">实验报告</a><br>
                                            <a href="questions/index.html?tag=%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98" target="_blank">常见问题</a><br>
                                            <a href="privacy/index.html" target="_blank">隐私条款</a>
                                        </div>
                                        <div class="col-xs-6 col-sm-3 col-md-2 footer-col">
                                            <div class="col-title">学习路径</div>
                                            <a href="paths/index.html" target="_blank">Python学习路径</a><br>
                                            <a href="paths/index.html" target="_blank">Linux学习路径</a><br>
                                            <a href="paths/index.html" target="_blank">大数据学习路径</a><br>
                                            <a href="paths/index.html" target="_blank">Java学习路径</a><br>
                                            <a href="paths/index.html" target="_blank">PHP学习路径</a><br>
                                            <a href="paths/index.html", target="_blank">全部</a>
                                        </div>-->
                </div>
            </div>
            <div class="text-center copyright">
                <span>Copyright @2013-2016 慕课教育教育</span>
                <span class="ver-line"> | </span>
                <a href="http://www.bootstrapmb.com/" target="_blank">蜀ICP备13019762号</a>

            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "Home",
        data() {
            return {
                userIsLogin:false
            }
        },
        watch:{
            $route(to,from){
                this.initUserLoginStatus();
             }
        },
        created() {
           this.initUserLoginStatus();
        },
        methods: {
            initUserLoginStatus(){
                console.log('initUserIsLogin..');

                this.$axios.get(this.$requestBaseUrl.authorize + '/user/isLogin')
                  .then(res=>{
                      if(res.data.success){
                          this.userIsLogin = res.data.data;
                      }else {
                          this.$message.warning('判断登录状态发生异常');
                      }
                  }).catch(err=>{
                    this.$message.error('判断登录状态发生异常');
                });
            },

            loginOut(){
                console.log('点击了退出登录..')
                this.$axios.get(this.$requestBaseUrl.authorize + '/user/loginOut')
                  .then(res=>{
                      if(res.data.success){
                          this.$message.success('退出成功');
                          localStorage.removeItem('user-id');
                          localStorage.removeItem('user-token');
                          localStorage.removeItem('user-account');
                          location.reload();
                      }else {
                          this.$message.warning('退出操作发生异常');
                      }
                  }).catch(err=>{
                    this.$message.error('退出操作发生异常');
                });

            },
            /**
             * 前往课程首页
             */
            toAllCourse(){
                this.$router.push('/courses');
            },

            toQuestion(){
                this.$router.push('/question');
            },


        }
    }
</script>

<style scoped>

</style>