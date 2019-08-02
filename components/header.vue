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

        <!-- 登录注册 -->
        <div v-if="!$store.state.user.userInfo.token">
          <!-- <router-link to="/"></router-link>     -->
          <nuxt-link to="/user/login">登录注册</nuxt-link>
        </div>
        <!-- 登录之后的布局 -->
        <div v-else>
          <el-dropdown>
            <span class="el-dropdown-link">
              <img src="http://157.122.54.189:9095/assets/images/avatar.jpg" alt />
              银河抽水机
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>

            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item @click.native="handleLogout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-row>
    </div>
  </div>
</template>
 
<script>
export default {
  data() {
    return {};
  },
  methods: {
    //退出的点击事件
    handleLogout() {
      //清除userInfo数据退出
      //调用mutations的方法必须使用commit方法调用
      this.$store.commit("user/clearUserInfo");
    }
  }
};
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
  }
}
.el-dropdown-link {
  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    vertical-align: middle;
    margin-right: 5px;
  }
}
</style>