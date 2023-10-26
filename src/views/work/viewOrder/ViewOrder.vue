<template>
  <div style="padding:10px ;flex-direction: column;display: flex;align-items: center;justify-content: center">
    <el-form :inline="true" :model="formData" class="demo-form-inline">
      <el-form-item label="单据编号">
        <el-input v-model="formData.orderCode" clearable placeholder="单据编号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit(formData.orderCode)">跳转</el-button>
      </el-form-item>
    </el-form>

    <div class="records">
      <h1>查询记录</h1>
      <ul style="list-style-type: none">
        <li v-for="item in recordsTableData"> <p style="cursor: pointer" @click="onSubmit(item.orderCode)">{{ item.orderCode }}</p></li>
      </ul>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request.ts";
import config from "@/config/config.ts";
import {ElMessage} from "element-plus";

export default {
  name: "ViewOrder",
  data(){
    return{
      formData:{
        orderCode: ""
      },
      recordsTableData: []
    }
  },
  methods:{
    onSubmit(orderCode){
      if(!this.formData.orderCode && !orderCode){
        ElMessage({
          message: "请输入单据编号",
          type: "warning"
        })
        return
      }

      if(!this.recordsTableData.some(a=>a.orderCode == orderCode )){
        this.recordsTableData.push({
          orderCode: orderCode
        })
      }

      request({
        url: config.srjtHost + `/fdWisEas/v1/getOrderUrl`,
        data: {
          "orderCode": orderCode,
          "isNeedToken": true
        }
      }).then(res => {
        window.open(config.srjtFront+"/matter/approvalForm?instId="+res.value.instId + "&type=request&token="+res.value.token, '_blank');
      }).catch(err=>{
        ElMessage({
          message: "异常",
          type: "error"
        })
      })
    }
  }
}
</script>

<style scoped>
::v-deep .el-input__wrapper{
  width: 500px !important;
}
</style>
