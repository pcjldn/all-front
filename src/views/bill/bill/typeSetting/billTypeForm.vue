<template>
  <div class="form-box">
    <el-form
        label-position="right"
        label-width="100px"
        :model="formData"
        style="max-width: 460px"
    >
      <el-form-item label="账单类型">
        <el-input v-model="formData.typeName"/>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="formData.remarks"/>
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
export default {
  name: "billTypeForm",
  data(){
    return {
      formData: {},
      action: "add"
    }
  },
  mounted() {

  },
  methods:{
    sureAdd(){

    }
  }
}
</script>

<style scoped>
.form-box {
  display: flex;
  flex-direction: column;
  align-items: center;
}

::v-deep .el-form {
  width: 100%;
}
</style>