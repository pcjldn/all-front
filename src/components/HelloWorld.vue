<template>
  <div>
    <div class="body">
      <h1>{{ msg }}</h1>
    </div>
    <div class="footer">
      <a href="http://beian.miit.gov.cn/">蜀ICP备2023016439号</a>
    </div>

  </div>
</template>

<script setup>
const msg = "您好，欢迎！";
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
  width: 35em;
  margin: 0 auto;
  font-family: Tahoma, Verdana, Arial, sans-serif;
}

.body {
  position: absolute;
  top: 10px;
  left: 0;
  width: 100%;
  text-align: center;
}

.footer {
  text-align: center;
  font-size: 18px;
  position: absolute;
  bottom: 10px;
  left: 0;
  width: 100%;
}

a {
  text-decoration: none;
}

</style>

