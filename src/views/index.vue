<script>
import { onMounted } from "@vue/runtime-core";
import Header from "../components/Header.vue";
import DnaAgGrid from "../components/DnaAgGrid.vue";
import { useStore } from "vuex";
import { apiUseUmpDnaParams } from "../api/index";
export default {
  components: {
    Header,
    DnaAgGrid,
  },
  setup() {
    const store = useStore();
    const UpmDanParams = new apiUseUmpDnaParams();
    const fetchDnaAgGridData = () => {
      UpmDanParams.initialParams();
      store.dispatch("fetchDanAgGridData", UpmDanParams);
    };

    onMounted(() => {
      fetchDnaAgGridData();
    });
    return {};
  },
};
</script>

<template>
  <div class="wrap">
    <div>
      <Header />
    </div>
    <div class="content">
      <DnaAgGrid />
    </div>
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
