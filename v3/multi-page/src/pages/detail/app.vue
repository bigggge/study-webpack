<template>
  <div id="app">
    <el-card class="index-card">
      <div slot="header">
        My Codes
      </div>
      <ul>
        <li>
          <a href="home.html">
            Go Home
          </a>
        </li>
        <li>
          <a href="#" target="_blank">
            Element China Area Data
          </a>
        </li>
      </ul>
    </el-card>
  </div>
</template>

<script>
  import logo from 'assets/img/logo.png';
  export default {
    data () {
      return {
        msg: 'Use Vue 2.0 Today!',
        logoImg: logo
      };
    },
    methods: {}
  };
</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss">
  .index-card {
    width: 800px;
    margin: 100px auto;
    div {
      color: palevioletred;
    }
  }
</style>
