<template>
  <div class="main-form">
    <el-form
        label-position="right"
        label-width="100px"
        :model="formData"
        style="max-width: 460px"
    >
      <el-form-item label="商品名称">
        <el-input v-model="formData.name"/>
      </el-form-item>
      <el-form-item label="价格">
        <el-input v-model="formData.price"/>
      </el-form-item>
      <el-form-item label="类型">
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
      <el-form-item label="地址">
        <el-input v-model="formData.place"/>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="sureAdd">
          {{ action == 'add' ? '添加' :'确定' }}
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
  name: "addPrice",
  props: {
    drawer: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      formData: {
        name: '',
        price: '',
        typeId: '',
        place: ''
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
          config.billHost + "/extra/goodsType/do")
          .then(res => {
            this.typeOptions = res.data
            this.formData.typeId = this.typeOptions[0].id
          })
    },
    sureAdd() {
      if(this.action == 'add'){
        this.add()
      }else if(this.action == 'edit'){
        this.edit()
      }
    },
    add(){
      request.post(
          config.billHost + "/extra/goodsPrice/do",this.formData)
          .then(res => {
            if(res.code == 200){
              ElMessage({
                message: "添加成功",
                type: "success"
              })

              this.$emit('search')
              this.$emit('close')
            }
          })
    },
    edit(){
      request.put(
          config.billHost + "/extra/goodsPrice/do",this.formData)
          .then(res => {
            if(res.code == 200){
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