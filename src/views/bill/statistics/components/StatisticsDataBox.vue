<template>
  <div>
    <el-drawer
        :before-close="closeDialog"
        v-model="billDialogVisable"
        :title="dialogTitle"
        size="80%"
        :direction="addDialogPostion"
    >
      <add-bill ref="addBillRef" @close="billDialogVisable = false" @search="getTodayBill(checkDate)"></add-bill>
    </el-drawer>
    <el-collapse v-if="tableData.length > 0" accordion>
      <el-collapse-item v-for="(item,index) in tableData" :name="index">
        <template #title>
          <div class="type-item-title"
               style="padding-left: 10px;width: 100%;display: flex;font-size: 16px;justify-content: center">
            <div class="name" style="width: 50%;height: 40px;line-height: 40px">
              <!--                <img v-if="item.bills && item.bills.length>0" :src="item.bills[0].picUrl" style="width: 30px;height: 30px;border-radius: 30px"/>-->
              <span>{{ item.typeName }}</span>
            </div>
            <div class="total" style="width: 50%">
              总计：{{ item.totalPay }}
            </div>
          </div>
        </template>

        <div class="biggestBox">
          <ul>
            <!-- data-type=0 隐藏删除按钮 data-type=1 显示删除按钮 -->
            <li class="li_vessel" v-for="(item2,index2) in item.bills" data-type="0" :key="index2">
              <!-- "touchstart" 当手指触摸屏幕时候触发  "touchend"  当手指从屏幕上离开的时候触发  "capture" 用于事件捕获-->
              <div @click="view(item2)">
                <div class="contant">
                  <div class="rightBox">
                    <el-row>
                      <el-col :span="2">
                        <div class="img" style="width: 30px;height: 30px;border-radius: 30px">
                          <img :src="item2.picUrl" style="width: 30px;height: 30px;border-radius: 30px" alt="">
                        </div>
                      </el-col>
                      <el-col :span="14">
                        <div class="typeName">
                          <span>{{ item2.typeName }}</span>
                        </div>
                      </el-col>
                      <el-col :span="8" style="text-align: right">
                        <span>￥</span>
                        <span>{{ item2.price }}</span>
                      </el-col>
                    </el-row>
                    <el-row type="flex">
                      <el-col :span="14">
                        <div class="typeName">
                          <el-icon>
                            <EditPen/>
                          </el-icon>
                          <span>{{ item2.remarks }}</span>
                        </div>
                      </el-col>
                      <el-col :span="10" style="text-align: right">
                        <div class="pay-time">
                          <el-icon>
                            <Calendar/>
                          </el-icon>
                          <span>{{ item2.payTime }}</span>
                        </div>
                      </el-col>
                    </el-row>
                  </div>

                </div>
              </div>
            </li>
          </ul>
        </div>
      </el-collapse-item>
    </el-collapse>
    <el-empty v-else description="查询时间段内无消费数据" />
  </div>
</template>

<script>
import $ from "jquery";
import AddBill from "@/views/bill/bill/components/addBill.vue";

export default {
  name: "StatisticsDataBox",
  components: {AddBill},
  props: {
    tableData: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      dialogTitle: '查看账单',
      billDialogVisable: false,
      addDialogPostion: 'btt'
    }
  },
  methods: {
    view(row) {
      debugger
      this.billDialogVisable = true;
      this.$nextTick(() => {
        this.$refs.addBillRef.formData = $.extend({}, row)
        this.$refs.addBillRef.action = 'view'
      });
    },
    closeDialog() {
      for (let formDataKey in this.$refs.addBillRef.formData) {
        this.$refs.addBillRef.formData[formDataKey] = ''
      }
      this.$refs.addBillRef.formData.typeId = this.$refs.addBillRef.typeOptions.length > 0 ? this.$refs.addBillRef.typeOptions[0].id : ''

      this.$nextTick(() => {
        this.billDialogVisable = false;
      });
    }
  }
}
</script>

<style scoped lang="scss">
.biggestBox {
  overflow-x: hidden;
  overflow-y: auto;
  width: 100%;
  box-sizing: border-box;
  margin-top: 15px;
  padding: 0 10px 5px 10px;
  /*超出部分隐藏*/

  ul {
    /* 消除 ul 默认样式 */
    list-style: none;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    width: 100%;
    font-size: 16px;

    .li_vessel {
      /* 全部样式 0.2秒 缓动*/
      transition: all 0.2s;
      border-top: #795da3 1px solid;
      border-radius: 12px 0 0 0;
      background: #ffffff;
      box-shadow: 0 0 3px #795da3;
      /* 左边的图片样式 */
      .contant {
        overflow: hidden;
        /*消除图片带来的浮动*/
        padding: 10px;
        height: auto;
      }

      .typeName {
        padding-left: 10px;

      }
    }
  }
}
</style>