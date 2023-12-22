<template>
  <div class="main-box">
    <touch-button  v-if="addBtnIsShow" @click="addNewBill"></touch-button>

    <div class="return-btn">
      <div class="return-icon">
        <span class="type-setting" style="cursor: pointer" @click="$router.push('/bill/billType')">类型设置</span>
      </div>
      <div class="title">记账</div>
      <div class="addNew">
        <el-button type="primary" @click="addNewBill" style="color: #ffffff">
          <el-icon style="font-size: 20px">
            <CirclePlus/>
          </el-icon>
        </el-button>
      </div>
    </div>
    <div class="panel-box">
      <el-row>
        <el-col :span="12">
          <el-date-picker
              v-model="checkDate" style="width: 100%"
              type="date"
              :clearable="false"
              :editable="false"
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

    <div class="biggestBox">
      <ul>
        <!-- data-type=0 隐藏删除按钮 data-type=1 显示删除按钮 -->
        <li class="li_vessel" v-for="(item,index) in tableData" data-type="0" :key="index">
          <!-- "touchstart" 当手指触摸屏幕时候触发  "touchend"  当手指从屏幕上离开的时候触发  "capture" 用于事件捕获-->
          <div @touchstart.capture="touchStart" @touchend.capture="touchEnd" @click="edit(item)">
            <div class="contant">
              <div class="rightBox">
                <el-row>
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
                <el-row type="flex">
                  <el-col :span="14">
                    <div class="typeName">
                      <el-icon>
                        <EditPen/>
                      </el-icon>
                      <span>{{ item.remarks }}</span>
                    </div>
                  </el-col>
                  <el-col :span="10" style="text-align: right">
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
          <div class="removeBtn" @click="remove(item)" :data-index="index">删除</div>
        </li>
      </ul>
    </div>

    <el-drawer
        :before-close="closeDialog"
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
import {ref, onMounted, watch, nextTick} from "vue";
import request from "@/utils/request.ts";
import config from "@/config/config.ts";
import addBill from "@/views/bill/bill/components/addBill.vue";
import $ from 'jquery'
import {ElMessage, ElMessageBox} from "element-plus";
import TouchButton from "@/views/components/TouchButton.vue";

const checkDate = ref('')
const total = ref(100)
const tableData = ref([])
const billDialogVisable = ref(false)
const addBtnIsShow = ref(true)
const addDialogPostion = ref('btt')
const dialogTitle = ref('新增账单')
const addBillRef = ref(null);
const backDom = ref(null);

const mount = () => {
  init();
  // handlerDrag();
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

watch(billDialogVisable, async (newVal, oldVal) => {
  addBtnIsShow.value = !billDialogVisable.value
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

  request({
    url: config.billHost + "/extra/bill/do/totalPay",
    data: {
      date: date
    }
  })
      .then(res => {
        total.value = res.data
      })
}

function addNewBill() {
  restSlide();
  dialogTitle.value = '添加账单'
  billDialogVisable.value = true;


  nextTick(() => {
    addBillRef.value.formData.payTime = checkDate.value
    addBillRef.value.action = 'add'
  });
}

function edit(row) {
  restSlide();
  dialogTitle.value = '修改/查看账单'
  billDialogVisable.value = true;
  nextTick(() => {
    addBillRef.value.formData = $.extend({}, row)
    addBillRef.value.action = 'edit'
  });

}

function closeDialog() {
  for (let formDataKey in addBillRef.value.formData) {
    addBillRef.value.formData[formDataKey] = ''
  }

  addBillRef.value.isAddFpPic = false
  addBillRef.value.formData.typeId = addBillRef.value.typeOptions.length > 0 ? addBillRef.value.typeOptions[0].id : ''

  nextTick(() => {
    billDialogVisable.value = false;
  });
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


// 左滑删除

let startX = ref(0)
let endX = ref(0)

//滑动开始
function touchStart(e) {
  // 记录初始位置
  startX.value = e.touches[0].clientX;
}

//滑动结束
function touchEnd(e) {
  // 当前滑动的父级元素
  let parentElement = e.currentTarget.parentElement;
  // 记录结束位置
  endX.value = e.changedTouches[0].clientX;
  // 左滑大于30距离删除出现
  if (parentElement.dataset.type == 0 && startX.value - endX.value > 30) {
    restSlide();
    parentElement.dataset.type = 1;
  }
  // 右滑
  if (parentElement.dataset.type == 1 && startX.value - endX.value < -30) {
    restSlide();
    parentElement.dataset.type = 0;
  }
  startX.value = 0;
  endX.value = 0;
}

//判断当前是否有滑块处于滑动状态
function checkSlide() {
  let listItems = document.querySelectorAll(".li_vessel");
  for (let i = 0; i < listItems.length; i++) {
    if (listItems[i].dataset.type == 1) {
      return true;
    }
  }
  return false;
}

//复位滑动状态
function restSlide() {
  let listItems = document.querySelectorAll(".li_vessel");
  // 复位
  for (let i = 0; i < listItems.length; i++) {
    listItems[i].dataset.type = 0;
  }
}

//删除数据信息
function remove(row) {
  // 复位
  restSlide();
  // 删除数组lists中一个数据
  ElMessageBox.confirm('确认删除' + row.remarks + '?', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    request.delete(
        config.billHost + "/extra/bill/do/" + row.id,
    )
        .then(res => {
          ElMessage({
            message: "删除成功",
            type: "success"
          })

          getTodayBill(checkDate.value)
        })


    restSlide()
  })
      .catch(() => {
        ElMessage({
          message: "已取消删除",
          type: "info"
        })
        restSlide()
      })

}

// 挂载渲染函数
onMounted(mount);
</script>

<style scoped lang="scss">
* { touch-action: pan-y; }
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

.return-btn {
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

:deep(.el-drawer__header)  {
  padding: 10px !important;
  margin-bottom: 0;
  background: #0077aa;
  color: #ffffff;
}

:deep(.el-drawer__body) {
  padding: 10px;
}

/*// 左滑删除*/

.biggestBox {
  overflow-x: hidden;
  overflow-y: auto;
  width: 95%;
  box-sizing: border-box;
  margin-top: 15px;
  height: -webkit-fill-available;
  /*超出部分隐藏*/
}

ul {
  /* 消除 ul 默认样式 */
  list-style: none;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  width: 100%;
}

.li_vessel {
  /* 全部样式 0.2秒 缓动*/
  transition: all 0.2s;
  border-top: #795da3 1px solid;
  border-radius: 12px 0 0 0;
  background: #ffffff;
  box-shadow: 0 0 3px #795da3;
}

/* =0隐藏 */
.li_vessel[data-type="0"] {
  transform: translate3d(0, 0, 0);
}

/* =1显示 */
.li_vessel[data-type="1"] {
  /* -64px 设置的越大可以左滑的距离越远，最好与下面删除按钮的宽度以及定位的距离设置一样的值*/
  transform: translate3d(-64px, 0, 0);
}

/* 删除按钮 */
.li_vessel .removeBtn {
  width: 64px;
  height: 80px;
  background: #ff4949;
  font-size: 16px;
  color: #fff;
  text-align: center;
  position: absolute;
  top: 0px;
  right: -65px;
  line-height: 80px;
}

/* 左边的图片样式 */
.contant {
  overflow: hidden;
  /*消除图片带来的浮动*/
  padding: 10px;
  //min-height: 50px;
  height: auto;
}

/* 右边的文字信息样式 */

@keyframes hue {
  from {
    filter: hue-rotate(0);
  }

  to {
    filter: hue-rotate(-360deg);
  }
}

.type-setting {
  display: inline-block;
  position: relative;
  color: transparent;
  animation: hue 1.5s linear infinite;
  background-image: linear-gradient(to right bottom, rgb(255, 0, 0), rgb(255, 128, 0), rgb(255, 255, 0), rgb(0, 255, 0), rgb(0, 255, 128), rgb(0, 255, 255), rgb(0, 128, 255), rgb(0, 0, 255), rgb(128, 0, 255), rgb(255, 0, 255), rgb(255, 0, 128));
  -webkit-background-clip: text;
}
</style>