<template>
  <div class="main-box">
    <div class="return-btn">
      <div class="return-icon">
        <el-icon @click="$router.go(-1)" style="font-weight: bold;color: white;cursor: pointer">
          <ArrowLeft/>
        </el-icon>
      </div>
      <div class="title">类型管理</div>
      <div class="addNew">

      </div>
    </div>
    <div class="dic-box">
      <div class="dic-type-box">
        <div class="item-main">
          <ul class="type-ul">
            <li :class="{'active': dicTypeActive == item.key}" v-for="(item,index) in dicType" @click="searchDic(item.key);dicTypeActive = item.key;">{{ item.value }}</li>
          </ul>
        </div>
        <div class="item-button">
<!--          <span class="add-btn" style="color: #9a6e3a">添加</span>-->
        </div>
      </div>
      <div class="dic-main-box" style="z-index: 1000">
        <div class="item-main item-main-2">
          <ul class="dic-ul">
            <li v-for="(item,index) in dicTableData">
              <div style="height:40px;line-height: 40px;display: flex;align-items: center">
                <div v-if="typeof (item.picUrl) != 'undefined'" style="width: 30px;height: 30px;margin-right: 10px">
                  <img :src="item.picUrl" style="width: 30px;height: 30px;box-sizing: border-box;" alt="">
                </div>
                <div style="width: 100px;;box-sizing: border-box;height: 40px;">{{ item.typeName }}</div>
                <div style="width: calc(100% - 30px - 100px);;height:40px;box-sizing: border-box;border-left: #2c3e50 1px solid;padding-left: 10px">
                  <el-button type="primary" @click="edit(row)" circle>
                    <el-icon>
                      <Edit/>
                    </el-icon>
                  </el-button>
                  <el-button type="danger" :icon="Delete" @click="del(row)" circle/>
<!--                  <el-button type="success" circle>-->
<!--                    <el-icon><ArrowUp /></el-icon>-->
<!--                  </el-button>-->
<!--                  <el-button type="info" circle>-->
<!--                    <el-icon><ArrowDown /></el-icon>-->
<!--                  </el-button>-->
<!--                  <el-button type="warning" circle>-->
<!--                    <el-icon><Upload /></el-icon>-->
<!--                  </el-button>-->
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="item-button">
<!--          <el-button type="primary" @click="edit(row)" circle>-->
<!--            <el-icon>-->
<!--              <Edit/>-->
<!--            </el-icon>-->
<!--          </el-button>-->
<!--          <el-button type="danger" :icon="Delete" @click="del(row)" circle/>-->
      <div style="height: 50px">
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request.ts";
import config from "@/config/config.ts";
import {Delete} from "@element-plus/icons-vue";

export default {
  name: "dicConfig",
  computed: {
    Delete() {
      return Delete
    }
  },
  data() {
    return {
      dicTypeActive: 1,
      dicType: [
        {
          key: '1',
          value: '账单类型'
        },
        {
          key: '2',
          value: '菜品类型'
        }
      ],
      dicTableData: []
    }
  },
  mounted() {
    this.$nextTick(()=>{
      this.searchDic(this.dicTypeActive)
    })
  },
  methods:{
    searchDic(key){
      if(key == '1'){
        this.queryBillType("billType")
      }else if(key == '2'){
        this.queryBillType("goodsType")
      }
    },
    queryBillType(type){
      request.get(config.billHost + "/extra/"+type+"/do/?{%22page%22:1,%22limit%22:10}")
          .then(res => {
            this.dicTableData = res.data
          })
    }
  }
}
</script>

<style scoped lang="scss">
.main-box {
  background: #ffffff;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  .dic-box {
    width: 100%;
    display: flex;
    height: calc(100vh - 40px - 70px);
    box-sizing: border-box;

    .dic-type-box {
      width: 30%;
      height: 100%;
      box-sizing: border-box;
      border-right: #bbbdbe 1px solid;
    }

    .dic-main-box {
      width: 70%;
      height: 100%;
      box-sizing: border-box;
      //background: #01AAED;
    }

    .item-main{
      height: calc(100% - 50px);
      box-sizing: border-box;
    }

    .item-main-2{
      height: calc(100% - 50px);
      box-sizing: border-box;
      overflow-y: scroll;
    }

    .item-button{
      height: 50px;
      border-top: #01AAED 1px solid;
      box-sizing: border-box;
      line-height: 50px;
      font-size: 1.2rem;
      text-align: center;
    }
  }
}

.type-ul,.dic-ul{
  list-style: none;
  margin: 0;
  padding: 0;
  box-sizing: border-box;

  li{
    box-sizing: border-box;
    width: 100%;
    height: 40px;
    line-height: 40px;
    //text-align: center;
    padding-left: 10px;
    font-size: 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  li.active{
    background: #EDEFF0;
    color: #9a6e3a;
    font-size: 18px;
    overflow: visible;
  }
}

.dic-ul li{
  border-bottom: #2c3e50 1px solid;
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
}
</style>
