<template>
  <div>
    <!-- 搜索区-->
    <div class="search_form" v-if="searchFields.length>0">
      <el-form :inline="true" label-width="auto">
        <el-row>
          <el-col v-for="item in searchFields" :key="item.prop" :span="item.span">
            <el-form-item :key="item.prop" :label="item.label" :prop="item.prop">
              <!--          <el-form-item v-for="item in searchFields" :key="item.prop" :label="item.label" :prop="item.prop">-->
              <!--            日期-->
              <el-date-picker clearable v-if="item.type === 'date'" style="width: 100%;"
                              v-model="search[item.prop]"
                              align="right"
                              type="date"
                              :placeholder="item.label"
                              :picker-options="pickerOptions">
              </el-date-picker>
              <!--            下拉框-->
              <el-select clearable v-else-if="item.type === 'select'" style="width: 100%;"
                         :filterable="item.search"
                         v-model="search[item.prop]"
                         :placeholder="item.label">
                <el-option v-for="option in item.options"
                           :key="option[item.value]"
                           :label="option[item.lableName]"
                           :value="option[item.value]"></el-option>
              </el-select>
              <!--            正常文本-->
              <el-input clearable :placeholder="item.label" v-else v-model="search[item.prop]" style="width: 100%;"
                        :type="item.type"></el-input>
            </el-form-item>
          </el-col>

          <el-col span="4" style="display:flex;min-width: 180px;align-items: flex-start">
            <el-form-item>
              <el-button type="primary" @click="searchData">查询</el-button>
              <el-button type="warning" @click="clearSearch">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <!-- 顶部操作区-->
    <div class="topButton" v-if="topButtons.length>0">
      <el-button v-for="btn in topButtons" :type="btn.type" :key="btn.label"
                 @click="btn.handler()">
        {{ btn.label }}
      </el-button>
    </div>

    <!-- 表格区-->
    <el-table :height="height" :border="isShowBorder" :data="tableData" style="width: 100%">
      <!-- 序号-->
      <el-table-column fixed="left" label="序号" type="index" width="50"></el-table-column>
      <!--主体部分-->
      <el-table-column :sortable="col.sort" v-for="col in visibleColumns" :width="col.width" :fixed="col.fixed"
                       :key="col.prop"
                       :prop="col.prop" :label="col.label">
        <template slot-scope="{row}">
          <div v-if="col.type=== 'text'">{{ row[col.prop] }}</div>
          <div v-else-if="col.type === 'button'">
            <el-button size="mini" v-for="btn in col.buttons" :type="btn.type" :key="btn.label"
                       @click="btn.handler(row)">
              {{ btn.label }}
            </el-button>
          </div>
          <div v-else-if="col.type==='date' && col.dateFormat === 'yyyy-MM-dd'">
            {{ new Date(row[col.prop]).toISOString().split('T')[0] }}
          </div>
          <div v-else>
            {{ new Date(row[col.prop]).toISOString().replace(/-/g, '-').replace('T', ' ').slice(0, 19) }}
          </div>
        </template>
      </el-table-column>
    </el-table>


    <!--分页组件-->
    <div class="pagination" v-if="isPagination && tableData.length>0" style="text-align: right">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize"
                     :total="paginationInfo.total"
                     layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>

    </div>
  </div>
</template>

<script>

export default {
  name: 'TableComponent',
  props: {
    /**
     * 是否显示边框
     */
    isShowBorder: {
      type: Boolean,
      default: () => true
    },
    height: {
      type: Number,
      default: () => 600
    },

    /**
     * 表格的列
     */
    tableColumns: {
      type: Array,
      default: () => []
    },

    /**
     * 表格数据
     */
    tableData: {
      type: Array,
      default: () => []
    },

    /**
     * 搜索字段
     */
    searchFields: {
      type: Array,
      default: () => []
    },

    /**
     * 顶部按钮区
     */
    topButtons: {
      type: Array,
      default: () => []
    },

    /**
     * 搜索方法
     */
    searchMethod: {
      type: Function,
      default: () => {
      }
    },

    /**
     * 点击添加按钮方法
     */
    addNew: {
      type: Function,
      default: () => {
      }
    },

    /**
     * 隐藏的列
     */
    hiddenColumns: {
      type: Array,
      default: () => []
    },

    /**
     * 是否分页
     */
    isPagination: {
      type: Boolean,
      default: () => true
    },

    paginationInfo: {
      type: Map,
      default: () => {

      }
    },

    /**
     * 默认分页大小
     */
    pageSize: {
      type: Number,
      default: () => 10
    },

    /**
     * 当前页
     */
    currentPage: {
      type: Number,
      default: () => 1
    },

    pageSizes: {
      type: Array,
      default: () => [10, 20, 30, 40, 50]
    },

    pickerOptions: {
      shortcuts: [{
        text: '今天',
        onClick(picker) {
          picker.$emit('pick', new Date());
        }
      }, {
        text: '昨天',
        onClick(picker) {
          const date = new Date();
          date.setTime(date.getTime() - 3600 * 1000 * 24);
          picker.$emit('pick', date);
        }
      }, {
        text: '一周前',
        onClick(picker) {
          const date = new Date();
          date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
          picker.$emit('pick', date);
        }
      }]
    },
  },

  created() {
    let that = this
    document.onkeydown = function (e) {
      e = window.event || e
      // 验证在登录界面和按得键是回车键enter
      if (e.code === 'Enter' || e.code === 'enter') {
        // 登录事件
        that.searchData()
      }
    }
  },
  data() {
    return {
      search: {},

    }
  },

  computed: {
    /**
     * 计算可以显示的列
     * @returns {*[]}
     */
    visibleColumns() {
      return this.tableColumns.filter(col => !this.hiddenColumns.includes(col.prop))
    }
  },

  methods: {
    /**
     * 清空搜索框并刷新表格
     */
    clearSearch() {
      for (let key in this.search) {
        this.$set(this.search, key, '');
      }
      this.searchData();
    },

    /**
     * 调用父类的搜索方法
     */
    searchData() {
      this.searchMethod(this.search, this.currentPage, this.pageSize)
    },
    /**
     * 监听分页大小
     * @param val
     */
    handleSizeChange(val) {
      this.pageSize = val;
      this.searchMethod(this.search, this.currentPage, val)
    },

    /**
     * 监听当前页更改
     * @param val
     */
    handleCurrentChange(val) {
      this.currentPage = val;
      this.searchMethod(this.search, val, this.pageSize)
    }
  }
}
</script>

<style scoped>
.topButton {
  display: block;
  text-align: left;
  box-sizing: border-box;
  padding: 0 10px;
}

.search_form {
  display: block;
  text-align: left;
  box-sizing: border-box;
  padding: 0 10px;
}
</style>
