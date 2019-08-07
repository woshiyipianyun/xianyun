<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->

        <FlightsFilters :data="cacheFlightsData" @getDataList="getDataList"></FlightsFilters>
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
            :total="total"
          ></el-pagination>
        </el-row>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
        <FlightsAside></FlightsAside>
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
//引入筛选布局文件
import FlightsFilters from "@/components/air/flightsFilters.vue";
//引入侧边栏历史记录文件
import FlightsAside from "@/components/air/flightsAside.vue";
export default {
  components: {
    FlightsListHead,
    FlightsItem,
    FlightsFilters,
    FlightsAside
  },
  //声明组件可以接收的属性，传值
  props: ["data"],
  data() {
    return {
      //保存后台给的航班数据
      flightsData: {
        info: {},
        options: []
      },
      //缓存的所有数据
      cacheFlightsData: {
        info: {},
        options: {}
      },
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

  //watch是监听属性，可以监听实例下所有的属性变化
  watch: {
    //监听路由信息变化
    $route() {
      this.pageIndex = 1;
      this.getData();
    }
  },

  methods: {
    //修改条数的时候触发
    //由页面传过来的参数value
    handleSizeChange(value) {
      //修改当前页面的显示的条数
      //   把传过来的参数赋值给显示的条数
      this.pageSize = value;
      //   调用分页计算方法
      this.getDataList();
    },
    //切换页数的时候触发
    //由页面传过来的参数value
    handleCurrentChange(value) {
      //   把传过来的参数赋值给显示的页数
      this.pageIndex = value;

      //   调用分页计算方法
      this.getDataList();
    },
    //获取分页传递的数据进行计算

    getDataList(arr) {
      //过滤组件调用时候返回的过滤后的数据

      if (arr) {
        // 用传递过来的数据替换列表数据
        this.flightsData.flights = arr;
        this.total = arr.length;
      }
      this.dataList = this.flightsData.flights.slice(
        //当前页数-1再乘以选择的条数
        (this.pageIndex - 1) * this.pageSize,
        //当前页数-1再乘以选择的条数再加上选择的页数
        (this.pageIndex - 1) * this.pageSize + this.pageSize
      );
    },

    //获取数据列表
    getData() {
      //请求航班信息
      this.$axios({
        url: "/airs",
        method: "get",
        params: this.$route.query
      }).then(res => {
        //保存的总数据
        this.flightsData = res.data;

        //缓存的数据，一旦赋值不会被修改
        this.cacheFlightsData = { ...res.data };

        //总条数
        this.total = this.flightsData.flights.length;

        //   从总数据中切割出来当前页面需要显示的条数
        this.getDataList();
      });
    }
  },
  mounted() {
    this.getData();
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