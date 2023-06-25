<template>
  <div class="hello">
   111111111,br
  </div>
</template>

<script>
import request from "@/utils/request";

export default  {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  mounted() {
    request({
      url:"http://101.132.187.55:8088/extra/goodsType/do",
      method:"get"
    })
        .then(res=>{
          console.log(res)
        }).catch(err=>{
          console.log(err)
    });

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
