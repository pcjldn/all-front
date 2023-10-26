<template>
  <div class="main-form">
    <el-form
        label-position="right"
        label-width="100px"
        :model="formData"
        style="max-width: 460px"
    >
      <el-form-item label="账单类型">
        <!--        <el-input v-model="formData.typeId"/>-->
        <el-select v-model="formData.typeId" style="width: 100%" class="m-2" placeholder="请选择">
          <el-option
              v-for="item in typeOptions"
              :key="item.id"
              :label="item.typeName"
              :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="formData.remarks"/>
      </el-form-item>
      <el-form-item label="价格">
        <el-input v-model="formData.price"/>
      </el-form-item>

      <el-form-item label="购买时间">
        <el-input v-model="formData.payTime"/>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="sureAdd">
          {{ action == 'add' ? '添加' : '确定' }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import request from "@/utils/request.ts";
import config from "@/config/config.ts";
import {ElMessage} from "element-plus";

export default {
  name: "addBill",
// /extra/billType/do
  ///extra/bill/do
// {"typeId":"1612997378800422913","remarks":"测试","price":"1","payTime":"2023-10-24","fpPicUrl":"","file":""}
  props: {
    drawer: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      formData: {
        payTime: '',
        typeId: '',
        price: '',
        remarks: '',
      },
      action: 'add',
      typeOptions: []
    }
  },
  mounted() {
    this.getTypeInfo()
  },
  methods: {
    getTypeInfo() {
      request.get(
          config.billHost + "/extra/billType/do")
          .then(res => {
            this.typeOptions = res.data
            this.formData.typeId = this.typeOptions[0].id
          })
    },
    sureAdd() {
      if (this.action == 'add') {
        this.add()
      } else if (this.action == 'edit') {
        this.edit()
      }
    },
    add() {
      request.post(
          config.billHost + "/extra/bill/do", this.formData)
          .then(res => {
            if (res.code == 200) {
              ElMessage({
                message: "添加成功",
                type: "success"
              })

              this.$emit('search')
              // this.$emit('close')
              this.formData.remarks = ''
              this.formData.price = ''
            }
          })
    },
    edit() {
      request.put(
          config.billHost + "/extra/bill/do", this.formData)
          .then(res => {
            if (res.code == 200) {
              ElMessage({
                message: "修改成功",
                type: "success"
              })

              this.$emit('search')
              this.$emit('close')
            }
          })
    }
  }
}
</script>

<style scoped>
.main-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

::v-deep .el-form {
  width: 100%;
}
</style>