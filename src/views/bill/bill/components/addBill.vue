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
          <el-select v-model="formData.typeId" style="width: 100%" class="m-2" placeholder="请选择">
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
          <el-input v-model="formData.remarks" :validate-event="formData.remarks != null"/>
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

    <el-divider content-position="left">快捷选项</el-divider>
<!--    <div class="title" style="font-weight: bold;width: 100%;"  v-if="action == 'add'">快捷选择</div>-->
    <div class="bill-type-box" v-if="action == 'add'">
      <div class="bill-type-item" :class="{'active' : item.id == formData.typeId}" v-for="item in typeOptions" @click="typeCheck(item)">
        <img class="img" :src="item.picUrl" alt="" >
        <div class="type-name">{{item.typeName}}</div>
      </div>
    </div>
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
        id: '',
        payTime: '',
        typeId: '',
        price: '',
        remarks: '',
        fp_pic_url: '',
        create_time: '',
        update_time: '',
        is_dele: 0,
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
    },
    typeCheck(row){
      this.formData.typeId = row.id;
      ElMessage({
        message: "当前选择：《"+ row.typeName + "》",
        type: "info",

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
      height: calc(20vw - 8px - 10px );
      border-radius: calc(20vw - 8px - 10px );
    }
  }

  .bill-type-item:nth-of-type(5n + 1) {
    margin-left: 0;
  }

  .bill-type-item.active .img{
    border: #0077aa 2px solid;
    box-shadow: 0 0 5px #0077aa;
  }

  .type-name{
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    max-height: 60px;
  }
}

::v-deep .el-divider{
  margin-top: 5px;
  margin-bottom: 10px;
}



</style>