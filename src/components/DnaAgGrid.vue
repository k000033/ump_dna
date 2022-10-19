<script>
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { AgGridVue } from "ag-grid-vue3";
import "ag-grid-enterprise";
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";
import { apiUseUmpDnaParams } from "../api/index";
export default {
  components: {
    AgGridVue,
  },
  setup() {
    const store = useStore();
    const umpDnaParams = new apiUseUmpDnaParams();
    const getDnaAgGridData = computed(() => {
      return store.getters["getDnaAgGridData"];
    });
    const setTag = computed({
      get() {
        return store.getters["setDna/getTag"];
      },
      set(value) {
        store.dispatch("setDna/setTagAction", value);
      },
    });

    const setObjectType = computed({
      get() {
        return store.getters["setDna/getObjectType"];
      },
      set(value) {
        store.dispatch("setDna/setObjectTypeAction", value);
      },
    });

    const CellMouseDown = (cell) => {
      if (cell.value == "-") {
        return;
      }
    
      console.log(cell.data.TAG);
      console.log(cell.colDef.field);
      store.dispatch('setDna/setRowDataAction',cell.data);
      setTag.value = cell.data.TAG;
      const colName = cell.colDef.field;
      if (colName == "IEM_QTY" || colName == "ORG_QTY") {
        // 判斷是否唯獨，是的話不能設定DNA
        // 先判斷 點擊的是什麼欄位 是 IEM_QTY 還是 ORG_QTY
        // 如果是 IEM_QTY，判斷 ITM_READONLY 有沒有大於0，0.false  >0.true
        // 如果是 ORG_QTY，判斷 ORG_READONLY 有沒有大於0，0.false  >0.true
        const readOnly =
          colName == "IEM_QTY"
            ? cell.data.ITE_READONLY > 0
            : cell.data.ORG_READONLY > 0;
        store.dispatch("setDna/setReadOnlyAction", readOnly);
        // 紀錄點擊的是 IEM_QTY / ORG_QTY 欄位
        // 轉換成 OBJECT_TYPE，如果是ITEM_QTY = 2 ，ORG_QTY=3
        setObjectType.value = colName == "IEM_QTY" ? 2 : 3;

        umpDnaParams.TAG = setTag.value;
        umpDnaParams.OBJECT_TYPE = setObjectType.value;
        umpDnaParams.QUERY_MODE = 1;
        store.dispatch("setDna/fetchListAction", umpDnaParams);
        store.dispatch("setDna/setOpenListDialogAction", true);
      }
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
      CellMouseDown,
      getDnaAgGridData,
      loading,
      svg,
      columnDefs: [
        {
          headerName: "DNA_NAME",
          field: "DNA_NAME",
          sortable: true,
          filter: "agTextColumnFilter",
          width: "140px",
          pinned: "left",
          lockPinned: true,
        },
        {
          headerName: "基因",
          field: "GENE_NAME",
          sortable: true,
          filter: "agTextColumnFilter",
          width: "120px",
                    pinned: "left",
          lockPinned: true,
        },
                {
          headerName: "TAG",
          field: "TAG",
          sortable: true,
          filter: "agTextColumnFilter",
          width: "220px",

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
          field: "IEM_QTY",
          sortable: true,
          filter: "agTextColumnFilter",
          cellClass: "align_left",
          width: "120px",
          cellRenderer: function (params) {
            return `<div><a href="javascript:;" class="objectLink" >${params.value}</a></div>`;
          },
        },
        {
          headerName: "組織適用數",
          field: "ORG_QTY",
          sortable: true,
          filter: "agTextColumnFilter",
          cellClass: "align_left",
          width: "120px",
          cellRenderer: function (params) {
            return `<div><a href="javascript:;" class="objectLink" >${params.value}</a></div>`;
          },
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
    @CellMouseDown="CellMouseDown"
    :pagination="true"
  >
  </ag-grid-vue>
</template>

<style lang="scss" scoped></style>
