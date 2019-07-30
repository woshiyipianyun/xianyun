<template>
  <div class="header">
    <div class="box">
      <el-row type="flex">
        <!-- logo部分 -->
        <div class="logo">
          <h1>
            <a href="/">
              <img src="../assets/images/logo.jpg" alt />
            </a>
          </h1>
        </div>
        <!-- 头部导航部分 -->
        <el-row type="flex" class="navs">
          <nuxt-link to="/">首页</nuxt-link>
          <nuxt-link to="/post">旅游攻略</nuxt-link>
          <nuxt-link to="/hotel">酒店</nuxt-link>
          <nuxt-link to="/air">国内机票</nuxt-link>
        </el-row>

        <!-- 登陆之后的个人中心 -->
        <div class="message">
          <el-dropdown>
            <span class="el-dropdown-link">
              <i class="el-icon-message-solid"></i>
              消息
              <i class="el-icon-arrow-down"></i>
            </span>
            <!-- 注册登陆 -->
            <span v-show="true">
              <nuxt-link to="/user/login">登陆/注册</nuxt-link>
            </span>
            <!-- 登录之后 -->
            <span v-show="false">
              <nuxt-link to="/">个人中心</nuxt-link>
              <nuxt-link to="/user/login">退出</nuxt-link>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>黄金糕</el-dropdown-item>
              <el-dropdown-item>狮子头</el-dropdown-item>
              <el-dropdown-item>螺蛳粉</el-dropdown-item>
              <el-dropdown-item disabled>双皮奶</el-dropdown-item>
              <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-row>
    </div>
  </div>
</template>
 
<script>
export default {};
</script>
<style lang="less" scoped>
.header {
  height: 60px;
  line-height: 60px;
  border-bottom: 1px solid #ccc;
  box-shadow: 0 3px 3px #eee;
  .box {
    width: 1000px;
    margin: 0 auto;
    .logo {
      img {
        width: 150px;
        height: 40px;
        margin-top: 10px;
      }
    }
    .navs {
      flex: 1;
      margin-left: 20px;
      a {
        display: block;
        padding: 0 20px;
        height: 60px;
        line-height: 60px;
        box-sizing: border-box;
        &:hover {
          background: #409eff;
          color: #fff;
        }
      }
    }
    .nuxt-link-exact-active {
      background: #409eff;
    }
    .message {
      vertical-align: middle;
    }
  }
}
</style>