import { computed } from "vue";
import { useStore } from "vuex";
import { apiUseUmpDnaParams } from "../api/index";

export const fetchSetDnaDataAction = () => {
  const store = useStore();
  const umpDnaParams = new apiUseUmpDnaParams();

  const getTag = computed(() => {
    return store.getters["setDna/getTag"];
  });

  const getObjectType = computed(() => {
    return store.getters["setDna/getObjectType"];
  });
  
  //取得目前Menu 是加入還是移除
  const getMenuIndex = computed(() => {
    return store.getters["setDna/getMenuIndex"];
  });

  const fetchSetDnaList = () => {
    umpDnaParams.initialParams();
    umpDnaParams.TAG = getTag.value;
    umpDnaParams.OBJECT_TYPE = getObjectType.value;
    umpDnaParams.QUERY_MODE =getMenuIndex.value;
    return store
      .dispatch("setDna/fetchListAction", umpDnaParams)
      .then((res) => {
        /**
         * 如果是 Menu選擇移除，先全部勾選，再將不要的勾選掉
         * getMenuIndex 1 移除
         */
        // if (getMenuIndex.value == "1") {
        //   window.checkGridApi.rowModel.nodeManager.rootNode.allLeafChildren.forEach(
        //     (x) => {
        //       x.setSelected(true);
        //     }
        //   );

        //   //  window.checkGridApi.rowModel.nodeManager.rootNode.allLeafChildren.forEach((x)=>{ x.setSelected(true)})
        // }
      });
  };

  return { fetchSetDnaList };
};

// umpDnaParams.initialParams();
// umpDnaParams.TAG = getTag.value;
// umpDnaParams.OBJECT_TYPE=getObjectType.value;
// umpDnaParams.QUERY_MODE=1;
