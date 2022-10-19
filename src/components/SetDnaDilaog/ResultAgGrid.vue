<script>
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { AgGridVue } from "ag-grid-vue3";
import "ag-grid-enterprise";
import { computed, onMounted, reactive, ref, watch } from "vue-demi";
import { useStore } from "vuex";
export default {
  components: {
    AgGridVue,
  },
  setup() {
    const store = useStore();

    const getMenuIndex = computed(() => {
      return store.getters["setDna/getMenuIndex"];
    });
    const getResultAgGridData = computed(() => {
      return store.getters["setDna/getResultAgGridData"];
    });
    //取得載入的狀態
    const loading = computed(() => {
      return store.getters["setDna/getListAgGridLoading"];
    });
    
    
    const btnCancel = () => {
      store.dispatch("setDna/setPageAction", 0);
    };

    const getRowNodeId = (rowData) => {
      return rowData.ID;
    };

    const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `;
    return {
      getRowNodeId,
      btnCancel,
      getMenuIndex,
      getResultAgGridData,
      loading,
      svg,
      columnDefs: [
        {
          headerName: "ID",
          field: "ID",
          sortable: true,
          filter: "agTextColumnFilter",
          width: "130px",
        },
        {
          headerName: "NAME",
          field: "NAME",
          sortable: true,
          filter: "agTextColumnFilter",
          width: "320px",
        },
        {
          headerName: "DESCRIPTION",
          field: "DESCRIPTION",
          sortable: true,
          filter: "agTextColumnFilter",
          width: "120px",
        },
        {
          headerName: "LINE_NAME",
          field: "LINE_NAME",
          sortable: true,
          filter: "agTextColumnFilter",
          width: "120px",
        },
        {
          headerName: "CATEGORY_NAME",
          field: "CATEGORY_NAME",
          sortable: true,
          filter: "agTextColumnFilter",
          cellClass: "align_left",
          width: "210px",
        },
      ],
      defaultColDef: {
        floatingFilter: true,
        resizable: true,
      },
      rowClassRules: {
        addItem: function () {
          return getMenuIndex.value == "0";
        },
        removeItem: function () {
          return getMenuIndex.value == "1";
        },
      },
      onGridReady(params) {
        //設定全域變數，某些事件會使用
        window.resultGridApi = params.api; //設定全域變數
        window.resultGridColumnApi = params.columnApi; //設定全域變數
      },
    };
  },
};
</script>

<template>
  <div class="dResultContent">
    <ag-grid-vue
      v-loading="loading"
      element-loading-text="Loading..."
      :element-loading-spinner="svg"
      element-loading-svg-view-box="-10, -10, 50, 50"
      style="width: 100%; height: 70vh"
      class="ag-theme-balham"
      :columnDefs="columnDefs"
      :rowData="getResultAgGridData"
      :defaultColDef="defaultColDef"
      @grid-ready="onGridReady"
      animateRows="true"
      :pagination="true"
      enableCellTextSelection="true"
      :rowClassRules="rowClassRules"
      :getRowNodeId="getRowNodeId"
    >
    </ag-grid-vue>
    <div class="btnSubmit">
      <el-button type="primary" size="default" @click="btnCancel"
        >上一步</el-button
      >
      <el-button type="primary" size="default">{{
        getMenuIndex == "0" ? "加入適用" : "排除適用"
      }}</el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.btnSubmit {
  margin: 15px 0;
  text-align: center;
}
</style>
