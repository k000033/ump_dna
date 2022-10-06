import { apiUseFetchAxios } from "../api/index";
import { apiGetNowTime } from "../componentAPI/index";
export default {
  namespaced: true,
  state: {
    // 0.商品模式 1.門市模式
    queryType: "0",
    // 0.物品門市 1.DNA模式
    queryDnaType: "0",
    // SetMenu 左邊AgGrid 讀取狀態
    leftAgGridLoading: false,
    // SetMenu 右邊AgGrid 讀取狀態
    rightAgGridLoading: false,
    // // 物件角度左邊 讀取狀態
    // leftObjectAgGridLoading: false,
    // // 物件角度右邊 讀取狀態
    // rightObjectAgGridLoading: false,
    // // DNA角度左邊 讀取狀態
    // leftDnaAgGridLoading: false,
    // // DNA角度右邊 讀取狀態
    // rightDnaAgGridLoading: false,
    // 物件角度左邊
    leftObjectAgGridData: [],
    // 物件角度右邊
    rightObjectAgGridData: [],
    // DNA角度左邊
    leftDanAgGridData: [],
    // DNA角度右邊
    rightDnaAgGridData: [],
  },
  actions: {
    fetchSetDnaAgGridData({ commit, state }, params) {
      if (params.OBJECT == "") {
        commit("setLeftAgGridLoading", true);
      } else {
        commit("setRightAgGridLoading", true);
      }
      return apiUseFetchAxios(params).then((res) => {
        console.log("------------------------------------------------");
        console.log("-- fetchDanAgGridData() start ::: " + apiGetNowTime());
        console.log("-- Table length ::: " + res.data.data.length);
        console.log("-- data error ::: " + res.data.msg);
        console.log("-- fetchDanAgGridData() end ::: " + apiGetNowTime());
        console.log("------------------------------------------------");

        if (params.QUERY_DNA_TYPE == 0) {
          if (params.OBJECT == "") {
            commit("setLeftAgGridLoading", false);
            commit("setLeftObjectAgGridData", res.data);
          } else {
            commit("setRightAgGridLoading", false);
            commit("setRightObjectAgGridData", res.data);
          }
        } else {
          if (params.OBJECT == "") {
            commit("setLeftAgGridLoading", false);
            commit("setLeftDnaAgGridData", res.data);
          } else {
            commit("setRightAgGridLoading", false);
            commit("setRightDnaAgGridData", res.data);
          }
        }
        return res.data;
      });
    },
    setQueryTypeAction({ commit }, type) {
      commit("setQueryType", type);
    },
    setQueryDnaTypeAction({ commit }, type) {
      commit("setQueryDnaType", type);
    },
  },
  mutations: {
    setQueryType(state, type) {
      state.queryType = type;
    },
    setQueryDnaType(state, type) {
      state.queryDnaType = type;
    },
    setLeftObjectAgGridData(state, data) {
      state.leftObjectAgGridData = data;
    },
    setRightObjectAgGridData(state, data) {
      state.rightObjectAgGridData = data;
    },
    setLeftDnaAgGridData(state, data) {
      state.leftDanAgGridData = data;
    },
    setRightDnaAgGridData(state, data) {
      state.rightDnaAgGridData = data;
    },
    setLeftAgGridLoading(state, boolean) {
      state.leftAgGridLoading = boolean;
    },
    setRightAgGridLoading(state, boolean) {
      state.rightAgGridLoading = boolean;
    },
  },
  getters: {
    getQueryType(state) {
      return state.queryType;
    },
    getQueryDnaType(state) {
      return state.queryDnaType;
    },
    getLeftObjectAgGridData(state) {
      return state.leftObjectAgGridData;
    },
    getRightObjectAgGridData(state) {
      return state.rightObjectAgGridData;
    },
    getLeftDnaAgGridData(state) {
      return state.leftDanAgGridData;
    },
    getRightDnaAgGridData(state) {
      return state.rightDnaAgGridData;
    },
    getLeftAgGridLoading(state) {
      return state.leftAgGridLoading;
    },
    getRightAgGridLoading(state) {
      return state.rightAgGridLoading;
    },
  },
};
