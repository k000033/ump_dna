<script>
import { computed, defineAsyncComponent, onMounted } from "@vue/runtime-core";
import Header from "../components/Header.vue";
import DnaAgGrid from "../components/DnaAgGrid.vue";
import { useStore } from "vuex";
import { apiUseUmpDnaParams } from "../api/index";
import ListDialog from '../components/SetDnaDilaog/ListDialog.vue'
import SetDnaDialog from '../components/SetDnaDilaog/SetDnaDialog.vue'
export default {
  components: {
    Header,
    DnaAgGrid:defineAsyncComponent(()=>import('../components/DnaAgGrid.vue')),
    ListDialog,
    SetDnaDialog
    // SetDna:defineAsyncComponent(()=>import('../components/SetDna.vue')),
  },
  setup() {
    const store = useStore();
    const UpmDanParams = new apiUseUmpDnaParams();
    const currMenu = computed(()=>{
      return store.getters['getCurrMenu'];
    })
    /**
     * 撈DNA清單 AgGrid
     */
    const fetchDnaAgGridData = () => {
      UpmDanParams.initialParams();
      store.dispatch("fetchDanAgGridData", UpmDanParams);
    };

    onMounted(() => {
      fetchDnaAgGridData();
    });
    return {
      currMenu
    };
  },
};
</script>

<template>
  <div class="wrap">
    <div>
      <Header />
    </div>
    <div class="content">
      <!-- <DnaAgGrid /> -->
      <component :is="currMenu" />
    </div>
    <ListDialog/>
    <SetDnaDialog/>
  </div>
</template>

<style lang="scss" scoped>
 

.wrap{
    height: 100%;
     .content{
     height:calc(100% - 52px);
     padding: 16px;
     box-sizing: border-box;
 }
}
</style>
