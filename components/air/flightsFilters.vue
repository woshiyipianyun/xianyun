<template>
  <div class="filters">
    <el-row type="flex" class="filters-top" justify="space-between" align="middle">
      <el-col :span="8">
        单程：
        {{data.info.departCity}} - {{data.info.destCity}}
        /
        {{data.info.departDate}}
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airport" placeholder="起飞机场" @change="handleAirport">
          <el-option
            v-for="(item,index) in data.options.airport"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="flightTimes" placeholder="起飞时间" @change="handleFlightTimes">
          <el-option
            v-for="(item,index) in data.options.flightTimes"
            :key="index"
            :label="`${item.from}:00-${item.to}:00`"
            :value="`${item.from},${item.to}`"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="company" placeholder="航空公司" @change="handleCompany">
          <el-option
            v-for="(item,index) in data.options.company"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airSize" placeholder="机型" @change="handleAirSize">
          <el-option
            v-for="(item,index) in sizeOptions"
            :key="index"
            :label="item.name"
            :value="item.size"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <div class="filter-cancel">
      筛选：
      <el-button type="primary" round plain size="mini" @click="handleFiltersCancel">撤销</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      airport: "", // 机场
      flightTimes: "", // 出发时间
      company: "", // 航空公司
      airSize: "", // 机型大小

      // 机型列表
      sizeOptions: [
        { name: "大", size: "L" },
        { name: "中", size: "M" },
        { name: "小", size: "S" }
      ],

      //保存过滤的条件对象
      //value是条件的值
      //key是后台返回的字段
      filters: {
        company: { value: "", key: "airline_name" },
        airSize: { value: "", key: "plane_size" }
      }
    };
  },
  //组件传过来的值
  props: {
    data: {
      //传过来的数据类型
      type: Object,
      default: {
        info: {},
        options: {}
      }
    }
  },
  mounted() {
    // this.handleFilters();
  },
  methods: {
    //负责过滤所有条件，给所有过滤条件使用的
    handleFilters() {
      //需要循环遍历所有条件，找出符合所有条件的数据
      const newArr = this.data.flights.filter(item => {
        let pass = true;
        Object.keys(this.filters).forEach(v => {
          //如果没有选择条件，就不用判断了
          if (!this.filters[v].value) {
            return;
          }
          //满足每个数据的值和过滤条件的值相等
          if (item[this.filters[v].key] !== this.filters[v].value) {
            pass = false;
          }
        });
        return pass;
      });
      this.$emit("getDataList", newArr);
    },

    // 选择机场时候触发
    handleAirport(value) {
      const arr = this.data.flights.filter(v => {
        return v.org_airport_name === value;
      });
      // console.log(arr);
      //把过滤后的数据传递给父组件
      //触发父组件传递的点击事件，修改dataList
      //恢复数据
      this.$emit("getDataList", arr);
    },

    // 选择出发时间时候触发
    handleFlightTimes(value) {
      // console.log(value);
      const [from, to] = value.split(",");
      const arr = this.data.flights.filter(v => {
        //出发时间
        const start = v.dep_time.split(":")[0];
        //判断出发时间是否在选中的时间段内
        return start >= from && start < to;
      });
      //恢复数据
      this.$emit("getDataList", arr);
    },

    // 选择航空公司时候触发
    handleCompany(value) {
      // console.log(value);
      // const arr = this.data.flights.filter(v => {
      //   return v.airline_name === value;
      // });
      // console.log(arr);
      //把过滤后的数据传递给父组件
      //触发父组件传递的点击事件，修改dataList
      //恢复数据
      // this.$emit("getDataList", arr);

      //多选
      this.filters.company.value = value;
      this.handleFilters();
    },

    // 选择机型时候触发
    handleAirSize(value) {
      // const arr = this.data.flights.filter(v => {
      //   return v.plane_size === value;
      // });
      // //恢复数据
      // this.$emit("getDataList", arr);

      //多选
      this.filters.airSize.value = value;
      this.handleFilters();
    },

    // 撤销条件时候触发
    handleFiltersCancel() {
      //恢复条件选项
      this.airport = ""; // 机场
      this.flightTimes = ""; // 出发时间
      this.company = ""; // 航空公司
      this.airSize = ""; // 机型大小
      //恢复数据
      this.$emit("getDataList", this.data.flights);
    }
  }
};
</script>

<style scoped lang="less">
.filters {
  margin-bottom: 20px;
}

.filters-top {
  > div {
    /deep/ .el-select {
      margin-left: 10px;
    }
  }
}

.filter-cancel {
  margin-top: 10px;
}
</style>