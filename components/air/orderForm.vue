<template>
  <div class="main">
    <div class="air-column">
      <h2>剩机人</h2>
      <el-form class="member-info">
        <div class="member-info-item" v-for="(item,index) in users" :key="index">
          <el-form-item label="乘机人类型">
            <el-input placeholder="姓名" class="input-with-select" v-model="item.username">
              <!-- <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="成人" value="1"></el-option>
              </el-select>-->
            </el-input>
          </el-form-item>

          <el-form-item label="证件类型">
            <el-input placeholder="证件号码" class="input-with-select" v-model="item.id">
              <!-- <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="身份证" value="1" :checked="true"></el-option>
              </el-select>-->
            </el-input>
          </el-form-item>
          <!-- 删除按钮 -->
          <span class="delete-user" @click="handleDeleteUser(index)">-</span>
        </div>
      </el-form>

      <el-button class="add-member" type="primary" @click="handleAddUsers">添加乘机人</el-button>
    </div>

    <div class="air-column">
      <h2>保险</h2>
      <div>
        <div class="insurance-item" v-for="(item,index) in infoData.insurances" :key="index">
          <el-checkbox
            @change="handleChange(item)"
            :label="`${item.type}：￥${item.price}/份×${users.length}  最高赔付${item.conpensation}`"
            border
          ></el-checkbox>
        </div>
      </div>
    </div>

    <div class="air-column">
      <h2>联系人</h2>
      <div class="contact">
        <el-form label-width="60px">
          <el-form-item label="姓名">
            <el-input v-model="contactName"></el-input>
          </el-form-item>

          <el-form-item label="手机">
            <el-input placeholder="请输入内容" v-model="contactPhone">
              <template slot="append">
                <el-button @click="handleSendCaptcha">发送验证码</el-button>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="验证码">
            <el-input v-model="captcha"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="warning" class="submit" @click="handleSubmit">提交订单</el-button>
      </div>
    </div>
    <!-- 调用allPice让总价开始计算 -->
    <input type="hidden" :value="allPrice" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      //表单数据双向绑定
      users: [
        {
          username: "",
          id: ""
        }
      ], //用户列表，可以新增也可以删除，保存名字和证件号
      insurances: [], //保险id
      contactName: "", //联系人
      contactPhone: "", //联系电话
      captcha: "", //验证码
      invoice: false, //发票

      infoData: {} //机票信息
    };
  },
  mounted() {
    //请求订单机票信息，包含保险数据
    const { id, seat_xid } = this.$route.query;
    this.$axios({
      url: "airs/" + id,
      params: {
        seat_xid
      }
    }).then(res => {
      //获取机票信息
      this.infoData = res.data;

      //把infoData传递给父组件
      this.$emit("setInfoData", this.infoData);
    });
  },
  computed: {
    //computed函数内部引用的实例属性一旦发生变化
    //重复调动，返回新的值
    allPrice() {
      let price = 0;

      // 接口还没返回，默认是0
      if (!this.infoData.seat_infos) {
        return 0;
      }
      // 单价
      price += this.infoData.seat_infos.org_settle_price;
      // 燃油费
      price += this.infoData.airport_tax_audlet;
      //  保险
      price += this.insurances.length * 30;
      // 人数
      price *= this.users.length;
      // 把总价格返回给父组件
      this.$emit("setAllPrice", price);

      return price;
    }
  },
  methods: {
    // 添加乘机人
    handleAddUsers() {
      this.users.push({
        username: "",
        id: ""
      });
    },

    // 移除乘机人
    handleDeleteUser(index) {
      this.users.splice(index, 1);
    },

    //选中保险时触发
    handleChange(item) {
      //判断数组中是否存在id,如果村子就需要删除
      const index = this.insurances.indexOf(item.id);
      if (index > -1) {
        this.insurances.splice(index, 1);
      } else {
        //不存在id就添加
        this.insurances.push(item.id);
      }
    },

    // 发送手机验证码
    handleSendCaptcha() {
      //发送验证码接口请求
      //判断手机号码不能为空
      if (!this.contactPhone) {
        this.$message.warning("请填写手机号码");
        return;
      }
      this.$axios({
        url: "/captchas",
        method: "post",
        data: { tel: this.contactPhone }
      }).then(res => {
        const { code } = res.data;
        this.$alert(`验证码为:${code}`, "验证码信息", {
          type: "warning"
        });
      });
    },

    // 提交订单
    handleSubmit() {
      const data = {
        users: this.users,
        insurances: this.insurances,
        contactName: this.contactName,
        contactPhone: this.contactPhone,
        captcha: this.captcha,
        invoice: this.invoice,
        seat_xid: this.$route.query.seat_xid,
        air: this.$route.query.id
      };
      //判断表单是否通过
      //开关
      let valid = true;
      //判断乘机人
      this.users.forEach(v => {
        //只要一个属性不存在，就不通过
        if (!v.username || !v.id) {
          valid = false;
          this.$alert("乘机人信息不能为空", "提示", { type: "warning" });
        }
      });
      //如果不通过就返回
      if (!valid) {
        return;
      }

      //验证联系人表单
      if (!this.contactName) {
        this.$alert("乘机人信息不能为空", "提示", { type: "warning" });
        return;
      }

      //提交订单
      this.$axios({
        url: "/airorders",
        method: "post",
        data,
        //请求头不是axios的，ajax也有
        headers: {
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        }
      }).then(res => {
        this.$message.success("订单提交成功，正在跳转支付页");
        //为了好的体验，延迟1秒之后跳转
        setTimeout(() => {
          const { id } = res.data.data;
          //跳转到付款页
          this.$router.push({
            path: "/air/pay",
            query: {
              id
            }
          });
        }, 1000);
      });
    }
  }
};
</script>

<style scoped lang="less">
.air-column {
  border-bottom: 1px #ddd dashed;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.air-column h2 {
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: normal;
}

/deep/ .el-select .el-input {
  width: 130px;
}

.input-with-select {
  width: 590px;
}

.input-with-select /deep/ .el-input-group__prepend {
  background-color: #fff;
}
.member-info /deep/ .el-form-item {
  margin-bottom: 0;
}

.member-info-item {
  border-bottom: 1px #eee dashed;
  padding-bottom: 20px;
  position: relative;

  &:first-child {
    .delete-user {
      display: none;
    }
  }
}

.add-member {
  margin-top: 20px;
}

.delete-user {
  display: block;
  background: #ddd;
  width: 16px;
  height: 16px;
  font-size: 14px;
  text-align: center;
  line-height: 16px;
  color: #fff;
  cursor: pointer;
  border-radius: 50px;
  position: absolute;
  right: -30px;
  top: 50%;
}

.insurance {
  > div {
    margin-top: 10px;
  }
}

.insurance-item {
  margin-bottom: 20px;
}

.contact {
  /deep/ .el-input {
    width: 50%;
  }
}

.submit {
  margin: 50px auto;
  display: block;
  width: 250px;
  height: 50px;
}
</style>