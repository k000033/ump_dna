<script>
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { AgGridVue } from "ag-grid-vue3";
import "ag-grid-enterprise";
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";
export default {
  components: {
    AgGridVue,
  },
  setup() {
    const store = useStore();
    const getDnaAgGridData = computed(() => {
      return store.getters["getDnaAgGridData"];
    });

    const onCellDbClicked = () => {

    };

    //取得載入的狀態
    const loading = computed(() => {
      return store.getters["getIsDnaAgGridLoading"];
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
    return {
      onCellDbClicked,
      getDnaAgGridData,
      loading,
      svg,
      columnDefs: [
        {
          headerName: "TAG",
          field: "TAG",
          sortable: true,
          filter: "agTextColumnFilter",
          width: "220px",
          pinned: 'left', 
          lockPinned: true,
        },
        {
          headerName: "DNA_NAME",
          field: "DNA_NAME",
          sortable: true,
          filter: "agTextColumnFilter",
          width: "140px",
          pinned: 'left', 
          lockPinned: true,
        },
        {
          headerName: "基因",
          field: "GENE_NAME",
          sortable: true,
          filter: "agTextColumnFilter",
          width: "120px",
        },
        {
          headerName: "描述",
          field: "HINT",
          sortable: true,
          filter: "agTextColumnFilter",
          width: "300px",
        },
        {
          headerName: "商品適用數",
          field: "ITM_QTY",
          sortable: true,
          filter: "agTextColumnFilter",
          cellClass: 'align_left',
          width: "120px",
        },
        {
          headerName: "組織適用數",
          field: "ORG_QTY",
          sortable: true,
          filter: "agTextColumnFilter",
          cellClass: 'align_left',
          width: "120px",
        },
                {
          headerName: "異動者",
          field: "UPD_BY",
          sortable: true,
          filter: "agTextColumnFilter",
          width: "120px",
        },
                {
          headerName: "異動時間",
          field: "UPD_TIME",
          sortable: true,
          filter: "agTextColumnFilter",
          width: "180px",
        },
      ],
      defaultColDef: {
        floatingFilter: true,
        resizable: true,
      },
      onGridReady(params) {
        //設定全域變數，某些事件會使用
        window.gridApi = params.api; //設定全域變數
        window.gridColumnApi = params.columnApi; //設定全域變數
        window.gridApi.selectionService.selectIndex("0");
      },
    };
  },
};
</script>

<template>
  <ag-grid-vue
    v-loading="loading"
    element-loading-text="Loading..."
    :element-loading-spinner="svg"
    element-loading-svg-view-box="-10, -10, 50, 50"

    style="width: 100%; height: 100%"
    class="ag-theme-balham"
    :columnDefs="columnDefs"
    :rowData="getDnaAgGridData.data"
    :defaultColDef="defaultColDef"
    @grid-ready="onGridReady"
    animateRows="true"
    enableCellTextSelection="true"
    @cell-DoubleClicked="onCellDbClicked"
    :pagination="true"
  >
  </ag-grid-vue>
</template>

<style lang="scss" scoped>

</style>
