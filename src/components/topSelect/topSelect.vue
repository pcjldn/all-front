<template>
  <div class="box">
    <el-form  class="demo-form-inline">
      <el-form-item :style="{width:props.width}" v-for="item,index in props.list" :key="index" :label="item.label">
        <el-input clearable  v-model="item.value" placeholder="请输入" v-if="item.type === 'input'" />
        <el-select clearable v-model="item.value" class="m-2" placeholder="请选择" size="large" v-if="item.type === 'select'">
          <el-option
              v-for="items in item.options"
              :key="items[item.values]"
              :label="items[item.labels]"
              :value="items[item.values]"
          />
        </el-select>
        <el-date-picker
            v-if="item.type === 'date'"
            v-model="item.value"
            type="date"
            placeholder="请选择日期"
        />
      </el-form-item>
    </el-form>
    <div class="buttons">
      <el-button type="primary" @click="submit">查询</el-button>
      <el-button type="warning" @click="reset">重置</el-button>
    </div>
  </div>
</template>

<script setup>
  import { ref,defineProps,defineEmits } from 'vue'
  const props = defineProps({
    list: {
      type: Array,
      default:()=>[]
    },
    width:{
      type:String,
      default:()=>'300px'
    }
  })
  const search = ref({})
  const emit = defineEmits(['submit','reset'])
  function submit(){
    props.list.forEach(item=>{
      if(item.type === 'date'){
        if(item.value){
          search.value[item.prop] = item.value.toLocaleDateString().split('/').join('-')
        }else {
          search.value[item.prop] = ''
        }
      }else {
        search.value[item.prop] = item.value
      }
    })
    emit('submit',search)
  }
  function reset(){
    search.value = {}
    props.list.forEach(item=>{
      item.value = ''
    })
    emit('submit',search)
  }
  //样式
  const topHeight = '32px'
</script>

<style scoped lang="scss">
  .box{
    width: 100%;
    height: v-bind(topHeight);
    display: flex;
    justify-content: space-between;
    .demo-form-inline{
      display: flex;
      justify-content: space-around;
      width: calc(100% - 162px);
      height: v-bind(topHeight);
      ::v-deep{
        .el-form-item{
          height: v-bind(topHeight);
        }
        .el-input__wrapper{
          height: v-bind(topHeight);
        }
      }
    }
    .buttons{
      width: 132px;
      display: flex;
      justify-content: space-between;
      .el-button{
        width: 60px;
      }
    }
  }
</style>