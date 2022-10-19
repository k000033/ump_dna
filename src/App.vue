<template>
  <div class="box">
    <router-view />
  </div>
</template>

<style lang="scss">
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


/* Dialog */
.el-dialog__header {
  border-bottom: 1px solid #ccc !important;
  margin-right: 0px !important;
  padding: 1px 20px !important;
  background: #bddbfe66;
}
.el-dialog__header span {
  font-size: 14px !important;
}

.el-dialog__headerbtn {
  height: 20px !important;
}

.el-dialog__body {
  padding: 0px 0px !important;
}

// listAgGrid 右上設定按鈕
.dBtnGroup{
  .el-button{
    +.el-button{
      margin-left:0 !important ;
    }
  }
}

// Menu
.dSetDnaDlag{
  .is-active{
    background-color: #cbecff;
  }
}

.dResultContent{
  .addItem{
    color: #1ea51e !important; 
  }
  .removeItem{
      color: #fb0000 !important;
  }
}


</style>
