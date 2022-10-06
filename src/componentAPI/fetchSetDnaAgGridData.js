import { computed } from "vue";
import { useStore } from "vuex";
import { apiUseUmpDnaParams } from "../api/index";

export const fetchSetDnaAgGridData = () => {
  const store = useStore();
  const umpDnaParams = new apiUseUmpDnaParams();

  const getQueryType = computed(() => {
    return store.getters["setDna/getQueryType"];
  });
  const getQueryDnaType = computed(() => {
    return store.getters["setDna/getQueryDnaType"];
  });

  

  /**
   * 在SetDna裡 撈取左邊AgGrid
   */
  const fetchLeftAgGrid = () => {
    umpDnaParams.initialParams();
    umpDnaParams.QUERY_TYPE = getQueryType.value;
    umpDnaParams.QUERY_DNA_TYPE = getQueryDnaType.value;
    store.dispatch("setDna/fetchSetDnaAgGridData", umpDnaParams).then((res) => {
      console.log(res.data);
      if (res.data.length > 0) {
        const obj =
          getQueryDnaType.value == 0 ? res.data[0].ID : res.data[0].TAG;
        fetchRightAgGrid(obj);
        if (getQueryDnaType.value == 0) {
          window.leftObjectGridApi.getRowNode(0).selectThisNode(true);
        } else {
          window.leftDnaGridApi.getRowNode(0).selectThisNode(true);
        }
      }
    });
  };
  /**
   * 在SetDna裡 撈取右邊邊AgGrid
   */
  const fetchRightAgGrid = (object) => {
    umpDnaParams.initialParams();
    umpDnaParams.OBJECT = object;
    umpDnaParams.QUERY_TYPE = getQueryType.value;
    umpDnaParams.QUERY_DNA_TYPE = getQueryDnaType.value;
    store.dispatch("setDna/fetchSetDnaAgGridData", umpDnaParams).then((res) => {
      console.log(res.data);
    });
  };

  return { fetchLeftAgGrid,fetchRightAgGrid };
};
