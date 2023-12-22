<template>
  <div class="main-box">
    <div class="action-box">
      <div style="width: 20%">
        <el-button size="default" type="primary" @click="getData(++date)">上一周</el-button>
      </div>
      <div style="width: 60%;text-align: center;;">
        {{ startDate + '/' + endDate }}
      </div>
      <div style="width: 20%;text-align: right">
        <el-button size="default" type="primary" @click="getData(--date)">下一周</el-button>
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
  name: "week",
  components: {StatisticsDataBox, AddBill},
  data() {
    return {
      // 0代表当前周
      date: 0,
      startDate: '',
      endDate: '',
      total: 0,
      tableData: [],
      loading: false
    }
  },
  mounted() {
    this.getData(this.date)
  },
  methods: {
    getData(date) {
      this.loading = true
      request.post(
          config.billHost + "/extra/bill/statistics", {"date": date, "type": 1})
          .then(res => {
            this.loading = false
            if (res.code == 200) {
              this.startDate = res.data.startDate;
              this.endDate = res.data.endDate;
              this.total = res.data.totalPay
              this.tableData = res.data.bills;
            } else {
              this.total = 0
              this.tableData = []
            }
          })
    },
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