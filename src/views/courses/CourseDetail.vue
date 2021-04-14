<template>
  <div>
    <div class="container layout layout-margin-top">

      <!-- 面包屑 -->
      <ol class="breadcrumb">
        <li><a href="/courses">全部课程</a></li>
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
                <i class="fa fa-star" data-next="/login?next=%2Fcourses%2F1" @click="onClickCollection(course.id)"
                   v-if="isCollection"></i>
                <i class="fa fa-star-o" data-next="/login?next=%2Fcourses%2F1" @click="onClickCollection(course.id)"
                   v-else></i>
              </div>
            </div>
            <div class="clearfix course-infobox-body">
              <div class="course-infobox-content">
                <p>{{course.summary}}</p>
              </div>

              <!-- 学习进度条 -->
              <div class="course-infobox-progress">
                <div class="course-progress-new" v-for="index in chapterList.length" :key="index"></div>
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
              <div class="pull-right course-infobox-follow">
                <span class="course-infobox-followers">{{course.collectionNum}}</span>
                <span>人收藏</span>
                <i class="fa fa-star" data-next="/login?next=%2Fcourses%2F1" @click="onClickCollection(course.id)"
                   v-if="isCollection"></i>
                <i class="fa fa-star-o" data-next="/login?next=%2Fcourses%2F1" @click="onClickCollection(course.id)"
                   v-else></i>
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
                <a href="#comments" @click="getCommentList(url,0)" class="stat-event" aria-controls="comments" role="tab"
                   data-stat="course_comment" data-toggle="tab">课程评论({{commentNumber}})</a>
              </li>

              <!--
                           <li role="presentation">
                              <a href="#reports" class="stat-event" data-stat="course_report" aria-controls="reports" role="tab" data-toggle="tab">实验报告(3417)</a>
                            </li>
              -->

              <li role="presentation">
                <a href="#comments" @click="getCommentList(url,1)" class="stat-event" data-stat="course_question" aria-controls="questions" role="tab"
                   data-toggle="tab">课程问答({{questionNumber}})</a>
              </li>
            </ul>
            <div class="tab-content">

              <div role="tabpanel" class="tab-pane active" id="labs">


                <!-- 大章列表 chapterList -->
                <div v-for="(chapter,chapterIndex) in chapterList" :key="chapter.id">

                  <div class="lab-item ">
                    <div class="lab-item-index"><span>第{{chapterIndex + 1}}章</span></div>
                    <div class="lab-item-title" data-toggle="tooltip" data-placement="bottom" :title="chapter.name">
                      {{chapter.name}}
                    </div>
                    <div class="pull-right lab-item-ctrl">
                    </div>
                  </div>
                  <!-- 小节列表 sectionList -->
                  <div class="lab-item" :style="selectedSection == section.id ? 'background: #434343' : ''"
                       v-for="(section,sectionIndex) in chapter.sectionList" :key="section.id">
                    <div class="lab-item-status">
                      <img src="../../../public/img/lab-not-ok.png">
                    </div>
                    <div class="lab-item-index">第{{chapterIndex + 1}}-{{sectionIndex + 1}}节</div>
                    <div class="lab-item-title" data-toggle="tooltip" data-placement="bottom" :title="section.title">
                      {{section.title}}
                    </div>
                    <div class="pull-right lab-item-ctrl">
                      <a class="btn btn-default" href="javascript:void(0);"
                         @click="onClickDownloadVideo(section.fileId)">下载视频</a>
                      <a class="btn btn-primary" href="javascript:void(0);"
                         @click="onClickPlayVideo(section.id,section.video)">点击播放</a>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 课程评论   -->
              <div role="tabpanel" class="tab-pane course-comment" id="comments">
                <div class="comment-box">
                  <div class="comment-form">


                    <div class="comment">
                      <p>
      <textarea
        name
        id
        cols="30"
        rows="10"
        placeholder="想说点什么.."
        v-model="reply.content"
        maxlength="1000"
        ref="content"
      ></textarea>
                      </p>
                      <p class="comment-handle">
                        <span>你还能输入{{num}}字</span>
                        <el-button type="info" class="cancel" ref="cancel" @click="defaultReply">取消回复</el-button>
                        <el-button type="primary" @click="toComment">发表评论</el-button>
                      </p>
                      <div class="comment-list">
                        <ul>
                          <li class="clearfix" v-for="(item,index) in commentList" :key="item.commentId">
                            <div class="msg">
                              <a href="javascript:void(0);" @click="toUserDetail(item.userId)">
                                <img :src="requestBaseUrl + item.userImage" alt/>
                                <span class="name">{{item.userName}}</span>
                              </a>
                              <span class="time">{{item.createTime | format}}</span>
                            </div>
                            <div class="handle">
            <span>
              <a href="#" @click.prevent="show(index)">查看回复( {{item.replyList.length}})</a>
              <a href="#" @click.prevent="replyed(item.commentId, '', item.userId, item.userName)">回复</a>
              <a
                href="#"
                :class="{'active': item.star}"
                @click.prevent="bigParise(item.commentId,index)"
              >
                <i class="glyphicon glyphicon-thumbs-up"></i>
                &nbsp; {{item.commentStar}}
              </a>
            </span>
                            </div>
                            <div class="content">
                              <p>{{item.commentContent}}</p>
                            </div>
                            <div class="watch" ref="minComment">
                              <ul>
                                <li class="clearfix" v-for="(minItem,i) in item.replyList" :key="minItem.replyId">
                                  <div class="msg">
                                    <img :src="requestBaseUrl + minItem.replyerImage" alt/>
                                    <span class="name">
                                  {{minItem.replyerName}}&nbsp;&nbsp;&nbsp;
                                      <div style="display:inline;" v-if="minItem.parentId != 0"> <span>回复</span> {{minItem.toUserName}}
                                      </div></span>
                                    <span class="time">{{minItem.createTime | format}}</span>
                                  </div>
                                  <div class="handle">
                  <span>
                    <a href="#" @click.prevent="replyed(item.commentId,minItem.replyId,minItem.userId, minItem.replyerName)">回复</a>
                    <a
                      href="#"
                      @click.prevent="minParise(minItem.replyId,index,i)"
                      :class="{'active': minItem.star}"
                    >
                      <i class="glyphicon glyphicon-thumbs-up"></i>
                      &nbsp;{{minItem.replyStar}}
                    </a>
                  </span>
                                  </div>
                                  <div class="content">
                                    <p>{{minItem.replyContent}}</p>
                                  </div>
                                </li>
                                <li v-if="item.replyList.length === 0" style="color:#409eff">无相关回复！</li>
                              </ul>
                            </div>
                          </li>
                          <li v-if="commentList.length === 0" style="color:#409eff">无相关评论！</li>
                        </ul>
                      </div>
                      <div class="getmore">
                        <el-pagination
                          background
                          layout="prev, pager, next"
                          :total="total"

                          :current-page="pageIndex"
                          @next-click="getNext"
                          @prev-click="getPre"
                          @current-change="pageSkip"
                        ></el-pagination>
                      </div>
                    </div>
                    <!--
                                        <div class="comment-form-unlogin">
                                          请
                                          <a href="#sign-modal" data-toggle="modal" data-sign="signin" data-next="/courses/1"> 登录 </a>
                                          后发表评论
                                        </div>
                    -->

                    <router-view/>

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
                  <span class="owner-list" data-user-id="">我的报告</span> / <span class="owner-list active"
                                                                               data-user-id="None">所有报告</span>
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
              <a :href="'/users/' + teacher.id" target="_blank">
                <img :src="teacher.imageUrl">
              </a>
              <div class="mooc-info">
                <div class="name"><strong>{{teacher.name}}</strong></div>

                <div class="courses">共发布过<strong>18</strong>门课程</div>
              </div>
              <div class="mooc-extra-info">
                <div class="word long-paragraph">
                  {{teacher.motto ? teacher.motto : '该教师什么也没写..'}}
                </div>
              </div>
            </div>
            <div class="sidebox-footer mooc-footer">
              <a :href="'/users/' + teacher.id" target="_blank">查看老师的所有课程 ></a>
            </div>
          </div>


          <!--          <div class="side-image">
                      <a href="/vip" target="_blank">
                        <img src="../../../public/img/banner-vip.png">
                      </a>
                    </div>-->


          <div class="sidebox adv-course">
            <div class="sidebox-header">
              <h4 class="sidebox-title">推荐课程</h4>
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
                          <a style="font-size:12px; color:#666; text-decoration:underline;" href="/questions/764"
                             target="_blank">
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
              <div class="form-group">
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
            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
              class="sr-only">Close</span></button>
            <h4 class="modal-title">激活项目课：Linux 基础入门（新版）</h4>
          </div>
          <div class="modal-body">
            <div style="font-size:14px; font-weight:think;">
              要在实验楼愉快地学习，先要熟练地使用 Linux，本实验介绍 Linux 基本操作，shell 环境下的常用命令。
            </div>
            <div style="margin:36px 0 18px; font-size:16px; font-weight:bold;">
              您有 <span style="color:#f66;"><strong></strong></span> 个实验豆，激活本课程需要消耗 <span
              style="color:#f66;"><strong>0</strong></span> 个实验豆！
            </div>
            <div style="color:#84B61A; font-size:14px; font-weight:bold;">激活后可不限次数学习本课。<a href="/faq#shiyandou"
                                                                                          style="font-weight:normal;"
                                                                                          target="_blank">如何获得实验豆？</a>
            </div>
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
                                    <button class="btn btn-default charge-course-phone-code" type="button"
                                            style="padding:7px 12px;">获取验证码</button>
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
                <button class="btn btn-primary paid-method" type="button" style="background:none; color:#0c9">选择支付方式
                </button>
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
         data-real-price=""

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
        //当前选择的章节
        selectedSection: 1,
        course: {},
        teacher: {},
        chapterList: [],
        tagList: [],
        isHideVideo: true,
        nowVideoUrl: '',
        queryParam: {
          tagIdList: [],
          matchStr: '',
          pageIndex: 1,
          pageSize: 15
        },
        pageCount: 1,
        //是否已经收藏该课程，图标显示样式
        isCollection: false,

        //======================
        // 评论消息
        commentList: [],
        reply: {
          courseId: '',
          replyId: '',
          commentId: '',
          userId: '',
          toUserId: '',
          content: '',
          type: 0
        },
        // 页号
        pageIndex: 1,
        // 页数
        total: 1,
        // 获取评论url
        url: this.$requestBaseUrl.core + '/comment/list',
        requestBaseUrl: this.$requestBaseUrl.core,
        //评论数，提问数
        commentNumber: 0,
        questionNumber: 0,
      };
    },
    created() {
      //1、获取课程详情
      let courseId = this.$route.params.id;
      this.getCourseDetail(courseId);
      //拼接获取rl
      this.url = this.url + '?courseId=' + courseId;
      //获取评论
      //this.getCommentList(this.url);
      //初始回复信息
      this.reply.courseId = courseId;
      this.reply.userId = localStorage.getItem('user-id');
    },
    methods: {

      /**
       * 点击收藏课程
       */
      onClickCollection(courseId) {
        this.$axios.put(this.$requestBaseUrl.core + '/courses/collectionOrCancel/' + courseId)
          .then(resp => {
            if (resp.data.success) {
              if (this.isCollection) {
                this.$message.success('取消收藏');
                //收藏数减一
                this.course.collectionNum--;
              } else {
                this.$message.success('收藏成功');
                //收藏数加一
                this.course.collectionNum++;
              }
              this.isCollection = !this.isCollection;
            } else {
              this.$message.warning('操作失败!')
            }
          }).catch(error => this.$message.error('收藏/取消收藏失败，服务器异常'));

      },

      /**
       * 根据课程Id获取课程详情
       * @param courseId
       */
      getCourseDetail(courseId) {

        this.$axios.get(this.$requestBaseUrl.core + '/courses/' + courseId)
          .then(resp => {
            if (resp.data.success) {
              let courseDetail = resp.data.data;
              this.course = courseDetail;
              //课程封面全路径
              this.course.imageUrl = this.$requestBaseUrl.file + courseDetail.image;
              //课程的教师
              this.teacher = courseDetail.teacher;
              this.teacher.imageUrl = this.$requestBaseUrl.core + this.teacher.userImage;
              //章节列表
              this.chapterList = courseDetail.chapterList;
              //课程评论数、提问数
              this.commentNumber = this.course.commentNum;
              this.questionNumber = this.course.questionNum;

              //2、若localStorage有记录，则播放之前视频
              let sectionId = localStorage.getItem('course-' + courseId);
              if (sectionId) {
                //找出对应章节的视频Url
                this.chapterList.forEach(chapter => {
                  if (chapter.sectionList) {
                    chapter.sectionList.forEach(section => {
                      //播放当前小节视频
                      if (sectionId == section.id) this.onClickPlayVideo(sectionId, section.video)
                    });
                  }
                })

              }

            } else {
              this.$message.warning('获取课程详情失败，请刷新看看');
            }
          }).catch(error => this.$message.error('获取课程详情失败，服务器异常'));

      },
      /**
       * 点击播放视频按钮触发
       * @param videoUrl
       */
      onClickPlayVideo(sectionId, videoUrl) {

        //当前选择的小节
        this.selectedSection = sectionId;
        //记录当前播放到localStorage
        let courseId = this.$route.params.id;
        localStorage.setItem('course-' + courseId, sectionId);

        //显示视频播放器
        this.isHideVideo = false;
        //设置对应播放地址
        this.nowVideoUrl = this.$requestBaseUrl.file + videoUrl;
      },

      onClickDownloadVideo(fileId) {
        window.location.href = this.$requestBaseUrl.file + "/fileManage/download/" + fileId;
      },

      //==================================================================

      // 控制展示评论中的评论
      show(i) {
        this.commentList[i].showFlag = !this.commentList[i].showFlag
        if (this.commentList[i].showFlag) {
          this.$refs.minComment[i].style.display = 'block'
        } else {
          this.$refs.minComment[i].style.display = 'none'
        }
      },
      // 封装点赞代码
      parise(target, data) {
        this.axios.post('/star', data)
          .then(res => {
            if (res.data.success) {
              if (target.star === false) {
                target.commentStar++
                target.replyStar++
                target.star = true
              } else {
                target.commentStar--
                target.replyStar--
                target.star = false
              }
            } else {
              this.$message.error('点赞失败,请重新点赞')
            }
          })
          .catch(err => {
            console.log(err)
            this.$message.error('点赞异常,请重新点赞')
          })
      },
      // 评论的点赞
      bigParise(id, i) {
        var formData = new FormData()
        formData.append('userId', window.sessionStorage.getItem('user-id'))
        formData.append('commentId', id)
        // 调用parise方法
        this.parise(this.commentList[i], formData)
      },
      // 评论中的评论的点赞
      minParise(id, index, i) {
        var formData = new FormData()
        formData.append('userId', window.sessionStorage.getItem('user-id'))
        formData.append('replyId', id)
        // 调用parise方法
        this.parise(this.commentList[index].replyList[i], formData)
      },
      // 回复作者
      defaultReply() {
        this.reply.commentId = ''
        this.reply.toUserId = ''
        this.$refs.content.placeholder = '想对作者说点什么'
        document.querySelector('.cancel').style.display = 'none'
      },
      // 回复评论
      replyed(commentId, replyId, userId, name) {
        console.log("userId=" + userId + "name=" + name)
        this.reply.replyId = replyId;
        this.reply.commentId = commentId;
        this.reply.toUserId = userId
        this.$refs.content.placeholder = '回复：' + name
        // this.$refs.cancel.style.display = 'block'
        document.querySelector('.cancel').style.display = 'inline'
      },
      // 评论功能
      toComment() {
        if (this.reply.content.trim().length === 0) {
          this.$message.error('请输入评论内容')
          return
        }
        let formData = new FormData()
        formData.append('courseId', this.reply.courseId)
        formData.append('commentId', this.reply.commentId)
        formData.append('userId', this.reply.userId)
        formData.append('content', this.reply.content)
        formData.append('toUserId', this.reply.toUserId)
        formData.append('replyId', this.reply.replyId)
        formData.append('type', this.reply.type)
        this.$axios.post(this.$requestBaseUrl.core + '/comment/insert', formData)
          .then(res => {
            if (res.data.success) {
              this.$message({
                type: 'success',
                message: '评论成功！'
              })
              this.getCommentList(this.url,this.reply.type)
              this.reply.content = ''
              this.defaultReply()
            } else {
              this.$message.error('评论失败，请重新评论！')
            }
          })
          .catch(err => {
            this.$message.error('评论异常，请重新评论！')
          })
      },
      // 封装点击上、下、跳页部分代码
      getCommentList(url,type) {
         //拼接获取评论url参数，type = 0是课程评论 ，type=1是代码查课程问答
        url = url + '&type=' + type;
        //设置当前类型
        this.reply.type = type;
        //获取评论/问答List
        this.$axios.get(url, {withCredentials: true})
          .then(res => {
            if (res.data.success) {
              if (res.data.data.content.length !== 0) {
                this.commentList = []
                res.data.data.content.forEach(item => {
                  this.commentList.push(item)
                });
                //重新设置准确的评论数和课程问答数
                if(type == 0){
                  this.commentNumber = res.data.data.pageTotal;
                }else {
                  this.questionNumber = res.data.data.pageTotal;
                }
              } else {
                this.$message.error('已经加载到尽头了！')
              }
            } else {
              this.$message.error('获取失败！！')
            }
          })
          .catch(err => {
            console.log(err)
            this.$message.error('未知错误，请重试尝试！')
          })
      },
      // 前往下一页
      getNext() {
        this.pageIndex++
        this.getCommentList(this.url + '&pageIndex=' + this.pageIndex)
      },
      // 上一页
      getPre() {
        this.pageIndex--
        this.getCommentList(this.url + '&pageIndex=' + this.pageIndex)
      },
      // 跳页
      pageSkip(index) {
        this.pageIndex = index
        this.getCommentList(this.url + '&pageIndex=' + this.pageIndex)
      },
      // 获取评论的数据
      getComment() {
        this.$axios.get(this.url)
          .then(res => {
            if (res.data.success) {
              this.total = res.data.data.content.length * res.data.data.totalPages
              this.commentList = res.data.data.content
              this.commentList.forEach(item => {
                item.showFlag = false
              })
            } else {
              this.$message.error('加载评论失败！')
            }
          })
          .catch(err => {
            console.log(err)
            this.$message.error('加载评论失败！')
          })
      },
      toUserDetail(userId) {
        this.$router.push('/users/' + userId)
      }


    },
    computed: {
      // 计算回复框还能输入多少个字
      num() {
        return 1000 - this.reply.content.length
      }
    },


  }
</script>

<style scoped>

</style>


<style scoped lang="less">
  li {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  .active {
    // color: #409eff !important;
  }

  .comment {
    margin-top: 10px;

    h3 {
      color: #409eff;
    }

    p {
      margin-top: 10px;

      textarea {
        width: 100%;
        height: 100px;
        padding: 10px 10px 10px 10px;
        border-radius: 8px;
        border: 1px solid #c1c1c1;
        font-size: 15px;
        resize: none;
        outline: none;
      }

      ::placeholder {
        font-size: 13px;
      }
    }

    .comment-handle {
      text-align: right;

      .cancel {
        display: none;
      }

      span {
        padding-right: 10px;
        font-size: 13px;
        color: #999;
      }
    }

    .comment-list {
      margin-top: 20px;

      li {
        width: 100%;
        padding-bottom: 15px;
        border-bottom: 1px dashed #e0e0e0;

        .msg {
          float: left;

          img {
            width: 24px;
            margin-right: 8px;
            border-radius: 50%;
            vertical-align: bottom;
          }

          .time {
            margin-right: 15px;
            color: #999999;
            font-size: 13px;
          }

          .name {
            margin-right: 15px;
            color: #2e2e2e;
            font-size: 15px;
            font-weight: 700;
          }

          .content {
            font-size: 15px;
          }
        }

        .handle {
          float: right;

          a {
            margin-right: 10px;
            color: #a6a6a6;
            font-size: 15px;
          }

          a:hover {
            color: #409eff;
          }
        }

        .content {
          margin-top: 30px;

          p {
            text-indent: 2em;
          }
        }

        .watch {
          display: none;
          margin-top: 5px;
          margin-left: 40px;
          padding-left: 5px;
          border-left: 4px solid #c5c5c5;

          li {
            border: 0;

            .msg {
              .time {
                color: #999999;
              }

              span {
                color: #2e2e2e;

                span {
                  color: #999999;
                }
              }
            }

            .content {
              margin-top: 25px;
            }
          }
        }
      }
    }

    .getmore {
      float: left;
      width: 830px;
      height: 52px;
      margin-left: -30px;
      padding-top: 15px;
      border-radius: 10px;
      background-color: #fff;
      line-height: 52px;
      font-size: 18px;
      color: #666;
      text-align: center;
      cursor: pointer;
    }
  }
</style>