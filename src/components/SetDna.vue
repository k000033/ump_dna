<script>
import { computed, onMounted, reactive } from "vue-demi";
import { apiFetchSetDnaAgGridData } from "../componentAPI/index";
import LeftObjectAgGrid from "../components/LeftObjectAgGrid.vue";
import LeftDnaAgGrid from "../components/LeftDnaAgGrid.vue";
import RightObjectAgGrid from "../components/RightObjectAgGrid.vue";
import RightDnaAgGrid from "../components/RightDnaAgGrid.vue";
import { useStore } from "vuex";
export default {
  components: {
    LeftObjectAgGrid,
    RightObjectAgGrid,
    LeftDnaAgGrid,
    RightDnaAgGrid,
  },
  setup() {
    const store = useStore();
    /**
     * 模式
     * 0.商品模式 1.門市模式
     */
    const queryType = computed({
      get() {
        return store.getters["setDna/getQueryType"];
      },
      set(value) {
        store.dispatch("setDna/setQueryTypeAction", value);
      },
    });
    /**
     * 角度
     * 0.物件角度 1.DNA角度
     */
    const queryDnaType = computed({
      get() {
        return store.getters["setDna/getQueryDnaType"];
      },
      set(value) {
        store.dispatch("setDna/setQueryDnaTypeAction", value);
      },
    });

    const subMenuActive = computed(() => {
      return `${queryType.value}-${queryDnaType.value}`;
    });

    const { fetchLeftAgGrid } = apiFetchSetDnaAgGridData();

    const manu_select = (type) => {
      const typeAry = type.split("-");
      queryType.value = typeAry[0];
      queryDnaType.value = typeAry[1];
      fetchLeftAgGrid();
      //   queryType.value = type;
      //   fetchLeftAgGrid();
    };

    // const tab_click = (type) => {
    //   queryDnaType.value = type;
    //   fetchLeftAgGrid();
    // };

    onMounted(() => {
      console.log(1);
      fetchLeftAgGrid();
    });

    const openSubMenuAry = reactive(["0", "1"]);
    const isDisabled = computed(() => {
      const leftAgGridLoading = store.getters["setDna/getLeftAgGridLoading"];
      const RightAgGridLoading = store.getters["setDna/getRightAgGridLoading"];
      return leftAgGridLoading || RightAgGridLoading;
    });
    return {
      manu_select,
      //   tab_click,
      //   queryType,
      queryDnaType,
      openSubMenuAry,
      subMenuActive,
      isDisabled,
    };
  },
};
</script>

<template>
  <div class="setDnaWrap">
    <div class="dMenu">
      <!-- <el-menu
        :default-active="queryType"
        class="el-menu-vertical-demo"
        @select="manu_select"
      >
        <el-menu-item index="0">
          <el-icon><Goods /></el-icon>
          <template #title>商品模式</template>
        </el-menu-item>
        <el-menu-item index="1">
          <el-icon><Shop /></el-icon>
          <template #title>門市模式</template>
        </el-menu-item>
      </el-menu> -->
      <el-menu
        :default-active="subMenuActive"
        class="el-menu-vertical-demo"
        @select="manu_select"
        :default-openeds="openSubMenuAry"
      >
        <el-sub-menu index="0">
          <template #title>
            <el-icon><Goods /></el-icon>
            <span>商品模式</span>
          </template>
          <el-menu-item index="0-0" :disabled="isDisabled"
            >物件角度</el-menu-item
          >
          <el-menu-item index="0-1" :disabled="isDisabled"
            >DNA角度</el-menu-item
          >
        </el-sub-menu>
        <el-sub-menu index="1">
          <template #title>
            <el-icon><Shop /></el-icon>
            <span>門市模式</span>
          </template>

          <el-menu-item index="1-0" :disabled="isDisabled"
            >物件角度</el-menu-item
          >
          <el-menu-item index="1-1" :disabled="isDisabled"
            >DNA角度</el-menu-item
          >
        </el-sub-menu>
      </el-menu>
    </div>
    <div class="dMenuSwitchContent">
      <div class="settingContent">
        <div class="leftAgGrid">
          <LeftObjectAgGrid v-show="queryDnaType == '0'" />
          <LeftDnaAgGrid v-show="queryDnaType == '1'" />
        </div>
        <div class="dRightAgGridContent">
          <!-- <div class="dMenuSwitch">
            <el-button
              :type="queryDnaType == 0 ? 'primary' : 'default'"
              size="default"
              @click="tab_click(0)"
              >{{ "物件角度" }}</el-button
            >
            <el-icon><Switch /></el-icon>
            <el-button
              :type="queryDnaType == 1 ? 'primary' : 'default'"
              @click="tab_click(1)"
              >{{ "DNA角度" }}</el-button
            >
          </div> -->
          <div class="rightAgGrid">
            <RightObjectAgGrid v-show="queryDnaType == '0'" />
            <RightDnaAgGrid v-show="queryDnaType == '1'" />
          </div>
        </div>
      </div>

      <!-- <div class="dMenuSwitch">
        <el-button :key="'物件角度'" :type="'primary'" size="default" @click="tab_click(0)">{{
          "物件角度"
        }}</el-button>
        <el-icon><Switch /></el-icon>
        <el-button :key="'物件角度'" :type="'info'" @click="tab_click(1)">{{ "DNA角度" }}</el-button>
      </div>
      <div class="settingContent">
         <div class="leftAgGrid">
            <LeftObjectAgGrid/>
         </div>
         <div>

         </div>
         <div class="rightAgGrid">
           <RightObjectAgGrid/>
         </div>
      </div> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.setDnaWrap {
  display: flex;
  height: 100%;
  max-width: 1280px;
  margin: auto;
  .dMenu {
    //    width: 200px;
    height: 100%;
    margin-right: 30px;
    .el-menu-vertical-demo {
      height: 100%;
      width: 150px;
    }
    .el-menu-item {
      min-width: 150px;
    }
  }
  .dMenuSwitchContent {
    flex-grow: 1;
    height: 100%;
    .dMenuSwitch {
      display: flex;
      align-items: center;

      button {
        // margin: 0 12px;
        margin-right: 10px;
        &:last-child {
          margin-left: 10px;
        }
      }
    }
  }
  .settingContent {
    display: flex;
    width: 100%;
    height: 100%;
    .leftAgGrid {
      width: 480px;
      height: 100%;
      padding-right: 20px;
    }
    .rightAgGrid {
      flex-grow: 1;
      //   width: calc(100% - 420px - 20px);
      //   height: calc(100% - 32px - 10px);
      height: 100%;
      //   padding-top: 10px;
    }

    .dRightAgGridContent {
      flex-grow: 1;
    }
  }
}
.test {
  display: flex;
}
</style>
