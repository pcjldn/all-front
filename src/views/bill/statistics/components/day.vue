<template>
  <div class="main-box">
    <div class="action-box">
      <div style="width: 60%">
        <el-date-picker
            v-model="date" style="width: 100%"
            type="date"
            :clearable="false"
            :editable="false"
            placeholder="选择日期">
        </el-date-picker>
      </div>
      <div style="width: 40%;text-align: right;;">
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
  name: "day",
  components: {StatisticsDataBox, AddBill},
  data() {
    return {
      // 0代表当前周
      date: '',
      total: 0,
      tableData: [],
      loading: false
    }
  },
  watch:{
    date: {
      immediate: true,
      handler(newVal){
        if(newVal){
          if (typeof (newVal) == 'object') {
            this.date = this.formatDate(newVal)
          }

          this.$nextTick(()=>{
            this.getData(this.date)
          })
        }
      }
    },
  },
  mounted() {
    this.date = this.formatDate(new Date())
  },
  methods: {
    getData(date) {
      this.loading = true;
      request.post(
          config.billHost + "/extra/bill/statistics", {"date": date, "type": 0})
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
    formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份是从0开始计数的
      const day = String(date.getDate()).padStart(2, '0');

      return `${year}-${month}-${day}`;
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