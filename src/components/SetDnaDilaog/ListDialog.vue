<script>
import { computed } from "vue-demi";
import { useStore } from "vuex";
import ListAgGrid from "./ListAgGrid.vue";
import { Setting } from "@element-plus/icons-vue";
import { apiUseUmpDnaParams } from '../../api/index'
import {apiFetchSetDnaDataAction} from '../../componentAPI/index';
export default {
  components: {
    ListAgGrid,
    Setting,
  },
  setup() {
    const store = useStore();
    const umpDnaParams = new apiUseUmpDnaParams();
    const {fetchSetDnaList}= apiFetchSetDnaDataAction();
    const getOpenDilaogStatus = computed({
      get() {
        return store.getters["setDna/getOpenDilaogStatus"];
      },
      set(value) {
        store.dispatch("setDna/setOpenListDialogAction", value);
      },
    });

    const getRowData = computed(() => {
      return store.getters["setDna/getRowData"];
    });

    const getTag = computed(() => {
      return store.getters["setDna/getTag"];
    });
    /**
     * 從外層AgGrid取得 ITM_READONLY，ORG_READONLY 來判斷能不能點擊設定按鈕
     */
    const getReadOnly = computed(()=>{
        return store.getters["setDna/getReadOnly"];
    });

    const getObjectType = computed(()=>{
      return store.getters['setDna/getObjectType'];
    });

    const btnSetDna = ()=>{
        // umpDnaParams.initialParams();
        // umpDnaParams.TAG = getTag.value;
        // umpDnaParams.OBJECT_TYPE=getObjectType.value;
        // umpDnaParams.QUERY_MODE=1;
        fetchSetDnaList();
        store.dispatch('setDna/setOpenSetDnaDlgAction',true)
    };

    return {
      getOpenDilaogStatus,
      getTag,
      Setting,
      getReadOnly,
      getObjectType,
      btnSetDna,
      getRowData
    };
  },
};
</script>

<template>
  <div class="dListDlg">
    <el-dialog
      v-model="getOpenDilaogStatus"
      title="清單"
      width="55%"
      :lock-scroll="true"
      :draggable="true"
    >
      <div>
        <div class="dListTitle">
          <div>
            <span>目標 : {{ getRowData.DNA_NAME }}</span>
          </div>
          <div class="dSetBtn">
            <el-button type="primary" :disabled="getReadOnly" :icon="Setting" size="small" @click="btnSetDna"
              >設定</el-button
            >
          </div>
        </div>
        <div class="dDlgContent">
             <ListAgGrid :getObjectType="getObjectType" />   
        </div>
    
      </div>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.dListDlg {
  .dListTitle {
    padding: 5px 10px;
    display: flex;
    .dSetBtn{
        margin-left: auto;
    }
  }

  .dDlgContent{
    padding: 0 10px 10px;
  }
}
</style>
