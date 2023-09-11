<template>
  <div>
    <div class="login-box">
      <el-form :inline="true" :model="userInfo" class="demo-form-inline">
        <el-form-item label="用户名">
          <el-input v-model="userInfo.user" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="userInfo.user" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request.ts";
import config from "@/config/config.ts";

export default {
  name: "FileUpdate",
  data(){
    return{
      userInfo:{
        user: "admin",
        pwd: "hbdl9431",
      }
    }
  },
  mounted() {
    this.query()
  },
  methods:{
    login(){
      request({
        url: config.companyFileHost + "/chfs/session",
        data: this.userInfo
      }).then(res=>{
        console.log(res)
      })
    },
    query(){
      request.get(config.companyFileHost + "/chfs/files?filepath=/卓越绩效/fdmis&_=1693469396172",).then(res=>{
        console.log(res)
      })
    }
  }
}
</script>

<style scoped>

</style>