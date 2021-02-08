<template>
  <div>
    <div class="container layout layout-margin-top">

      <!-- 面包屑 -->
      <ol class="breadcrumb">
        <li><a href="/courses">全部课程</a></li>

        <li>

          <a href="/courses/?tag=Linux">所属分类(待对接)</a>

        </li>

        <li class="active">
          <a href="/courses/1">
            {{course.name}}
          </a>
        </li>
      </ol>

      <div class="row">
        <!-- 1、课程基本信息 -->
        <div class="col-md-9 layout-body">

          <div class="side-image side-image-mobile">
            <img :src="course.imageUrl">
          </div>
          <!-- if  isHideVideo = true 显示以下信息-->
          <div class="content course-infobox" v-if="isHideVideo">
            <div class="clearfix course-infobox-header">
              <h4 class="pull-left course-infobox-title">
                <span>{{course.name}}</span>
              </h4>
              <div class="pull-right course-infobox-follow"
                   data-follow-url="/courses/1/follow"
                   data-unfollow-url="/courses/1/unfollow">
                <span class="course-infobox-followers">{{course.collectionNum}}</span>
                <span>人收藏</span>
                <i class="fa fa-star" data-next="/login?next=%2Fcourses%2F1" @click="onClickCollection(course.id)" v-if="isCollection"></i>
                <i class="fa fa-star-o" data-next="/login?next=%2Fcourses%2F1" @click="onClickCollection(course.id)" v-else></i>
              </div>
            </div>
            <div class="clearfix course-infobox-body">
              <div class="course-infobox-content">
                <p>{{course.summary}}</p>
              </div>

             <!-- 学习进度条 -->
              <div class="course-infobox-progress">
                <div class="course-progress-new" v-for="index in chapterList.length"></div>
                <span>（0/17）</span>
              </div>

              <div class="pull-right course-infobox-price">

              </div>
              </div>

          </div>
          <!-- 否则 显示视频-->
          <div class="content course-infobox" v-else>
            <div class="clearfix course-infobox-body">
            <video width="100%" height="100%" :src="nowVideoUrl" id="video" controls="controls"></video>
            </div>
            <div class="clearfix course-infobox-footer">
              <div class="pull-right course-infobox-learned">{{course.learningNum}} 人学过</div>
              <div class="course-infobox-content">
                <p>{{course.summary}}</p>
              </div>
            </div>
          </div>

          <!-- 2、课程章节信息 -->
          <div class="content">
            <ul class="nav nav-tabs" role="tablist">

              <li role="presentation" class="active">
                <a href="#labs" aria-controls="labs" role="tab" data-toggle="tab">课程列表</a>
              </li>

              <li role="presentation">
                <a href="#comments" class="stat-event" aria-controls="comments" role="tab" data-stat="course_comment" data-toggle="tab">课程评论(1194)</a>
              </li>
              <li role="presentation">
                <a href="#reports" class="stat-event" data-stat="course_report" aria-controls="reports" role="tab" data-toggle="tab">实验报告(3417)</a>
              </li>
              <li role="presentation">
                <a href="#questions" class="stat-event" data-stat="course_question" aria-controls="questions" role="tab" data-toggle="tab">实验问答(1108)</a>
              </li>
            </ul>
            <div class="tab-content">

              <div role="tabpanel" class="tab-pane active" id="labs">


                <!-- 大章列表 chapterList -->
           <div v-for="(chapter,chapterIndex) in chapterList" :key="chapter.id">

                <div class="lab-item ">
                  <div class="lab-item-index"><span>第{{chapterIndex + 1}}章</span></div>
                  <div class="lab-item-title" data-toggle="tooltip" data-placement="bottom" :title="chapter.name">{{chapter.name}}</div>
                  <div class="pull-right lab-item-ctrl">
                  </div>
                </div>
                <!-- 小节列表 sectionList -->
                <div class="lab-item " v-for="(section,sectionIndex) in chapter.sectionList" :key="section.id">
                  <div class="lab-item-status">
                    <img src="../../../public/img/lab-not-ok.png">
                  </div>
                  <div class="lab-item-index">第{{chapterIndex + 1}}-{{sectionIndex + 1}}节</div>
                  <div class="lab-item-title" data-toggle="tooltip" data-placement="bottom" :title="section.title">{{section.title}}</div>
                  <div class="pull-right lab-item-ctrl">
                    <a class="btn btn-default" href="javascript:void(0);" @click="onClickDownloadVideo(section.fileId)">下载视频</a>
                    <a class="btn btn-primary" href="javascript:void(0);" @click="onClickPlayVideo(section.video)">点击播放</a>
                  </div>
                </div>
           </div>


              </div>
              <div role="tabpanel" class="tab-pane course-comment" id="comments">
                <div class="comment-box">
                  <div class="comment-form">

                    <div class="comment-form-unlogin">
                      请
                      <a href="#sign-modal" data-toggle="modal" data-sign="signin" data-next="/courses/1"> 登录 </a>
                      后发表评论
                    </div>

                  </div>
                  <div class="comment-title">最新评论</div>
                  <div class="comment-list">
                  </div>
                  <div class="pagination-container"></div>
                </div>
              </div>
              <div role="tabpanel" class="tab-pane" id="reports">
                <span class="lab-id active" data-lab-id="None">全部</span>

                <span class="lab-id" data-lab-id="1">第1节</span>

                <span class="lab-id" data-lab-id="2">第2节</span>

                <span class="lab-id" data-lab-id="3">第3节</span>

                <span class="lab-id" data-lab-id="59">第4节</span>

                <span class="lab-id" data-lab-id="60">第5节</span>

                <span class="lab-id" data-lab-id="61">第6节</span>

                <span class="lab-id" data-lab-id="62">第7节</span>

                <span class="lab-id" data-lab-id="1917">第8节</span>

                <span class="lab-id" data-lab-id="1918">第9节</span>

                <span class="lab-id" data-lab-id="63">第10节</span>

                <span class="lab-id" data-lab-id="337">第11节</span>

                <span class="lab-id" data-lab-id="346">第12节</span>

                <span class="lab-id" data-lab-id="354">第13节</span>

                <span class="lab-id" data-lab-id="356">第14节</span>

                <span class="lab-id" data-lab-id="1943">第15节</span>

                <span class="lab-id" data-lab-id="1944">第16节</span>

                <span class="lab-id" data-lab-id="1945">第17节</span>

                <div class="report-owner">
                  <span class="owner-list" data-user-id="">我的报告</span> / <span class="owner-list active" data-user-id="None">所有报告</span>
                </div>
                <div class="row report-items"></div>
                <div class="pagination-container"></div>
              </div>
              <div role="tabpanel" class="tab-pane" id="questions">
                <a class="btn btn-success" data-toggle="modal" data-target="#askquestion">我要提问</a>
                <hr>
                <ul class="row question-items"></ul>
                <div class="pagination-container"></div>
              </div>
            </div>
          </div>

        </div>

        <div class="col-md-3 layout-side">

          <!-- 课程封面 -->
          <div class="side-image side-image-pc">
            <img :src="course.imageUrl">
          </div>





          <div class="sidebox mooc-teacher">
            <div class="sidebox-header mooc-header">
              <h4 class="sidebox-title">课程教师</h4>
            </div>
            <div class="sidebox-body mooc-content">
              <a href="/user/20406" target="_blank">
                <img :src="teacher.imageUrl">
              </a>
              <div class="mooc-info">
                <div class="name"><strong>{{teacher.name}}</strong> </div>

                <div class="courses">共发布过<strong>18</strong>门课程</div>
              </div>
              <div class="mooc-extra-info">
                <div class="word long-paragraph">
                  资深程序员，5年Linux运维、企业级开发经验及数据库实战和教学经验。
                </div>
              </div>
            </div>
            <div class="sidebox-footer mooc-footer">
              <a :href="'/users/' + teacher.id" target="_blank">查看老师的所有课程 ></a>
            </div>
          </div>




          <div class="side-image">
            <a href="/vip" target="_blank">
              <img src="../../../public/img/banner-vip.png">
            </a>
          </div>





          <div class="sidebox adv-course">
            <div class="sidebox-header">
              <h4 class="sidebox-title">进阶课程</h4>
            </div>
            <div class="sideobx-body course-content">

              <a href="/courses/204">实用Linux Shell编程</a>

              <a href="/courses/2">Vim编辑器</a>

              <a href="/courses/68">Linux命令实例练习</a>

            </div>
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
              <input name="_csrf_token" type=hidden value="1483794941##be4fb68b276c5f7cb970936cb25985cd53b943d1">
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
<!--            <a type="button" class="submit-question btn btn-primary"
               href="/vip" target="_blank" style="background:#FFFFFF;color:#00CC99;border:none;
               float:left;padding-left:0;"><img src="../../../public/img/senior-vip-icon.png" alt="">
              加入高级会员获得助教答疑</a>-->
            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
            <button type="button" class="submit-question btn btn-primary" data-dismiss="modal">提交</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="start-newlab">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h3>开始新实验</h3>
          </div>
          <div class="modal-body" style="text-align:center">
            <p> 一个实验正在进行，是否停止它，开始新实验？</p>

          </div>
          <div class="modal-footer" style="margin-top:0px">

            <button class="btn" data-dismiss="modal" aria-hidden="true">关闭</button>
            <a class="btn btn-primary start-newlab-confirm">确定</a>

          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div>
    <div class="modal fade" id="start-evaluation-course">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h3>开始评估课实验</h3>
          </div>
          <div class="modal-body">
            <div>
              <p>为了让评估结果更加准确，请注意以下操作：</p>
              <ul>
                <li>完成实验后点击「停止实验」按钮</li>
                <li>将代码提交到代码库</li>
                <li>尽可能详尽的撰写实验报告</li>
                <li>尽可能在实验操作的关键步骤截图</li>
                <li>尽可能减少无用操作</li>
                <li>尽可能高效的利用内存/CPU资源</li>
              </ul>
              <p>评估课还在不断完善中，我们真挚希望你能通过我们提供的这个平台，找到更好的发展机会。</p>
            </div>
            <br>
            <div class="start-newlab"></div>
          </div>
          <div class="modal-footer">
            <button class="btn" data-dismiss="modal" aria-hidden="true">关闭</button>
            <a class="btn btn-primary start-confirm">确定</a>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div>
    <div class="modal fade" id="vip-startlab-modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h3>开始实验</h3>
          </div>
          <div class="modal-body">
            <div class="start-newlab"></div>
            <br>
            <div class="text-center vip-vm">
              <a class="btn btn-default btn-lg newvm">创建新环境</a>

            </div>
            <br>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div>
    <div class="modal fade" id="bean-course-modal" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
            <h4 class="modal-title">激活项目课：Linux 基础入门（新版）</h4>
          </div>
          <div class="modal-body">
            <div style="font-size:14px; font-weight:think;">
              要在实验楼愉快地学习，先要熟练地使用 Linux，本实验介绍 Linux 基本操作，shell 环境下的常用命令。
            </div>
            <div style="margin:36px 0 18px; font-size:16px; font-weight:bold;">
              您有 <span style="color:#f66;"><strong></strong></span> 个实验豆，激活本课程需要消耗 <span style="color:#f66;"><strong>0</strong></span> 个实验豆！
            </div>
            <div style="color:#84B61A; font-size:14px; font-weight:bold;">激活后可不限次数学习本课。<a href="/faq#shiyandou" style="font-weight:normal;" target="_blank">如何获得实验豆？</a></div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>

            <a class="btn btn-primary getshiyandou" href="/faq#shiyandou" target="_blank" data-dismiss="modal">获取实验豆</a>

          </div>
        </div>
      </div>
    </div>


    <div class="modal fade" id="charge-course-modal" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button>
            <h4 class="modal-title">课程报名</h4>
          </div>
          <div class="modal-body">
            <form class="row form-horizontal">
              <input name="_csrf_token" type=hidden value="1483794941##be4fb68b276c5f7cb970936cb25985cd53b943d1">
              <div class="form-group">
                <label class="col-md-2 control-label">邮箱</label>
                <div class="col-md-10">
                  <input type="email" class="form-control" name="email" value="">
                </div>
              </div>
              <div class="form-group">
                <label class="col-md-2 control-label">手机号码</label>
                <div class="col-md-10">
                  <div class="input-group">
                    <input type="text" class="form-control" name="phone_no">
                    <span class="input-group-btn">
                                    <button class="btn btn-default charge-course-phone-code" type="button" style="padding:7px 12px;">获取验证码</button>
                                </span>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label class="col-md-2 control-label">验证码</label>
                <div class="col-md-10">
                  <input type="text" class="form-control" name="verify_code">
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary charge-course-confirm">确定</button>
          </div>
        </div>
      </div>
    </div>



    <div class="modal fade" id="paid-modal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" style="text-align:center;">支付确认</h4>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-6">
                <button class="btn btn-primary paid-confirm" type="button">支付成功</button>
              </div>
              <div class="col-md-6">
                <button class="btn btn-primary paid-method" type="button" style="background:none; color:#0c9">选择支付方式</button>
              </div>
            </div>
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
         data-userlab-id=""
         data-course-id="1"
         data-is-authenticated="false"
         data-user-joined="false"
         data-user-logined="false"
         data-show-student-info-modal="false"
         data-login-url="/login?next=%2Fcourses%2F1"
         data-start-newlab-url="/courses/clear"

         data-faq="/faq"
         data-comment-post="/courses/1/comments"
         data-loginurl="/login?next=%2Fcourses%2F1"
         data-site-type="0"
         data-report-post="/courses/1/reports"
         data-recomment-img="../../../public/img/recommentReport.png"
         data-charge-course-phone-code="/user/sms/code"
         data-join-private-course="/courses/join"
         data-current-user-id=""
         data-vip-icon="../../../public/img/vip-icon.png"
         data-vip-index="/vip"
         data-get-question-url="/courses/1/questions"
         data-real-price = ""

         data-query-bill="/purchase/bill/query"
         data-question-form="/questions/meta"
         data-qiniu-token-url="/api/qiniu/token"
    ></div>
  </div>
</template>

<script>
  export default {
    name: "CourseDetail",
    data() {
      return {
        course: {},
        teacher:{},
        chapterList:[],
        tagList:[],
        isHideVideo:true,
        nowVideoUrl:'',
        queryParam:{
          tagIdList:[],
          matchStr:'',
          pageIndex:1,
          pageSize:15
        },
        pageCount: 1,
        //是否已经收藏该课程，图标显示样式
        isCollection: false
      };
    },
    created() {
        let courseId = this.$route.params.id;
        this.getCourseDetail(courseId);
    },
    methods: {

      /**
       * 点击收藏课程
       */
      onClickCollection(courseId){
        if(this.isCollection){
          this.$message.success('取消收藏');

        }else {
          this.$message.success('收藏成功');
        }
        this.isCollection = !this.isCollection;

      },

      /**
       * 根据课程Id获取课程详情
       * @param courseId
       */
      getCourseDetail(courseId){

        this.$axios.get(this.$requestBaseUrl.core + '/courses/' + courseId)
                .then(resp=>{
                  if(resp.data.success){
                    let courseDetail = resp.data.data;
                    this.course = courseDetail;
                    //课程封面全路径
                    this.course.imageUrl = this.$requestBaseUrl.core + courseDetail.image;
                    //课程的教师
                    this.teacher = courseDetail.teacher;
                    this.teacher.imageUrl = this.$requestBaseUrl.core + this.teacher.image;
                    //章节列表
                    this.chapterList = courseDetail.chapterList;

                  }else {
                    this.$message.warning('获取课程详情失败，请刷新看看');
                  }
                }).catch(error=>this.$message.error('获取课程详情失败，服务器异常'));

      },
      /**
       * 点击播放视频按钮触发
       * @param videoUrl
       */
      onClickPlayVideo(videoUrl){
        //显示视频播放器
        this.isHideVideo = false;
        //设置对应播放地址
        this.nowVideoUrl = this.$requestBaseUrl.file + videoUrl;
      },

      onClickDownloadVideo(fileId){
        window.location.href = this.$requestBaseUrl.file + "/fileManage/download/" + fileId;
      }

    }
  }
</script>

<style scoped>

</style>