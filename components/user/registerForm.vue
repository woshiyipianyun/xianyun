`<template>
  <el-form :model="form" ref="form" :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input placeholder="用户名手机" v-model="form.username"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="captcha">
      <el-input placeholder="验证码" v-model="form.captcha">
        <template slot="append">
          <el-button @click="handleSendCaptcha">发送验证码</el-button>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="nickname">
      <el-input placeholder="昵称" v-model="form.nickname"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input placeholder="密码" type="password" v-model="form.password"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="passwordtwo">
      <el-input placeholder="确认密码" type="password" v-model="form.passwordtwo"></el-input>
    </el-form-item>

    <el-button class="submit" type="primary" @click="handleRegSubmit">注册</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    //确认密码
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if ((value !== this, form.password)) {
        callback(new Error("密码不一致 请再次输入"));
      } else {
        callback();
      }
    };
    return {
      // form表单数据双向绑定数据
      form: {
        username: "", //手机号码
        nickname: "", //昵称
        captcha: "", //手机验证码
        password: "", //密码
        passwordtwo: "" //密码二次验证
      },
      // 表单验证规则
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        passwordtwo: [
          { required: true, message: "请再次输入密码", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 发送验证码点击事件
    handleSendCaptcha() {
      //判断手机号码不能为空
      if (!this.form.username) {
        this.$message.warning("手机号码不能为空");
        return;
      }
      //发送验证码接口请求
      this.$axios({
        url: "/captchas",
        method: "post",
        data: { tel: this.form.username }
      }).then(res => {
        const { code } = res.data;
        this.$alert(`验证码为:${code}`, "验证码信息", {
          type: "warning"
        });
      });
    },

    // 注册的点击事件
    handleRegSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          console.log(valid);
          //ES6语法。解构出特定的属性。剩余的属性可以用...+变量名访问
          const { passwordtwo, ...data } = this.form;
          console.log(data);
          //调用注册接口
          this.$axios({
            url: "/accounts/register",
            method: "post",
            data
          }).then(res => {
            // console.log(res.data);
            //   mutations的方法调用必须用commit来调用
            //第一个参数是调用的路径加方法名
            //第二个参数是需要传递的数据
            this.$store.commit("user/setUserInfo", res.data);
            //跳转到首页
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
</style>`