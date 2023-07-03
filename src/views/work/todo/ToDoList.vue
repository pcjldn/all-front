<template>
  <div>
    <!--树区域-->
    <!--    <div class="tree-box"></div>-->
    <!--主区域-->
    <div class="main-box">
      <!--搜索区-->
      <div class="search-box">
        <el-form
            label-width="100px"
            :model="searchData"
            label-suffix=":"
        >
          <el-row gutter="40">
            <el-col :span="5">
              <el-form-item label="待办类型">
                <el-select v-model="searchData.todoType" class="m-2" placeholder="请选择" style="width: 100%">
                  <el-option
                      v-for="item in todoTypeOptions"
                      :key="item.id"
                      :label="item.typeName"
                      :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="状态">
                <el-select v-model="searchData.status" class="m-2" placeholder="请选择" style="width: 100%">
                  <el-option
                      v-for="item in statusOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="所属用户">
                <el-select v-model="searchData.todoUserId" class="m-2" placeholder="请选择" style="width: 100%">
                  <el-option
                      v-for="item in userOptions"
                      :key="item.id"
                      :label="item.userName"
                      :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="待办内容">
                <el-input type="text" v-model="searchData.todoContent"/>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-button type="primary" @click="getTodo">查询</el-button>
              <el-button type="warning" @click="clearSearchAndQuery">重置</el-button>
            </el-col>
          </el-row>
        </el-form>


      </div>
      <!--顶部按钮-->
      <div class="top-action-box">
        <el-button type="primary" @click="add">新增</el-button>
      </div>
      <!--表格-->
      <div class="table">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column fixed prop="todoTypeName" label="待办类型" width="150"/>
          <el-table-column prop="todoContent" label="待办内容" width="500"/>
          <el-table-column prop="statusName" label="待办状态">
            <template #default="{ row }">
              <span :class="row.status === 1? 'waitToDo' :'readyDo'">
                {{ row.statusName }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="todoUserName" label="所属用户"/>
          <el-table-column prop="createTime" label="创建时间">
            <template #default="{ row }">
              {{ formatDate(row.createTime) }}
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="200">
            <template #default="{ row }">
              <el-button link type="primary" size="small" @click="editForm(row)">编辑</el-button>
              <el-button link type="primary" size="small" @click="readyDo(row)">已同步</el-button>
              <el-button link type="primary" size="small" @click="delData(row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>


    <!--抽屉-->
    <el-drawer v-model="drawer" :direction="direction" size="50%" :before-close="closeDrawer">
      <template #header>
        <h4>{{ formTitle }}</h4>
      </template>
      <el-form
          label-position="top"
          label-width="100px"
          :model="formData"
          label-suffix=":"
      >
        <el-row gutter="40">
          <el-col :span="12">
            <el-form-item label="待办类型">
              <el-select v-model="formData.todoType" class="m-2" placeholder="请选择" style="width: 100%">
                <el-option
                    v-for="item in todoTypeOptions"
                    :key="item.id"
                    :label="item.typeName"
                    :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态">
              <el-select v-model="formData.status" class="m-2" placeholder="请选择" style="width: 100%">
                <el-option
                    v-for="item in statusOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属用户">
              <el-select v-model="formData.todoUserId" class="m-2" placeholder="请选择" style="width: 100%">
                <el-option
                    v-for="item in userOptions"
                    :key="item.id"
                    :label="item.userName"
                    :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="待办内容">
              <el-input type="textarea" rows="3" v-model="formData.todoContent"/>
            </el-form-item>
          </el-col>

        </el-row>
      </el-form>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelClick">取消</el-button>
          <el-button type="primary" @click="confirmClick">确认</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import request from "@/utils/request.ts";
import config from "@/config/config.ts";
import {ElMessage} from "element-plus";
import $ from 'jquery'

const tableData = ref([])
const drawer = ref(false)
const direction = ref('rtl')
const formTitle = ref('待办详情')
const searchData = ref({});
const formData = ref({});

const statusOptions = ref([
  {
    label: "未同步",
    value: 1
  },
  {
    label: "已同步",
    value: 2
  }
]);
const userOptions = ref([]);
const todoTypeOptions = ref([]);


const mount = () => {
  getTodo();
  getUserCheck();
  getTodoTypeOptions();
};

function getTodo() {
  request({
    url: config.workHost + "/workTodo/queryByInfo",
    data: searchData.value
  }).then(res => {
    tableData.value = res.data;
  })
}

// 挂载渲染函数
onMounted(mount);
/**
 * 时间转换
 * @param timestamp
 * @returns {`${number}-${string}-${string}`}
 */
const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
};

function add() {
  drawer.value = true;
  formData.value.status = 1;
}

function editForm(row) {
  drawer.value = true;
  formData.value = $.extend({}, row);
}

function clearSearchAndQuery() {
  for (let valueKey in searchData.value) {
    searchData.value[valueKey] = ''
  }
  getTodo()
}

function readyDo(row) {
  row.status = 2;
  request({
    url: config.workHost + "/workTodo/insertOrUpdate",
    data: row
  })
      .then(res => {
        if (res.code === 200) {
          ElMessage({
            message: "操作成功",
            type: "success"
          })
          drawer.value = false;

          getTodo();
          clearFormData()
        } else {
          ElMessage.error("操作失败");
        }
      })
      .catch(() => {
        ElMessage.error("操作异常");
      })
}

function delData(row) {
  request({
    url: config.workHost + "/workTodo/del",
    data: row
  })
      .then(res => {
        if (res.code === 200) {
          ElMessage({
            message: "删除成功",
            type: "success"
          })

          getTodo();
        } else {
          ElMessage.error("删除失败");
        }
      })
      .catch(() => {
        ElMessage.error("删除异常");
      })
}

const closeDrawer = (done) => {
  clearFormData();
  done();
}

// ------------------表单方法
function getUserCheck() {
  request(config.workHost + "/ucUser/queryByInfo")
      .then(res => {
        userOptions.value = res.data;
      })
      .catch(() => {
        ElMessage.error("获取人员信息出错了");
      })
}

function getTodoTypeOptions() {
  request(config.workHost + "/workTodoType/queryByInfo")
      .then(res => {
        todoTypeOptions.value = res.data;
      })
      .catch(() => {
        ElMessage.error("获取待办类型出错了");
      })
}

function cancelClick() {
  drawer.value = false;
  clearFormData()
}

function confirmClick() {
  request({
    url: config.workHost + "/workTodo/insertOrUpdate",
    data: formData.value
  })
      .then(res => {
        if (res.code === 200) {
          ElMessage({
            message: "操作成功",
            type: "success"
          })
          drawer.value = false;

          getTodo();
          clearFormData()
        } else {
          ElMessage.error("保存失败");
        }
      })
      .catch(() => {
        ElMessage.error("保存失败");
      })
}

function clearFormData() {
  for (let valueKey in formData.value) {
    formData.value[valueKey] = '';
  }
}
</script>


<style scoped>
.waitToDo {
  color: red;
}

.readtyDo {
  color: green;
}
</style>