<template>
  <div class="main-box">
    <div class="action-box">
      <div style="width: 80%;text-align: left;;">
        <el-cascader v-model="date" :options="options" @change="getData(date)"/>
      </div>
      <div style="width: 20%;text-align: right;;">
        <el-button type="primary" size="default" @click="getData(date)">查询</el-button>
      </div>
    </div>

    <div class="panel-box">
      <span>
        总计：
        <span v-loading="loading">{{ total }}</span>
      </span>
    </div>
    <div class="data-box" v-loading="loading">
      <statistics-data-box :table-data="tableData"/>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request.ts";
import config from "@/config/config.ts";
import AddBill from "@/views/bill/bill/components/addBill.vue";
import StatisticsDataBox from "@/views/bill/statistics/components/StatisticsDataBox.vue";

export default {
  name: "month",
  components: {StatisticsDataBox, AddBill},
  data() {
    return {
      // 0代表当前周
      date: 0,
      total: 0,
      tableData: [],
      options: [],
      loading: false,
    }
  },
  mounted() {
    this.getOptionsArr();
  },
  methods: {
    getData(date) {
      this.loading = true
      let checkDate = date[0] + "-" + this.add0(date[1])
      request.post(
          config.billHost + "/extra/bill/statistics", {"date": checkDate, "type": 2})
          .then(res => {
            this.loading = false
            if (res.code == 200) {
              this.total = res.data.totalPay
              this.tableData = res.data.bills;
            } else {
              this.total = 0
              this.tableData = []
            }
          })
    },
    getOptionsArr() {
      this.options = [];
      for (let year = 2022; year < new Date().getFullYear() + 1; year++) {
        let yearA = {
          value: year,
          label: year,
          children: []
        }
        for (let month = 1; month < 13; month++) {
          yearA.children.push({
            value: month,
            label: month,
          })
        }

        this.options.push(yearA)
      }

      this.date = [new Date().getFullYear(), new Date().getMonth() + 1]
      this.getData(this.date)
    },
    add0(m) {
      if (m < 10) {
        return "0" + m
      } else {
        return m;
      }
    }
  }
}
</script>

<style scoped lang="scss">
.main-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #F2F4F7;
  height: 100%;
  box-sizing: border-box;
  padding: 10px;
}

.action-box {
  box-sizing: border-box;
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  background: white;
  padding: 0 5px;
}

.panel-box {
  box-sizing: border-box;
  margin-top: 5px;
  width: 100%;
  height: 40px;
  line-height: 40px;
  background: white;
  padding: 0 5px;
}

.data-box {
  width: 100%;
  box-sizing: border-box;
  margin-top: 5px;
  height: calc(100vh - 40px - 70px - 10px - 40px - 5px - 40px);
  overflow-x: hidden;
  overflow-y: scroll;
}
</style>