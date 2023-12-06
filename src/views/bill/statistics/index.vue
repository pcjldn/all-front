<template>
<div class="main-box">
  <div class="type-check-box">
    <div class="type-item" :class="{'active': nowType == 1}" @click="nowType = 1"> 天 </div>
    <div class="type-item" :class="{'active': nowType == 2}" @click="nowType = 2"> 周 </div>
    <div class="type-item" :class="{'active': nowType == 3}" @click="nowType = 3"> 月 </div>
    <div class="type-item" :class="{'active': nowType == 4}" @click="nowType = 4"> 年 </div>
  </div>

  <div class="statistics-box">
<!--    <router-view></router-view>-->
    <day v-if="nowType == 1"></day>
    <week v-if="nowType == 2"></week>
    <month v-if="nowType == 3"></month>
    <year v-if="nowType == 4"></year>
  </div>
</div>
</template>

<script>
import Day from "@/views/bill/statistics/components/day.vue";
import Month from "@/views/bill/statistics/components/month.vue";
import Week from "@/views/bill/statistics/components/week.vue";
import Year from "@/views/bill/statistics/components/year.vue";

export default {
  name: "statistics",
  components: {Year, Week, Month, Day},
  data(){
    return {
      nowType: 2
    }
  },
  watch:{
    nowType:{
      immediate: true,
      handler(newVal){

      }
    }
  },
  mounted() {
    // location.href = "http://bill.myloverdn.top"
  }
}
</script>

<style scoped lang="scss">
.main-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #F2F4F7;
  height: 100%;
  box-sizing: border-box;
}

.type-check-box{
  width: 100%;
  text-align: right;
  height: 40px;
  line-height: 40px;
  padding-right: 10px;
  box-sizing: border-box;

  .type-item{
    display: inline-block;
    width: 50px;
    height: 40px;
    line-height: 40px;
    font-size: 1.1rem;
    text-align: center;
    background-color: white;
  }
  .type-item.active{
    background-color: #01AAED;color: white
  }
}

.statistics-box{
  width: 100%;
  box-sizing: border-box;
   //70px是底部 40px是类型选择高度
  height: calc(100vh - 70px - 40px);
}


</style>