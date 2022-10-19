<script>
import { computed, ref } from "vue-demi";
import { useStore } from "vuex";
import CheckItemAgGrid from "./CheckItemAgGrid.vue";
import ResultAgGrid from './ResultAgGrid.vue';
import { apiFetchSetDnaDataAction } from "../../componentAPI/index";
export default {
  components: {
    CheckItemAgGrid,ResultAgGrid
  },
  setup() {
    const store = useStore();
    const { fetchSetDnaList } = apiFetchSetDnaDataAction();
    /**
     * set 目前選取的 Menu
     */
    const setMenuIndex = computed({
      get() {
        return store.getters["setDna/getMenuIndex"];
      },
      set(value) {
        store.dispatch("setDna/setMenuIndexAction", value);
      },
    });

       const getRowData = computed(() => {
      return store.getters["setDna/getRowData"];
    });
    
    /**
     * 取得 目前的分頁 0.設定Dna  1.設定結果
     * 用來切換是顯示 CheckItemAgGrid / ResultAgGrid
     */
    const getPage = computed(()=>{
      return store.getters['setDna/getPage'];
    });

    // const defaultMenu = ref("0");
    // const getOpenSetDnaDialog = computed(() => {
    //   return store.getters["setDna/getOpenSetDnaDialog"];
    // });
    
    /**
     * 取得設定Dna Dialog 開關狀態
     */
    const getOpenSetDnaDialog = computed({
      get() {
        return store.getters["setDna/getOpenSetDnaDialog"];
      },
      set(value) {
        store.dispatch("setDna/setOpenSetDnaDlgAction", value);
      },
    });
    
    /**
     * 按下Menu 分頁設成第一頁
     * 0.加入 1.移除
     * 撈AgGrid資料
     * 將分頁恢復到設定頁面
     */
    const manu_select = (menu) => {
      store.dispatch('setDna/setPageAction',0)
      setMenuIndex.value = menu;
      fetchSetDnaList();
      // if (menu == "1") {
      //   fetchSetDnaList().then((res) => {
      //     window.checkGridApi.rowModel.nodeManager.rootNode.allLeafChildren.forEach(
      //       (x) => {
      //         x.setSelected(true);
      //       }
      //     );
      //   });
      //   //  window.checkGridApi.rowModel.nodeManager.rootNode.allLeafChildren.forEach((x)=>{ x.setSelected(true)})
      // }
    };
    
    /**
     * 關閉Dialog
     * 將分頁恢復到設定頁面
     * Menu恢復到 加入選項
     * 清除 AgGrid 篩選字
     */
    const dlgClose = () => {
      store.dispatch('setDna/setPageAction',0);
      setMenuIndex.value = "0";
      window.checkGridApi.setFilterModel(null);
    };

    return {
      getRowData,
      getOpenSetDnaDialog,
      manu_select,
      setMenuIndex,
      dlgClose,
      getPage
    };
  },
};
</script>

<template>
  <div class="dSetDnaDlag">
    <el-dialog
      v-model="getOpenSetDnaDialog"
      :title="'設定 '+getRowData.DNA_NAME"
      width="55%"
      :lock-scroll="true"
      :draggable="true"
      :close-on-click-modal="false"
      @close="dlgClose"
    >
      <div class="dSetContent">
        <div>
          <el-menu
            :default-active="setMenuIndex"
            class="el-menu-vertical-demo"
            @select="manu_select"
          >
            <el-menu-item class="addIcon" index="0">
              <el-icon color="#03111e"><CirclePlus /></el-icon>
              <span>加入</span>
            </el-menu-item>
            <el-menu-item class="removeIcon" index="1">
              <el-icon><Remove /></el-icon>
              <span>排除</span>
            </el-menu-item>
          </el-menu>
        </div>
        <div class="dAgGridContent">
          <CheckItemAgGrid v-show="getPage==0" />
          <ResultAgGrid v-show="getPage==1" />
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.dSetContent {
  display: flex;
  .el-menu-vertical-demo {
    height: 100%;
  }
  .dAgGridContent {
    flex-grow: 1;
  }

  .addIcon {
    color: #1ea51e;
  }

  .removeIcon {
    color: #fb0000;
  }
}
</style>
