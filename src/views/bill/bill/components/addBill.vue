<template>
  <div class="main-form">
    <div class="form-box">
      <el-form
          label-position="right"
          label-width="100px"
          :model="formData"
          style="max-width: 460px"
      >
        <el-form-item label="账单类型">
          <!--        <el-input v-model="formData.typeId"/>-->
          <el-select :readonly="action == 'view'" :disabled="action == 'view'" v-model="formData.typeId"
                     style="width: 100%" class="m-2" placeholder="请选择">
            <el-option
                v-for="item in typeOptions"
                :key="item.id"
                :label="item.typeName"
                :value="item.id">
              <div style="display: flex;justify-content: left">
                <div class="type-icon"><img :src="item.picUrl" style="width: 20px;height: 20px;border-radius: 20px"/>
                </div>
                <div class="type-name" style="padding-left: 10px;height: 20px;line-height: 20px">{{
                    item.typeName
                  }}
                </div>
              </div>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input :readonly="action == 'view'" v-model="formData.remarks" :validate-event="formData.remarks != null"/>
        </el-form-item>
        <el-form-item label="价格">
          <el-input :readonly="action == 'view'" v-model="formData.price"/>
        </el-form-item>

        <el-form-item label="购买时间">
          <el-input :readonly="action == 'view'" v-model="formData.payTime"/>
        </el-form-item>

        <el-form-item label="发票" v-if="formData.fpPicUrl != null && formData.fpPicUrl != '' && action != 'add'">
          <div>
            <img :src="formData.fpPicUrl" alt="" style="width: 40px" @click="viewFp(formData.fpPicUrl)">
          </div>
        </el-form-item>

        <el-form-item label="上传发票" v-if="isAddFpPic">
          <div style="display: flex;">
            <div style="width: 70%;">
              <el-upload
                  capture="camera"
                  accept="image/*"
                  ref="upload"
                  class="upload-demo"
                  :action="config.billHost+'/saveImage'"
                  :limit="1"
                  :on-exceed="handleExceed"
                  :on-success="uploadSuccess"
                  :on-error="uploadError"
                  :on-progress="()=>{loading = true}"
              >
                <template #trigger>
                  <el-button type="primary" v-loading="loading">选择发票</el-button>
                </template>
                <template #file="{ file }">
                  <div>
                    <img class="el-upload-list__item-thumbnail" :src="file.url" style="width: 40px" alt=""/>
                    <span class="el-upload-list__item-actions">
          <span
              class="el-upload-list__item-preview"
              @click="handlePictureCardPreview(file)"
          >
            <el-icon><zoom-in/></el-icon>
          </span>
        </span>
                  </div>
                </template>
              </el-upload>
            </div>
            <div style="width: 30%;text-align: right">
              <el-button type="danger" @click="()=>{$refs.upload.clearFiles();}">清空</el-button>
            </div>
          </div>
        </el-form-item>

      </el-form>
      <div style="text-align: center;margin-bottom: 20px">
        <el-button type="success" @click="isAddFpPic = !isAddFpPic" v-if="action != 'view'">
          {{
            isAddFpPic ? '无需发票' : ((formData.fpPicUrl == null || formData.fpPicUrl == '') ? '增加发票' : '修改发票')
          }}
        </el-button>
        <el-button type="primary" @click="sureAdd" v-if="action != 'view'">
          {{ action == 'add' ? '添加' : '确定' }}
        </el-button>
        <el-button type="danger" @click="$emit('close')">
          关闭
        </el-button>
      </div>
    </div>

    <div>
      <el-dialog class="fpDialog" v-model="dialogVisible" width="95%" top="10px" left="10px" title="图片预览">
        <div style="width: 100%;text-align: center;max-height: 90vh;overflow-y: scroll">
          <img  :src="dialogImageUrl" alt="预览图片" style="width: 300px"/>
        </div>
      </el-dialog>
    </div>

    <el-divider content-position="left" v-if="action == 'add'">快捷选项</el-divider>
    <!--    <div class="title" style="font-weight: bold;width: 100%;"  v-if="action == 'add'">快捷选择</div>-->
    <div class="bill-type-box" v-if="action == 'add'">
      <div class="bill-type-item" :class="{'active' : item.id == formData.typeId}" v-for="item in typeOptions"
           @click="typeCheck(item)">
        <img class="img" :src="item.picUrl" alt="">
        <div class="type-name">{{ item.typeName }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request.ts";
import config from "@/config/config.ts";
import {ElMessage, genFileId} from "element-plus";

export default {
  name: "addBill",
  computed: {
    config() {
      return config
    }
  },
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
        id: '',
        payTime: '',
        typeId: '',
        price: '',
        remarks: '',
        fpPicUrl: '',
        create_time: '',
        update_time: '',
        is_dele: 0,
      },
      action: 'add',
      typeOptions: [],
      isAddFpPic: false,
      dialogVisible: false,
      dialogImageUrl: '',
      loading: false,
    }
  },
  watch: {
    isAddFpPic: {
      immediate: true,
      handler(newVal) {
        if (!newVal) {
          this.formData.fpPicUrl = ''
        }
      }
    },

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
              this.isAddFpPic = false
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

              for (let formDataKey in this.formData) {
                this.formData[formDataKey] = ''
              }
              this.isAddFpPic = false
              this.$emit('search')
              this.$emit('close')
            }
          })
    },
    typeCheck(row) {
      this.formData.typeId = row.id;
      // ElMessage({
      //   message: "当前选择：《"+ row.typeName + "》",
      //   type: "info",
      //
      // })
    },
    viewFp(url) {
      this.dialogImageUrl = url
      this.dialogVisible = true
    },
    handleExceed(files) {
      this.$refs.upload.clearFiles()
      const file = files[0]
      file.uid = genFileId()
      this.$refs.upload.handleStart(file)
      this.$refs.upload.submit()
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    uploadSuccess(resp, file, files) {
      this.loading = false
      if (resp.code == 200) {
        file.url = resp.data
        this.formData.fpPicUrl = resp.data
      } else {
        this.$refs.upload.clearFiles()
        this.formData.fpPicUrl = ''
        file.url = ''
      }
    },
    uploadError(error, file) {
      ElMessage({
        type: "error",
        message: "上传出错"
      })
    }
  }
}
</script>

<style scoped lang="scss">
.main-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 9999;
}

::v-deep .el-form {
  width: 100%;
}

.bill-type-box {
  width: 100%;
  box-sizing: border-box;
  height: 290px;
  overflow: scroll;
  display: flex;
  flex-wrap: wrap;


  .bill-type-item {
    width: calc(20vw - 8px - 10px);
    height: calc(20vw - 8px - 10px + 30px);
    max-height: calc(20vw - 8px - 10px + 60px);
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    margin-bottom: 2px;
    padding-top: 4px;

    .img {
      width: calc(20vw - 8px - 10px);
      height: calc(20vw - 8px - 10px);
      border-radius: calc(20vw - 8px - 10px);
    }
  }

  .bill-type-item:nth-of-type(5n + 1) {
    margin-left: 0;
  }

  .bill-type-item.active .img {
    border: #0077aa 2px solid;
    box-shadow: 0 0 5px #0077aa;
  }

  .type-name {
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    max-height: 60px;
  }
}

::v-deep .el-divider {
  margin-top: 5px;
  margin-bottom: 10px;
}


:deep(.el-dialog__header) {
  width: calc(100% - 10px - 10px) !important;
  padding: 10px !important;
  margin-bottom: 0 !important;
  background: #FEEBEF !important;
  color: #ffffff;
  text-align: center;
  //border-bottom: #FEEBEF 3px solid;
}
:deep(.el-dialog__body) {
  //width: 100% !important;
  padding: 10px !important;
  margin-bottom: 0 !important;
}

:deep(.fpDialog .el-dialog__headerbtn){
  top: 0
}
</style>