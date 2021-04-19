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

                        <li class="">
                            <a href="javascript:void(0);" @click="toSearchCourse">搜索课程</a>
                        </li>
                        <li class="dropdown"  v-if="userIsLogin">
                            <a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown">
                                个人信息
                                <span class="caret"></span>
                            </a>
                            <ul class="dropdown-menu">
                                <li><a class="active" href="javascript:void(0);"  @click.prevent="handleUpdate" >修改基本信息</a></li>
                                <li><a class="" href="javascript:void(0);" @click="handleClickUpdatePassword" >修改密码</a></li>
                            </ul>
                        </li>

                    </ul>

                    <!-- 登录、注册、退出登录按钮-->
                    <div class="navbar-right btns" v-if="!userIsLogin">
                        <a class="btn btn-default navbar-btn sign-in" data-sign="signin" href="#sign-modal" data-toggle="modal">登录</a>
                        <a class="btn btn-default navbar-btn sign-up" data-sign="signup" href="#sign-modal" data-toggle="modal">注册</a>
                    </div>
                    <div class="navbar-right btns" v-if="userIsLogin">
                        <a class="btn btn-default navbar-btn sign-up" data-sign="signup" @click.prevent="loginOut">退出</a>
                        <a href="javascript:void(0);"  @click.prevent="handleUpdate">修改个人信息</a>
                    </div>


<!--                    <form class="navbar-form navbar-right" action="search" method="get" role="search">
                        <div class="form-group btns">
                            <input type="text" class="form-control" name="search" autocomplete="off" placeholder="搜索课程">
                            <a class="btn btn-default" data-sign="signup" href="javascript:void(0)" @click="toSearchCourse" data-toggle="modal">搜索</a>
                        </div>
                    </form>-->
                </div>
            </div>
        </nav>

        <!-- 【修改】 弹出框   -->
        <!-- Form个人信息修改 -->
        <el-dialog title="个人信息修改" :visible.sync="dialogFormVisible">
            <!--头像上传-->
            <el-form ref="userInfo" :model="userInfo" label-width="70px">
                <el-form-item label="用户头像">
                   <!-- <img :src="userInfo.imageUrl" width="25%" height="100px"/>-->
                    <!--网站logo -->
                    <div class="modify_photo">
                        <div class="upload-frame">
                            <!-- 上传图片弹框 -->
                            <el-upload v-loading="faviconLoading"
                                       element-loading-custom-class="loading_color"
                                       element-loading-spinner="el-icon-loading"
                                       ref="faviconUpload"
                                       class="avatar-uploader"
                                       action="uploadUrl"
                                       accept=".jpg,.jpeg,.png,.JPG,.JPEG"
                                       :show-file-list="false"
                                       :before-upload="beforeAvatarUploadImage"
                                       :limit="1"
                                       :http-request="newWebUrl">
                                <div class="upload_again"
                                     v-show="!faviconLoading">
                                    <span>重新上传</span>
                                </div>
                                <img v-if="avatarPath"
                                     :src="avatarPath"
                                     class="avatar" />
                                <i class="el-icon-camera-solid avatar-uploader-icon"
                                   v-else></i>
                                <div slot="tip" class="el-upload__tip">
                                    <i class="el-icon-warning-outline"></i>
                                    只能上传jpg/png文件，且不超过<span style="color:#F56262">5M</span>
                                </div>
                            </el-upload>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="用户昵称">
                    <el-input v-model="userInfo.name"></el-input>
                </el-form-item>
                <el-form-item label="登录账号">
                    <el-input v-model="userInfo.account" disabled></el-input>
                </el-form-item>
                <el-form-item label="简介">
                    <el-input
                      type="textarea"
                      :autosize="{ minRows: 3, maxRows: 6}"
                      placeholder="请输入内容"
                      v-model="userInfo.motto">
                    </el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="save">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 修改密码 弹出框1   -->
        <el-dialog title="修改密码" :visible.sync="updatePasswordVisible" width="40%">
            <el-form ref="chapter" :model="passwordForm" label-width="70px">
                <el-form-item label="原密码">
                    <el-input v-model="passwordForm.oldPassword" type="password"></el-input>
                </el-form-item>
                <el-form-item label="新密码">
                    <el-input v-model="passwordForm.newPassword" type="password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码">
                    <el-input v-model="passwordForm.confirmPassword" type="password"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="updatePasswordVisible = false">取 消</el-button>
                <el-button type="primary"  @click="updatePassword">确 定</el-button>
            </span>
        </el-dialog>


        <!-- body -->
        <router-view></router-view>

        <!-- footer-->
        <div class="footer">
            <div class="container">
                <div class="row">
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
    import { encrypt } from '@/utils/rsaEncrypt'
    export default {
        name: "Home",
        data() {
            return {
                userIsLogin:false,
                //个人信息修改框是否显示
                dialogFormVisible:false,
                userInfo:{},
                faviconLoading: false,
                //头像路径
                avatarPath:null,
                //修改参数密码
                passwordForm:{
                    oldPassword: null,
                    newPassword: null,
                    confirmPassword: null
                },
                //修改密码弹出框
                updatePasswordVisible: false,
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
            /**
             * 前往搜索课程页
             */
            toSearchCourse(){
                this.$router.push('/search');
            },

            /**
             * 点击修改个人信息
             */
          handleUpdate(){
             this.dialogFormVisible = true;
              this.$axios.get(this.$requestBaseUrl.core + '/admin/moocUsers/getOwnDetail')
                .then(resp=>{
                    if(resp.data.success){
                        this.userInfo = resp.data.data;
                        this.userInfo.imageUrl = this.$requestBaseUrl.core + this.userInfo.userImage;
                        this.avatarPath = this.userInfo.imageUrl;
                    }else {
                        this.$message.warning('获取个人信息失败')
                    }
                }).catch(err=>{
                  this.$message.error('获取个人信息失败')
              })
            },
            /**
             * 保存用户信息
             */
            save(){
                this.dialogFormVisible = true;
                this.$axios.post(this.$requestBaseUrl.core + '/admin/moocUsers/update',this.userInfo)
                  .then(resp=>{
                      if(resp.data.success){
                          this.$message.success('保存信息成功');
                          this.dialogFormVisible = false;
                      }else {
                          this.$message.warning('保存信息失败')
                      }
                  }).catch(err=>{
                    this.$message.error('保存信息失败')
                })
            },

            /**
             * 上传文件前校验
             */
            beforeAvatarUploadImage(file) {
                this.type = 3
                const isLt5M = file.size / 1024 / 1024 < 5
                const isType = file.type === 'image/jpeg' || file.type === 'image/png'
                if (!isType) {
                    this.$message.warning('请上传jpg/png类型的图片!');
                    return false
                }
                if (!isLt5M) {
                    this.$message.warning('上传图片大小不能超过 5M!');
                    return false
                }

                return new Promise((resolve, reject) => {
                    let uploadUrl = URL.createObjectURL(file)
                    let newImg = new Image()
                    newImg.src = uploadUrl
                    newImg.onload = () => {
                        if (newImg.width > 3000 || newImg.height > 3000) {
                            this.$message.warning('上传图片宽高不能超过3000px');
                            reject(new Error());
                        }
                        resolve();
                    }
                })
            },

            newWebUrl(item) {
                // 获取上传文件信息
                let fileObj = item.file
                // 控制loading图标的显示隐藏

                // 请求接口参数
                const form = new FormData(); // FormData 对象
                form.append('file', fileObj);
                this.$axios.post(this.$requestBaseUrl.file + '/image/upload',form)
                  .then((res) => {
                      if (res.data.success) {
                            let path = res.data.data
                            this.avatarPath = this.$requestBaseUrl.file + path + '?time=' + new Date().getTime();
                            this.userInfo.userImage = path;
                      } else {
                          this.$message.warning('上传图片失败');
                      }
                  }).catch((error) => {
                    console.log(error);
                    this.$message.error('上传logo图片发生异常!')
                });
            },

            /**
             * 点击更新密码按钮触发
             */
            handleClickUpdatePassword(){
                this.updatePasswordVisible = true;
            },

            /**
             * 更新密码
             */
            updatePassword(){

                if(!this.passwordForm.oldPassword){
                    this.$message.warning('旧密码不能为空');
                    return;
                }
                if(!this.passwordForm.newPassword){
                    this.$message.warning('新密码不能为空');
                    return;
                }
                if(!this.passwordForm.confirmPassword){
                    this.$message.warning('确认密码不能为空');
                    return;
                }
                if(this.passwordForm.confirmPassword != this.passwordForm.newPassword){
                    this.$message.warning('确认密码不一致');
                    return;
                }
                let updateForm = {};
                //加密
                updateForm.oldPassword = encrypt(this.passwordForm.oldPassword);
                updateForm.newPassword = encrypt(this.passwordForm.newPassword);
                updateForm.confirmPassword = encrypt(this.passwordForm.confirmPassword);

                this.$axios.post(this.$requestBaseUrl.authorize + '/manager/updatePassword',updateForm)
                  .then(resp=>{
                      if(resp.data.success){
                          this.$message.success('修改密码成功');
                          this.updatePasswordVisible = false;
                      }else {
                          this.$message.warning(resp.data.msg);
                      }
                  }).catch(err=>{
                    this.$message.error('修改密码失败');
                })
            },


        }
    }
</script>

<style scoped>
    .personalizedSet_view {
        position: relative;
        width: 100%;
        height: 100%;
        background: #f5f5f5;
        overflow-y: auto;
    }
    .personalizedSet_header {

        margin: 15px auto 20px auto;
        background-color: #f5f5f5;
        width: 801px;
        color: #333333;
        padding-left: 10px;
        font-size: 16px;
        font-weight: 600;
    }

    .personalizedSet_cotent {
        position: relative;
        padding-left: 32px;
        margin: 0 auto;
        width: 801px;
        height: 700px;
        background: #ffffff;
        border-radius: 6px;
    }
    .modify_name {
        padding-top: 37px;
    }
    .dy-input input {
        width: 300px;
    }

    .modify_title {
        display: inline-block;
        width: 82px;
        color: #666666;
    }

    .modify_photo {
        margin-top: 20px;
    }
    .el-upload__tip {
        margin-top: 0px;
        color: #999;
        width: 220px;
    }

    .modify_title {
        float: left;
        width: 87px;
        color: #666666;
    }

    .upload-frame {
        display: flex;
        justify-content: flex-start;
    }
    .loading_color {
        width: 100px;
        height: 100px;
        border-radius: 2px;
        background-color: rgba(0, 0, 0, 0.555);
    }
    .avatar-uploader .el-upload {
        position: relative;
        border: 1px dashed #d9d9d9;
        border-radius: 2px;
        cursor: pointer;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409eff;
    }

    .avatar-uploader-icon {
        font-size: 36px;
        color: #cacaca;
        width: 100px;
        height: 100px;
        line-height: 100px;
        text-align: center;
    }

    .upload_again {
        position: absolute;
        bottom: 0;
        width: 100px;
        height: 25px;
    }

    .avatar {
        width: 100px;
        height: 100px;
        display: block;
        border-radius: 2px;
    }

    .footer_btn {
        position: absolute;
        left: 0;
        width: 801px;
        height: 72px;
        margin: 0 auto;
        bottom: 0;
        border-top: 1px solid #dddddd;
        background-color: #ffffff;
    }


    /deep/ .el-upload--text{
        width: 100px;
        height: 100px;
    }


    .dy-btn-primary {
        margin-top: 20px;
        width: 80px;
        height: 32px;
    }

    .btn-cancel {
        width: 80px;
        height: 32px;
        color: #000000;
    }

    .save_upload {
        margin: 20px 6px 0px 112px;
        text-align: center;
    }
</style>