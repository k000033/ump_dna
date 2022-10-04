<template>
  <div class="box">
    <router-view />
  </div>
</template>

<style>
* {
  padding: 0;
  margin: 0;
}

html,
body {
  height: 100%;
}

#app {
  height: 100%;
}

.box {
  height: 100%;
}
.ag-watermark{
  display: none !important;
}

.align_left{
    text-align: right ;
  }
</style>
