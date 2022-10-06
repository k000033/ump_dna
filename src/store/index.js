import { createStore } from 'vuex'
import {apiUseFetchAxios} from '../api/index'
import setDna from './setDna'
import {
  apiGetNowTime
} from '../componentAPI/index'
export default createStore({
  state: {
    isDnaAgGridLoading:false,
    DnaAgGridData:[],
    currMenu:'DnaAgGrid'
  },
  actions: {
    fetchDanAgGridData({commit,state},params){
       commit('setIsDanAgGridLoading',true);
      apiUseFetchAxios(params).then((res)=>{
        console.log('------------------------------------------------');
        console.log('-- fetchDanAgGridData() start ::: ' + apiGetNowTime());
        console.log('-- Table length ::: ' + res.data.data.length);
        console.log('-- data error ::: ' + res.data.msg);
        console.log('-- fetchDanAgGridData() end ::: ' + apiGetNowTime());
        console.log('------------------------------------------------');
         state.isDnaAgGridLoading =false;
         console.log(res.data);
         commit('setDnaAgGridData',res.data);
         commit('setIsDanAgGridLoading',false);
      })
    },
    setCurrMenuAction({commit},menuString){
      commit('setCurrMenu',menuString);
    }
  },
  mutations: {
    setDnaAgGridData(state,data){
       state.DnaAgGridData = data;
    },
    setIsDanAgGridLoading(state,boolean){
      state.isDnaAgGridLoading = boolean;
    },
    setCurrMenu(state,menuString){
      state.currMenu = menuString;
    }
  },
  getters: {
    getDnaAgGridData(state){
      return state.DnaAgGridData;
    },
    getIsDnaAgGridLoading(state){
      return state.isDnaAgGridLoading;
    },
    getCurrMenu(state){
      return state.currMenu;
    }
  },
  modules: {
    setDna
  }
})
