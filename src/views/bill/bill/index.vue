<template>
  <div class="main-box">
    <div class="panel-box">
      <el-row>
        <el-col :span="12">
          <el-date-picker
              v-model="checkDate" style="width: 100%"
              type="date"
              placeholder="选择日期">
          </el-date-picker>
        </el-col>
        <el-col :span="12">
          <div style="float: right">
            总计：{{ total }}
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="bii-detail-box">
      <div class="oneBill" v-for="item in tableData">
        <el-row style="height: 30px;line-height: 30px">
          <el-col :span="16">
            <div class="typeName">

              <span>{{ item.typeName }}</span>
            </div>
          </el-col>
          <el-col :span="8">
            <span>￥</span>
            <span>{{ item.price }}</span>
          </el-col>
        </el-row>
        <el-row style="height: 30px;line-height: 30px">
          <el-col :span="16">
            <div class="typeName">
              <el-icon>
                <EditPen/>
              </el-icon>
              <span>{{ item.remarks }}</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="pay-time">
              <el-icon>
                <Calendar/>
              </el-icon>
              <span>{{ item.payTime }}</span>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

  </div>
</template>

<script setup>
import {ref, onMounted, watch} from "vue";
import request from "@/utils/request.ts";
import config from "@/config/config.ts";

const checkDate = ref('')
const total = ref(100)
const tableData = ref([])

const mount = () => {
  init()
};

function init() {
  checkDate.value = formatDate(new Date())
}

/**
 * 监听日期
 */
watch(checkDate, async (newVal, oldVal) => {
  if (typeof (newVal) == 'object') {
    checkDate.value = formatDate(newVal)
  }
  await getTodayBill(checkDate.value)
})

function getTodayBill(date) {
  request({
    url: config.billHost + "/extra/bill/do/query",
    data: {
      date: date
    }
  })
      .then(res => {
        tableData.value = res.data
      })
}

/**
 * 转换日期为年月日
 * @param date
 * @returns {string}
 */
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份是从0开始计数的
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

// 挂载渲染函数
onMounted(mount);
</script>

<style scoped>
.main-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.panel-box {
  width: 90%;
  background: #F2F4F7;
  padding: 10px;
  height: 30px;
  line-height: 30px;
}

.bii-detail-box {
  width: 90%;
  margin-top: 10px;

}
</style>