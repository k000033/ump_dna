import { apiUseFetchAxios } from "../api/index";
import { apiGetNowTime } from "../componentAPI/index";
export default {
  namespaced: true,
  state: {
    openListDialog: false, // 明細Dialog 開關狀態
    tag: "", //Dna Tag
    rowData:[],
    listAgGridData: [], //明細 AgGrid 資料
    listAgGridLoading: false, // 明細 AgGrid 載入狀態
    readOnly: false, // 是否不能按下明細右上設定
    object_type: 2, // 2.商品 3.組織
    openSetDnaDialog: false, // 設定Dna Dialog開關狀態
    menuIndex: "0", // 0. 加入 1. 移除
    checkDnaAgGridData: [], //設定Dna AgGrid Data
    page: 0, // 0. 設定Dna  1.設定結果
    resultAgGridData:[], // 結果 AgGrid 資料

    leftAgGridData: [],
    rightAgGridData: [],
  },
  actions: {
    fetchListAction({ commit }, params) {
      if (params.QUERY_MODE == 0) {
        commit("setListAgGridLoading", true);
      }

      return apiUseFetchAxios(params).then((res) => {
        console.log("------------------------------------------------");
        console.log("-- setDnaAction() start ::: " + apiGetNowTime());
        console.log("-- Table length ::: " + res.data.data.length);
        console.log("-- data error ::: " + res.data.msg);
        console.log("-- setDnaAction() end ::: " + apiGetNowTime());
        console.log("------------------------------------------------");
        if (params.QUERY_MODE == 1) {
          commit("setListAgGridLoading", false);
          commit("setListAgGridData", res.data);
          commit("setCheckDnaAgGridData", res.data);
        } else if (params.QUERY_MODE == 0) {
          commit("setCheckDnaAgGridData", res.data);
          commit("setListAgGridLoading", false);
          //   commit("setLeftAgGridData", res.data.dataSet.Table);
          //   commit("setRightAgGridData", res.data.dataSet.Table1);
        }

        return res.data;
      });
    },
    setOpenListDialogAction({ commit }, boolean) {
      commit("setOpenListDialog", boolean);
    },
    setTagAction({ commit }, TagName) {
      commit("setTag", TagName);
    },
    setReadOnlyAction({ commit }, boolean) {
      commit("setReadOnly", boolean);
    },
    setObjectTypeAction({ commit }, type) {
      commit("setObjectType", type);
    },
    setOpenSetDnaDlgAction({ commit }, boolean) {
      commit("setOpenSetDnaDialog", boolean);
    },
    setMenuIndexAction({ commit }, index) {
      commit("setMenuIndex", index);
    },
    setPageAction({ commit }, num) {
      commit("setPage", num);
    },
    setResultAgGridDataAction({commit},data){
      commit('setResultAgGridData',data);
    },
    setRowDataAction({commit},data){
        commit('setRowData',data);
    }
    
  },
  mutations: {
    setOpenListDialog(state, boolean) {
      state.openListDialog = boolean;
    },
    setListAgGridData(state, data) {
      state.listAgGridData = data;
    },
    setListAgGridLoading(state, boolean) {
      state.listAgGridLoading = boolean;
    },
    setTag(state, TagName) {
      state.tag = TagName;
    },
    setReadOnly(state, boolean) {
      state.readOnly = boolean;
    },
    setObjectType(state, type) {
      state.object_type = type;
    },
    setOpenSetDnaDialog(state, bollean) {
      state.openSetDnaDialog = bollean;
    },
    // setLeftAgGridData(state, data) {
    //   state.leftAgGridData = data;
    // },
    // setRightAgGridData(state, data) {
    //   state.rightAgGridData = data;
    // },
    setMenuIndex(state, index) {
      state.menuIndex = index;
    },
    setCheckDnaAgGridData(state, data) {
        state.checkDnaAgGridData=data
    },
    setPage(state, num) {
      state.page = num;
    },
    setResultAgGridData(state,data){
        state.resultAgGridData =[];
        state.resultAgGridData = data;
        console.log( state.resultAgGridData)
    },
    setRowData(state,data){
        state.rowData = data;
    }
  },
  getters: {
    getOpenDilaogStatus(state) {
      return state.openListDialog;
    },
    getSetLisAgGridtData(state) {
      return state.listAgGridData;
    },
    getListAgGridLoading(state) {
      return state.listAgGridLoading;
    },
    getTag(state) {
      return state.tag;
    },
    getReadOnly(state) {
      return state.readOnly;
    },
    getObjectType(state) {
      return state.object_type;
    },
    getOpenSetDnaDialog(state) {
      return state.openSetDnaDialog;
    },
    // getLeftAgGridData(state) {
    //   return state.leftAgGridData;
    // },
    // getRightAgGridData(state) {
    //   return state.rightAgGridData;
    // },
    getCheckDnaAgGridData(state) {
      return state.checkDnaAgGridData;
    },
    getMenuIndex(state) {
      return state.menuIndex;
    },
    getDnaAgGridData(state) {
      return state.set;
    },
    getPage(state) {
      return state.page;
    },
    getResultAgGridData(state){
        return state.resultAgGridData;
    },
    getRowData(state){
        return state.rowData
    }
  },
};
