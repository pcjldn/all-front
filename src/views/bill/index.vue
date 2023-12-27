<template>
  <div style="height: 100vh">
    <div class="main-area">

      <router-view></router-view>
    </div>
    <div class="footer-area">
      <div class="tab-item" @click="activeTab=0;$router.push('/bill/saveMoney')">
        <el-icon v-if="activeTab == 0"><Reading /></el-icon>
        <el-icon v-else><Collection /></el-icon>

        字典
      </div>
      <div class="tab-item" @click="activeTab=1;$router.push('/bill/index')">
        <el-icon v-if="activeTab == 1"><Edit /></el-icon>
        <el-icon v-else><EditPen /></el-icon>
        记账
      </div>
      <div class="tab-item" @click="activeTab=2;$router.push('/bill/price')">
        <el-icon v-if="activeTab == 2"><Filter /></el-icon>
        <el-icon v-else><Setting /></el-icon>
        菜价
      </div>
      <div class="tab-item" @click="activeTab=3;$router.push('/bill/statistics')">
        <el-icon v-if="activeTab == 3"><PieChart /></el-icon>
        <el-icon v-else><Histogram /></el-icon>
        统计
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: "index",
  data() {
    return {
      activeTab: 1
    }
  },
  mounted() {
    this.tabInit(this.activeTab)


  },
  watch: {
    activeTab: {
      immediate: true,
      handler(newVal) {
        $(".tab-item").removeClass("is_active");
        $(".tab-item").eq(newVal).addClass("is_active");
      }
    }
  },
  methods:{
    tabInit(activeTab){
      $(".tab-item").removeClass("is_active");
      $(".tab-item").eq(activeTab).addClass("is_active");
      if(activeTab == 0){
        this.$router.push('/bill/saveMoney')
      }else if(activeTab == 1){
        this.$router.push('/bill/index')
      }else if(activeTab == 2){
        this.$router.push('/bill/price')
      }else if(activeTab == 3){
        this.$router.push('/bill/statistics')
      }

    }
  }
}
</script>

<style scoped lang="scss">
.main-area {
  height: calc(100vh - 70px);
  background: #ffffff;
  overflow: hidden;
}

.footer-area {
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border-top: #EDEFF0 1px solid;
  //background: #EDEFF0;

  .tab-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 25%;
    text-align: center;
    font-size: 18px;
    height: 70px;
    line-height: 35px;
    color: #333333;
    transition: all 0.3s ease-in;
  }

  .tab-item.is_active {
    width: 25%;
    text-align: center;
    font-size: 21px;
    color: #9a6e3a;
    //background: #8FBEFA;
    font-weight: bold;
  }
}
</style>
