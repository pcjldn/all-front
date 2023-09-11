<template>
<div>
  <div class="search-box">
    <el-form :inline="true" :model="searchData" class="search-form">
      <el-row>
        <el-col :span="9">
          <el-form-item label="">
            <el-input style="width: 100%" v-model="searchData.goodName" placeholder="商品名" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label="">
            <el-select style="width: 100%"
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
      <el-table-column prop="name" label="名称"  />
      <el-table-column prop="minPrice" label="价格"  >
        <template #default="scope">
        <span>{{scope.row.price}}(
          <span style="color: #0077aa;">{{scope.row.minPrice}}</span>
          /
          <span style="color: red;"> {{scope.row.maxPrice}}</span>)</span>
        </template>
      </el-table-column>
      <el-table-column prop="typeName" label="类型" />
    </el-table>
  </div>
</div>
</template>

<script>
import request from "@/utils/request.ts";
import config from "@/config/config.ts";

export default {
  name: "index",
  data(){
    return{
      tableData:[],
      searchData: {
        goodName: '',
        goodtype: ''
      },
      goodTypeOption: [],
    }
  },
  mounted() {
    this.init();
  },
  methods:{
    init(){
      this.search()
      this.getGoodTypeOption()
    },
    search(){
      request.post(
        config.billHost + "/extra/goodsPrice/devide",
        {
          "nameOrId":this.searchData.goodName,
          "typeId": this.searchData.goodtype
        }
    )
          .then(res=>{
            this.tableData = res.data
          })
    },
    getGoodTypeOption(){
      request.get(config.billHost + "/extra/goodsType/do")
          .then(res=>{
            console.log(res)
            this.goodTypeOption = res.data
          })
    }
  }
}
</script>

<style scoped>
.search-box{
  width: 100%;
  height: 50px;
  line-height: 50px;
  box-sizing: border-box;
  padding: 10px;
  background: #2c3e50;
}
.main-box{
  width: 100%;
  height: calc(100vh - 70px - 60px);
  overflow: scroll;
}
</style>