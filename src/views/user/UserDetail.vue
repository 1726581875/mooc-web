<template>

  <div>

    <div class="userinfo-banner layout-no-margin-top">
      <div class="container layout">
        <div class="row">
          <div class="col-md-9 clearfix">
            <div class="pull-left userinfo-banner-avatar">


              <div class="user-avatar ">
                <a class="avatar" href="#" target="_blank">
                  <img :src="user.imageUrl">
                </a>
              </div>


            </div>
            <div class="pull-left userinfo-banner-details">
              <div class="userinfo-banner-meta">


                <div class="user-username ">
                  <a class="username" href="#" target="_blank">
                      {{user.name}}
                  </a>
                 <!-- <span class="user-level">L195</span>-->
                </div>


              </div>
              <div class="userinfo-banner-status">


                <span>{{user.userType}}</span>

                <a target="_blank">{{user.motto == null ? '该用户什么也没写' : user.motto}}</a>


              </div>
            </div>
          </div>
          <div class="col-md-3 userinfo-banner-labinfo">
            <div class="userinfo-banner-level">
              <!--<img src="../../../public/imglou-level.png">-->
<!--              <div class="userinfo-current-level"><span>195</span> 楼</div>
              <div class="userinfo-level-more" data-toggle="tooltip" data-placement="bottom"
                   title="在实验环境中动手输入代码或命令时才计入有效学习时间">

                距 196 楼还需 16 分钟有效学习时间
              </div>-->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container layout">
      <div class="row">
        <div class="col-md-9 layout-body">

          <div class="content" role="tabpanel">


            <ul class="nav nav-tabs" rolw="tablist">
              <li role="presentation" class="active" id="mooc-tag-1">
                <a href="javascript:void(0);" role="tab" @click="changeTag(1)">创建的课程</a>
              </li>
              <li role="presentation" id="mooc-tag-2">
                <a href="javascript:void(0);" role="tab" @click="changeTag(2)">收藏的课程</a>
              </li>
              <li role="presentation" id="mooc-tag-3">
                <a href="javascript:void(0);" role="tab" @click="changeTag(3)">发表的评论</a>
              </li>

            </ul>

           <div class="tab-content">

              <div role="tabpanel" class="tab-pane active">
                <div class="row">
 <!--                 <div class="col-md-12">
                    <a>
                      <span class="label label-success">学过的</span>
                    </a>
                    <a href="study.html">
                      <span class="label label-default">关注的</span>
                    </a>

                    <a href="study.html">
                      <span class="label label-default">发布的</span>
                    </a>

                  </div>-->


                  <div class="col-md-4 col-sm-6  course" v-for="course in courseList" :key="course.id">
                    <a class="course-box" :href="'/courses/' + course.id">
                      <div class="sign-box">


                      </div>
                      <div class="course-img">

                        <img :alt="course.name" :src="course.imageUrl">

                      </div>

                      <div class="course-body">
                        <span class="course-title" data-toggle="tooltip"
                              data-placement="bottom" :title="course.name">
                            {{course.name}}
                        </span>
                      </div>
                      <div class="course-footer">
			             <span class="course-per-num pull-left">
                <i class="fa fa-users"></i>
                   {{course.learningNum}}
		             	</span>
                      </div>
             </a>
                </div>


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

        </div>
        <div class="col-md-3 layout-side">


<!--          <a class="side-sda apply-git" href="http://git.shiyanlou.com/shilei" target="_blank">
            &lt;!&ndash;<img src="../../../public/imgmy-git.png">&ndash;&gt;
            <span>代码库</span>
          </a>


          <div class="sidebox user-visitors">
            <div class="sidebox-header">
              <h4 class="sidebox-title">最近来访</h4>
            </div>
            <div class="sidebox-body">

              <div class="col-dm-12">
                <a class="row" href="/user/345538">
                  <div class="col-xs-2">
                    <img
                      src="https://dn-simplecloud.shiyanlou.com/gravatar345538.png?v=1483141057082&amp;imageView2/1/w/200/h/200">
                  </div>
                  <div class="col-xs-10">
                    <div>PKU_Hao</div>
                    <div>12分钟前</div>
                  </div>
                </a>
              </div>

              <div class="col-dm-12">
                <a class="row" href="/user/237882">
                  <div class="col-xs-2">
                    <img src="https://dn-simplecloud.shiyanlou.com/gravatarDQJPW4T4RJZF.jpg">
                  </div>
                  <div class="col-xs-10">
                    <div>vanxv</div>
                    <div>2小时前</div>
                  </div>
                </a>
              </div>

              <div class="col-dm-12">
                <a class="row" href="/user/262386">
                  <div class="col-xs-2">
                    <img src="https://dn-simplecloud.shiyanlou.com/gravatarKAYZQC5G6TJY.jpg">
                  </div>
                  <div class="col-xs-10">
                    <div>LIKIKI</div>
                    <div>5小时前</div>
                  </div>
                </a>
              </div>

              <div class="col-dm-12">
                <a class="row" href="/user/126970">
                  <div class="col-xs-2">
                    <img src="https://dn-simplecloud.shiyanlou.com/gravatarRKEXQSX3FDLK.jpg">
                  </div>
                  <div class="col-xs-10">
                    <div>星_尘</div>
                    <div>6小时前</div>
                  </div>
                </a>
              </div>

              <div class="col-dm-12">
                <a class="row" href="/user/309116">
                  <div class="col-xs-2">
                    <img src="https://dn-simplecloud.shiyanlou.com/gravatarM8EVLA6XFKRH.jpg">
                  </div>
                  <div class="col-xs-10">
                    <div>大风车</div>
                    <div>10小时前</div>
                  </div>
                </a>
              </div>

              <div class="col-dm-12">
                <a class="row" href="/user/140480">
                  <div class="col-xs-2">
                    <img src="https://dn-simplecloud.shiyanlou.com/gravatar9UBRP2BQR68H.jpg">
                  </div>
                  <div class="col-xs-10">
                    <div>lushengwen</div>
                    <div>1天前</div>
                  </div>
                </a>
              </div>

            </div>
          </div>-->
        </div>
      </div>
    </div>

    <div class="modal fade" id="message-modal" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
              class="sr-only">Close</span></button>
            <h4 class="modal-title">发送消息给 石头山</h4>
          </div>
          <div class="modal-body">
            <textarea style="width:100%; min-height:100px; max-width:100%;"></textarea>
          </div>
          <div class="modal-footer">
            <button class="btn btn-default" data-dismiss="modal">取消</button>
            <button class="btn btn-primary send-btn">发送</button>
          </div>
        </div>
      </div>
    </div>

    <!--        <div id="jinja-data"
                 data-userlab-id=""
                 data-authenticated="false"
                 data-infotype=""
                 data-request-friend-url="/user/friends/add"
                 data-sendmessage-url="/user/messages/send"
                 data-site-type="0"
                 data-search-user-url="/user/search"
                 data-request-friend-url="/user/friends/add"
                 data-send-message-url="/user/messages/send"
                 data-messages-url="/user/messages"
                 data-accept-friend-request-url="/user/friends/accept"
                 data-reject-friend-request-url="/user/friends/reject"

                 data-user-email=""
                 data-can-startlab="false"
                 data-is-email-validated="false"
                 data-qiniu-token-url="/api/qiniu/token"
                 data-gravatar-url="/user/profile/gravatar"
                 data-resend-email="/resendemail"
                 data-site-type="0"

                 data-current-username=""
                 data-current-userid=""
                 data-username="石头山"
                 data-userid="13"
                 data-code-url="/user/sms/code"
                 data-account-phone="/user/account/phone"
                 data-account-email="/user/account/email"
                 data-account-password="/user/account/password"
                 data-account-git="/user/account/git"


            ></div>-->


    <div class="modal fade" id="invite-user" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
              class="sr-only">Close</span></button>
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
            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
              class="sr-only">Close</span></button>
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
          <button type="button" class="close-modal" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
          </button>
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
                    <a class="pull-right" href="../../reset_password/index.html">忘记密码？</a>
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
                    注册表示您已经同意我们的<a href="../../privacy/index.html" target="_blank">隐私条款</a>
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
  </div>
</template>

<script>
  export default {
    name: "UserDetail",
    data() {
      return {
        user: {},
        teacherId:0,
        courseList: [],
        /**
         * 选择的标签1、创建的课程 2、收藏的课程 3、发布的评论
         */
        selectedTag:1,
        queryParam: {
          userId: 0,
          pageIndex: 1,
          pageSize: 15
        },
        pageCount: 1
      };
    },
    created() {
      let userId = this.$route.params.id;
      this.teacherId = userId;
      this.getCourseByTeacherId();
      this.getUserDetail(userId);
    },
    methods: {


      changeTag(flag){
        this.selectedTag = flag;
        $('#mooc-tag-' + flag).addClass("active");
        $("#mooc-tag-" + flag).siblings().removeClass("active");

        /**
         * 根据不同选择，调用不同方法
         */
        if(flag == 1){
          this.getCourseByTeacherId();
        }else if(flag == 2){
          this.getCollectionCourseByUserId();
        }else {

        }


      },


        /**
         * 获取用户信息
         * @param teacherId
         */
        getUserDetail(teacherId){
            this.$axios.get(this.$requestBaseUrl.core + '/admin/moocUsers/' + teacherId)
              .then(res=>{
                  if(res.data.success){
                      this.user = res.data.data;
                      this.user.imageUrl = this.$requestBaseUrl.core + this.user.userImage;
                  }else {
                      this.$message.warning('获取用户详情失败，请刷新看看');
                  }
              }).catch(err=>this.$message.error("获取用户信息失败，服务器异常"));
        },


      getCourseByTeacherId() {
        this.queryParam.userId = this.teacherId;
        this.$axios.get(this.$requestBaseUrl.core + '/courses/listByTeachId',{params: this.queryParam
        })
          .then(res => {
            if (res.data.success) {
                let respData = res.data.data;
                this.courseList = respData.content;
                this.courseList.forEach(course=> course.imageUrl = this.$requestBaseUrl.core + course.image);

                this.pageCount = respData.pageCount;
                //设置第一页样式active
                if(this.queryParam.pageIndex == 1) {
                    $("#mooc-index-1").addClass("active");
                }
            }else {
                this.$message.warning("获取课程列表失败，服务器异常");
            }
          }).catch(err => this.$message.error("获取课程列表失败，服务器异常"));
      },

      getCollectionCourseByUserId() {
        this.queryParam.teacherId = this.teacherId;
        this.$axios.get(this.$requestBaseUrl.core + '/courses/collection/list',{params: this.queryParam
        })
                .then(res => {
                  if (res.data.success) {
                    let respData = res.data.data;
                    this.courseList = respData.content;
                    this.courseList.forEach(course=> course.imageUrl = this.$requestBaseUrl.core + course.image);

                    this.pageCount = respData.pageCount;
                    //设置第一页样式active
                    if(this.queryParam.pageIndex == 1) {
                      $("#mooc-index-1").addClass("active");
                    }
                  }else {
                    this.$message.warning("获取收藏课程列表失败，服务器异常");
                  }
                }).catch(err => this.$message.error("获取收藏课程列表失败，服务器异常"));
      },


      /**
       * 分页相关
       * @param index
       */
      onClickPage(index){
            $("#mooc-index-"+index).siblings().removeClass("active");
            $("#mooc-index-"+index).addClass("active");

            this.queryParam.pageIndex = index;
            this.changeTag(this.selectedTag);
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
            this.changeTag(this.selectedTag);
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
            this.changeTag(this.selectedTag);
        }

    }
  }
</script>

<style scoped>

</style>