<template>
  <div id="app">
    <MindMap mode="edit" />
  </div>
</template>

<script>
import MindMap from './components/MindMap'

export default {
  name: 'App',
  components: {
    MindMap
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
}
[class^="el-icon-fa"], [class*=" el-icon-fa"] {
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome!important;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
};

$fa-css-prefix: el-icon-fa;
$fa-font-path: "~@/../node_modules/font-awesome/fonts";

@import '~@/../node_modules/font-awesome/scss/font-awesome.scss';
@import './assets/scss/gr-icon.scss';
</style>
