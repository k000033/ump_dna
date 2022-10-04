import { createStore } from 'vuex'
import {apiUseFetchAxios} from '../api/index'
export default createStore({
  state: {
    isDnaAgGridLoading:false,
    DnaAgGridData:[]
  },
  actions: {
    fetchDanAgGridData({commit,state},params){
      commit('setIsDanAgGridLoading',true);
      apiUseFetchAxios(params).then((res)=>{
         state.isDnaAgGridLoading =false;
         console.log(res.data);
         commit('setDnaAgGridData',res.data);
         commit('setIsDanAgGridLoading',false);
      })
    }
  },
  mutations: {
    setDnaAgGridData(state,data){
       state.DnaAgGridData = data;
    },
    setIsDanAgGridLoading(state,boolean){
      state.isDnaAgGridLoading = boolean;
    }
  },
  getters: {
    getDnaAgGridData(state){
      return state.DnaAgGridData;
    },
    getIsDnaAgGridLoading(state){
      return state.isDnaAgGridLoading;
    }
  },
  modules: {
  }
})
