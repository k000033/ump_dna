<script>
export default {
  setup() {
    return {};
  },
};
</script>

<template>
  <div class="wrap">
    <div class="content">
      <span>DNA@UMP</span>
    </div>
    <div class="dnav">
      <nav>
        <!-- <a href="javascript:;">新增</a> -->
      </nav>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrap {
  background: #22222a;
  color: #fff;
  display: flex;
  padding: 8px 16px;
  align-items: flex-end;
  .content {
    font-size: 25px;
    background: linear-gradient(to top, #efcb68, #e1efe6);
    -webkit-background-clip: text;
    color: transparent;
  }
  .dnav {
    margin-left: 50px;
    a {
      text-decoration: none;
      color: #fff;
      position: relative;

      &::after {
        content: "";
        height: 2px;
        background: #fff;
        width: 0%;
        position: absolute;
        bottom: 0;
        left: 0;
        transition: 0.2s;
      }

      &:hover::after {
        content: "";
        width: 100%;
      }
    }
  }
}
</style>
