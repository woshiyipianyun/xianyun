<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <!-- 订单表单 -->
      <OrderForm @setInfoData="setInfoData" @setAllPrice="setAllPrice"></OrderForm>

      <!-- 侧边栏 -->
      <OrderAside :data="infoData" :allPrice="allPrice"></OrderAside>
    </el-row>
  </div>
</template>

<script>
//引入提交表单页
import OrderForm from "@/components/air/orderForm.vue";
//引入提交表单页的侧边栏
import OrderAside from "@/components/air/OrderAside.vue";
export default {
  components: {
    OrderForm,
    OrderAside
  },
  data() {
    return {
      //orderFrom组件会传递过来数据，再传给orderAside
      infoData: {
        // insurances: [], //初始化保险数据
        seat_infos: {}
      },
      //总价格
      allPrice: 0
    };
  },
  methods: {
    //用于接收子组件返回的数据
    setInfoData(data) {
      this.infoData = data;
    },
    //用于接收子组件返回的总价格
    setAllPrice(price) {
      this.allPrice = price;
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 20px auto;
}

/*aside*/
.aside {
  width: 350px;
  height: fit-content;
  border: 1px #ddd solid;
}
</style>