<template>
  <div>
    <div class="return-btn">
      <div class="return-icon">
        <el-icon style="font-weight: bold;color: white;cursor: pointer"><ArrowLeft /></el-icon>
      </div>
      <div class="title">菜价</div>
      <div class="addNew">
        <el-button type="primary" @click="addDialog = true" style="color: #ffffff">
          <el-icon style="font-size: 20px"><CirclePlus/></el-icon>
        </el-button>
      </div>
    </div>
    <div class="search-box">
      <el-form :inline="true" :model="searchData" class="search-form">
        <el-row>
          <el-col :span="9">
            <el-form-item label="">
              <el-input style="width: 100%" v-model="searchData.goodName" placeholder="商品名" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="">
              <el-select style="width: 100%" @change="search()"
                         v-model="searchData.goodtype"
                         placeholder="商品类型"
                         clearable
              >
                <el-option v-for="item in goodTypeOption" :label="item.typeName" :value="item.id" :key="item.id "/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="">
              <el-button type="primary" size="default" @click="search()">查询</el-button>
              <!--            <el-button>Cancel</el-button>-->
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="main-box">
      <el-table :data="tableData" height="100%" style="width: 100%">
        <el-table-column prop="name" label="名称" min-width="70"/>
        <el-table-column prop="minPrice" label="价格" min-width="100">
          <template #default="scope">
        <span>{{ scope.row.price }}(
          <span style="color: #0077aa;">{{ scope.row.minPrice }}</span>
          /
          <span style="color: red;"> {{ scope.row.maxPrice }}</span>)</span>
          </template>
        </el-table-column>
        <el-table-column prop="typeName" label="类型" min-width="55"/>
        <el-table-column prop="action" label="操作" min-width="165">
          <template #default="{row}">
            <el-button-group>
              <el-button type="primary" size="small" @click="edit(row)">编辑</el-button>
              <el-button type="warning" size="small" @click="view(row)">查看</el-button>
              <el-button type="danger" size="small" @click="del(row)">删除</el-button>
            </el-button-group>

          </template>
        </el-table-column>
      </el-table>
    </div>


    <el-drawer
        v-model="addDialog"
        :title="dialogTitle"
        size="80%"
        :direction="addDialogPostion"
    >
      <add-price :drawer="addDialog" @close="addDialog = false" @search="search" ref="dialog"></add-price>
    </el-drawer>

  </div>
</template>

<script>
import request from "@/utils/request.ts";
import config from "@/config/config.ts";
import AddPrice from "@/views/bill/price/components/addPrice.vue";
import { CirclePlus } from '@element-plus/icons-vue'
import {ElMessage, ElMessageBox} from 'element-plus'

export default {
  name: "index",
  components: {AddPrice},
  data() {
    return {
      tableData: [],
      searchData: {
        goodName: '',
        goodtype: ''
      },
      goodTypeOption: [],
      addDialog: false,
      addDialogPostion: 'btt',
      dialogTitle: '新增商品'
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.search()
      this.getGoodTypeOption()
    },
    search() {
      request.post(
          config.billHost + "/extra/goodsPrice/devide",
          {
            "nameOrId": this.searchData.goodName,
            "typeId": this.searchData.goodtype
          }
      )
          .then(res => {
            this.tableData = res.data
          })
    },
    getGoodTypeOption() {
      request.get(config.billHost + "/extra/goodsType/do")
          .then(res => {
            this.goodTypeOption = res.data
          })
    },
    edit(row) {
      this.dialogTitle = '编辑商品信息'
      this.addDialog = true
      this.$refs.dialog.formData = row
      this.$refs.dialog.action = 'edit'
    },
    view(row){

    },
    del(row){
      ElMessageBox.confirm('确认删除'+row.name+'?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
          .then(() => {
            request.delete(
                config.billHost + "/extra/goodsPrice/do/" + row.id)
                .then(res => {
                  if (res.code == 200) {
                    ElMessage({
                      message: "删除成功",
                      type: "success"
                    })
                  }
                  this.search()
                })
          })
          .catch(() => {
            ElMessage({
              message: "已取消删除",
              type: "info"
            })
          })
    }
  }
}
</script>

<style scoped>
.search-box {
  width: 100%;
  height: 50px;
  line-height: 50px;
  box-sizing: border-box;
  padding: 10px;
  background: #8FBEFA;
}

.main-box {
  width: 100%;
  height: calc(100vh - 70px - 60px - 40px);
  overflow: scroll;
}

::v-deep .el-table__cell {
  padding: 5px 0;
}

/*::v-deep .el-drawer__body{*/
/*  padding: 10px;*/
/*}*/

::v-deep .el-drawer__header {
  padding: 10px;
  margin-bottom: 0;
  background: #0077aa;
  color: #ffffff;
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
}
</style>