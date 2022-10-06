<script>
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { AgGridVue } from "ag-grid-vue3";
import "ag-grid-enterprise";
import { useStore } from "vuex";
import { computed } from "vue-demi";
import {apiFetchSetDnaAgGridData} from '../componentAPI/index'
export default {
  components: {
    AgGridVue,
  },
  setup() {
    const store = useStore();
    const {fetchRightAgGrid} = apiFetchSetDnaAgGridData();
    const getLeftObjectAgGridData = computed(() => {
      return store.getters["setDna/getLeftObjectAgGridData"];
    });
     //取得載入的狀態
    const loading = computed(() => {
        return store.getters["setDna/getLeftAgGridLoading"];
    });
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

        const onSelectionChanged = () => {
      const SltRow = window.leftObjectGridApi.getSelectedRows();
      fetchRightAgGrid(SltRow[0].ID)
      console.log(SltRow);
    };
    return {
      onSelectionChanged,
      loading,
      svg,
      getLeftObjectAgGridData,
      columnDefs: [
        {
          headerName: "ID",
          field: "ID",
          sortable: true,
          filter: "agTextColumnFilter",
          width: "80px",
        },
        {
          headerName: "MIDDLE_NAME",
          field: "MIDDLE_NAME",
          sortable: true,
          filter: "agTextColumnFilter",
          width: "302px",
        },
        {
          headerName: "ITEMS",
          field: "ITEMS",
          sortable: true,
          filter: "agTextColumnFilter",
          width: "80px",
        },
      ],
      defaultColDef: {
        floatingFilter: true,
        resizable: true,
      },
      onGridReady(params) {
        //設定全域變數，某些事件會使用
        window.leftObjectGridApi = params.api; //設定全域變數
        window.leftObjectGridColumnApi = params.columnApi; //設定全域變數
       
        // window.gridApi.selectionService.selectIndex("0");
      },
    };
  },
};
</script>

<template>
  <div class="leftObjectAgGridWrap">
    <ag-grid-vue
      v-loading="loading"
      element-loading-text="Loading..."
      :element-loading-spinner="svg"
      element-loading-svg-view-box="-10, -10, 50, 50"
      style="width: 100%; height: 100%"
      class="ag-theme-balham"
      :columnDefs="columnDefs"
      :rowData="getLeftObjectAgGridData.data"
      :defaultColDef="defaultColDef"
      @grid-ready="onGridReady"
      animateRows="true"
      enableCellTextSelection="true"
       @selection-changed="onSelectionChanged"
      :pagination="true"
      rowSelection="single"
    >
    </ag-grid-vue>
  </div>
</template>

<style lang="scss" scoped>

.leftObjectAgGridWrap{
  height: 100%;
}
</style>
