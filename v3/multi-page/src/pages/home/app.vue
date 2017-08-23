<template>
  <div id="app">
    <div class="dd">
      Home
    </div>
    <img v-bind:src="logoImg">
    <h1></h1>
    <el-button @click.native="startHacking">Let's do it</el-button>
    <el-button @click.native="goDetail()">Go Detail</el-button>
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

    methods: {
      startHacking () {
        this.$notify({
          title: 'It Works',
          message: 'We have laid the groundwork for you. Now it\'s your time to build something epic!',
          duration: 6000
        });
      },

      goDetail () {
        location.assign('../detail.html');
      }

    }
  };
</script>

<!--<style lang="postcss">-->
<!--body {-->
<!--background-color: #f5f5f5;-->
<!--}-->

<!--:root h1 {-->
<!--&#45;&#45;color: red;-->
<!--display: flex;-->
<!--color: var(&#45;&#45;color);-->
<!--}-->
<!--</style>-->

<style scoped>
  #app {
    background-color: gainsboro;
  }
</style>
