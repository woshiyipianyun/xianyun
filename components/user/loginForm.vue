<template>
  <el-form :model="form" ref="form" :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input placeholder="用户名/手机" v-model="form.username"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input placeholder="密码" type="password" v-model="form.password"></el-input>
    </el-form-item>

    <p class="form-text">
      <nuxt-link to="#">忘记密码</nuxt-link>
    </p>

    <el-button class="submit" type="primary" @click="handleLoginSubmit">登录</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      // 表单数据双向绑定
      form: {
        //用户名和密码
        username: "",
        password: ""
      },
      // 表单验证规则
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    // 提交登录
    handleLoginSubmit() {
      //validate是一个验证方法
      this.$refs.form.validate(res => {
        if (res) {
          //提交登陆接口
          this.$axios({
            //请求路径
            url: "/accounts/login",
            //请求方式
            method: "post",
            // 传递数据
            data: this.form
          }).then(res1 => {
            //   motations的方法都必须用commit来调用
            //第一个参数是调用的是路径加方法名
            //第二个参数是传递的数据
            this.$store.commit("user/setUserInfo", res1.data);
            //跳转登陆到首页
            this.$router.push("/");
          });
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.form {
  height: 350px;
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>