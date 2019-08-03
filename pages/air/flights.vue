<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <div></div>

        <!-- 航班头部布局 -->
        <FlightsListHead></FlightsListHead>

        <!-- 航班信息 -->
        <FlightsItem v-for="(item,index) in dataList" :key="index" :data="item"></FlightsItem>
        <el-row type="flex" justify="center" style="margin-top:10px;">
          <!-- size-change：切换条数时候触发 -->
          <!-- current-change：选择页数时候触发 -->
          <!-- current-page: 当前页数 -->
          <!-- page-size：当前条数 -->
          <!-- total：总条数 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageIndex"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="flightsData.total"
          ></el-pagination>
        </el-row>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
      </div>
    </el-row>
  </section>
</template>

<script>
//引入时间格式插件
import moment from "moment";
// 引入航班头部布局文件
import FlightsListHead from "@/components/air/flightsListHead.vue";
//引入航班信息布局文件
import FlightsItem from "@/components/air/flightsItem.vue";
export default {
  components: {
    FlightsListHead,
    FlightsItem
  },
  //声明组件可以接收的属性，传值
  props: ["data"],
  data() {
    return {
      //保存后台给的航班数据
      flightsData: {},
      //保存当前航班机票列表数据
      dataList: [],
      //当前页数
      pageIndex: 1,
      //显示的条数
      pageSize: 5,
      //总条数
      total: 0
    };
  },
  methods: {
    //修改条数的时候触发
    handleSizeChange(value) {
      //修改当前页面的显示的条数
      this.pageSize = value;
      this.getDataList();
    },
    //切换页数的时候触发
    handleCurrentChange(value) {
      this.pageIndex = value;
      this.getDataList();
    },
    //获取分页的数据
    getDataList() {
      this.dataList = this.flightsData.flights.slice(
        //切割的参数由点击的数字传递过来value
        (this.pageIndex - 1) * this.pageSize,
        (this.pageIndex - 1) * this.pageSize + this.pageSize
      );
    }
  },
  mounted() {
    //请求航班信息
    this.$axios({
      url: "/airs",
      method: "get",
      params: this.$route.query
    }).then(res => {
      //保存的总数据
      this.flightsData = res.data;
      //   从总数据中切割出来当前页面需要显示的条数
      this.total = this.flightsData.flights.length;
      this.dataList = this.flightsData.flights.slice(
        (this.pageIndex - 1) * this.pageSize,
        (this.pageIndex - 1) * this.pageSize + this.pageSize
      );
    });
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>