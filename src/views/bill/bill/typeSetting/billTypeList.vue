<template>
  <div class="list-box">
    <div class="return-btn">
      <div class="return-icon">
        <el-icon @click="$router.go(-1)" style="font-weight: bold;color: white;cursor: pointer">
          <ArrowLeft/>
        </el-icon>
      </div>
      <div class="title">账单类型</div>
      <div class="addNew">
        <el-button type="primary" @click="addDialog = true" style="color: #ffffff">
          <el-icon style="font-size: 20px">
            <CirclePlus/>
          </el-icon>
        </el-button>
      </div>
    </div>

    <div class="search-box">

    </div>

    <div class="table-box">
      <el-table :data="tableData" height="100%" border style="width: 100%">
        <el-table-column prop="typeName" label="名称" min-width="70">
          <template #default="{row}">
            <div style="height: 30px;line-height: 30px;display: flex;padding-left: 10px">
              <img :src="row.picUrl" style="width: 30px;height: 30px"/>
              <span style="padding-left: 10px">{{ row.typeName }}</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="action" label="操作" min-width="165">
          <template #default="{row}">
            <div style="padding-left: 10px">
              <!--              <el-button type="primary" size="small">编辑</el-button>-->
              <!--              <el-button style="padding-left: 5px" type="danger" size="small">删除</el-button>-->
              <!--              <el-button style="padding-left: 5px" type="warning" size="small" @click="del(row)">删除</el-button>-->
              <!--              <el-button style="padding-left: 5px" type="warning" size="small" @click="del(row)">删除</el-button>-->
              <!--              <el-button style="padding-left: 5px" type="primary" size="small" @click="del(row)">删除</el-button>-->
              <el-button type="primary" @click="edit(row)" circle>
                <el-icon>
                  <Edit/>
                </el-icon>
              </el-button>
              <el-button type="danger" :icon="Delete" @click="del(row)" circle/>
              <el-button type="success" circle>
                <el-icon><ArrowUp /></el-icon>
              </el-button>
              <el-button type="info" circle>
                <el-icon><ArrowDown /></el-icon>
              </el-button>
              <el-button type="warning" circle>
                <el-icon><Upload /></el-icon>
              </el-button>

            </div>

          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request.ts";
import config from "@/config/config.ts";
import {Delete} from "@element-plus/icons-vue";

export default {
  name: "billTypeList",
  computed: {
    Delete() {
      return Delete
    },
    Star() {
      return Star
    },
    Message() {
      return Message
    },
    Check() {
      return Check
    }
  },
  data() {
    return {
      tableData: [],
      addDialog: ''
    }
  },
  mounted() {
    this.search()
  },
  methods: {
    search() {
      request.get(config.billHost + "/extra/billType/do/?{%22page%22:1,%22limit%22:10}")
          .then(res => {
            this.tableData = res.data
          })
    },
    edit(row) {

    },
    del(row) {

    }
  }
}
</script>

<style scoped>
.list-box {
  height: 100%;
  width: 100%;
}

.table-box {
  width: 100%;
  height: calc(100vh - 70px - 50px);
  overflow: scroll;
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

.el-table__cell {
  padding: 0;
}

::v-deep .cell {
  padding: 0;
}
</style>