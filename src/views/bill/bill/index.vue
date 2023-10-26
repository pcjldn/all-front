<template>
  <div class="main-box">
    <div class="return-btn">
      <div class="return-icon">
        <el-icon style="font-weight: bold;color: white;cursor: pointer"><ArrowLeft /></el-icon>
      </div>
      <div class="title">记账</div>
      <div class="addNew">
        <el-button type="primary" @click="addNewBill" style="color: #ffffff">
          <el-icon style="font-size: 20px"><CirclePlus/></el-icon>
        </el-button>
      </div>
    </div>
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
          <div style="text-align: right">
            总计：{{ total }}
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="bill-detail-box">
      <div class="oneBill" v-for="item in tableData" @click="edit(item)">
        <el-row style="height: 30px;line-height: 30px">
          <el-col :span="2">
            <div class="img" style="width: 30px;height: 30px;border-radius: 30px">
              <img :src="item.picUrl" style="width: 30px;height: 30px;border-radius: 30px" alt="">
            </div>
          </el-col>
          <el-col :span="14">
            <div class="typeName">
              <span>{{ item.typeName }}</span>
            </div>
          </el-col>
          <el-col :span="8" style="text-align: right">
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
          <el-col :span="8"  style="text-align: right">
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

    <el-drawer
        v-model="billDialogVisable"
        :title="dialogTitle"
        size="80%"
        :direction="addDialogPostion"
    >
      <add-bill ref="addBillRef" @close="billDialogVisable = false" @search="getTodayBill(checkDate)"></add-bill>
    </el-drawer>

  </div>
</template>

<script setup>
import {ref, onMounted, watch, onBeforeUpdate} from "vue";
import request from "@/utils/request.ts";
import config from "@/config/config.ts";
import addBill from "@/views/bill/bill/components/addBill.vue";
import $ from 'jquery'

const checkDate = ref('')
const total = ref(100)
const tableData = ref([])
const billDialogVisable = ref(false)
const addDialogPostion = ref('btt')
const dialogTitle = ref('新增账单')
const addBillRef = ref(null);

const mount = () => {
  init();
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

function addNewBill(){
  dialogTitle.value = '添加账单'
  billDialogVisable.value = true;

  addBillRef.value.formData.payTime = checkDate.value
  addBillRef.value.action = 'add'
}

function edit(row){
  dialogTitle.value = '修改/查看账单'
  billDialogVisable.value = true;

  addBillRef.value.formData = $.extend({},row)
  addBillRef.value.action = 'edit'
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
  /*justify-content: center;*/
  align-items: center;
  background: #F2F4F7;
  height: 100%;
}

.panel-box {
  width: 95%;
  background: #ffffff;
  padding: 10px;
  height: 50px;
  line-height: 50px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}

.bill-detail-box {
  width: 95%;
  margin-top: 10px;
  height: calc(100vh - 70px - 40px - 50px);
  overflow: scroll;
}

.oneBill{
  /*margin-top: 5px;*/
  background: #ffffff;
  border-radius: 10px;
  box-sizing: border-box;
  padding-left: 10px;
  padding-right: 10px;
  border-top: #795da3 1px solid;
}

.return-btn{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 10px;
  height: 40px;
  line-height: 40px;
  font-size: 18px;
  background: #409EFF;
  width: 100%;
  box-sizing: border-box;
}

::v-deep .el-drawer__header {
  padding: 10px;
  margin-bottom: 0;
  background: #0077aa;
  color: #ffffff;
}
</style>