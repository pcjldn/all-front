<template>
<div class="main-box">
  <h1>快捷登录</h1>
  <ul class="user-check">
    <li @click="login('admin')">admin</li>
    <li @click="login('shangbi')">尚嬖</li>
    <li @click="login('chenxinhua')">陈欣华</li>
    <li @click="login('huangxiaoping')">黄晓萍</li>
    <li @click="login('pangleguang')">庞乐光</li>
    <li @click="login('xuyaodong')">徐耀东</li>
  </ul>
</div>
</template>

<script>
import request from "@/utils/request.ts";
import config from "@/config/config.ts";

export default {
  name: "CwNoPwdLogin",
  methods: {
    login(user){
      request({
        url: config.srjtHost + `/fdWisEas/v1/noPwdLogin`,
        data: {
          "user": user
        }
      }).then(res => {
        window.open(config.srjtFront+"/index?token="+res.value.token, '_blank');
      })
    }
  }
}
</script>

<style scoped lang="scss">
.main-box{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.user-check{
  list-style: none;

  li{
    height: 35px;
    line-height: 35px;
    cursor: pointer;
  }
}
</style>