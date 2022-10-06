<script>
import { computed, ref } from "vue-demi";
import { useStore } from 'vuex';
export default {
  setup() {
    const store  = useStore();

    // 當前 Menu選單
    const currMenu = computed({ get() {
      return store.getters["getCurrMenu"];
    }, set(value) {
      store.dispatch('setCurrMenuAction',value);
    } });

    /**
     * 切換 Tabs
     * @param {String} menuString
     */
    const menu_clcik = (menuString) => {
      currMenu.value = menuString;
    };
    return { currMenu, menu_clcik };
  },
};
</script>

<template>
  <div class="wrap">
    <div class="title">
      <span>DNA@UMP</span>
    </div>
    <div class="dnav">
      <nav>
        <a
          :class="{ active: currMenu == 'DnaAgGrid' }"
          href="javascript:;"
          @click="menu_clcik('DnaAgGrid')"
          >DNA清單</a
        >
        <a
          :class="{ active: currMenu == 'SetDna' }"
          href="javascript:;"
          @click="menu_clcik('SetDna')"
          >設定</a
        >
      </nav>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrap {
  background: #22222a;
  color: #fff;
  display: flex;
  padding: 8px 30px;
  align-items: flex-end;
  .title {
    font-size: 25px;
    background: linear-gradient(to top, #efcb68, #e1efe6);
    -webkit-background-clip: text;
    color: transparent;
    margin-right: 30px;
  }
  .dnav {
    margin-left: 50px;
    a {
      text-decoration: none;
      color: #fff;
      position: relative;
      margin-right: 32px;

      &.active {
        &::after {
          content: "";
          height: 2px;
          background: #fff;
          width: 100%;
          position: absolute;
          bottom: -7px;
          left: 0;
          animation: test 0.4s;
        }
      }
    }
  }
}

@keyframes test {
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
}
</style>
