<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $text-font-size;
  background: #F2F4F7;
}

.el-table {
  border: #DDDDDD 1px solid;
  padding: 0 !important;
  border-color: #DDDDDD !important;

  th {
    background: #EFEFEF !important;
    border-color: #DDDDDD !important;
  }

  td {
    border-color: #DDDDDD !important;
  }
}

</style>
