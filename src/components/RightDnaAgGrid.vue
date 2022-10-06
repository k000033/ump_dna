<script>
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { AgGridVue } from "ag-grid-vue3";
import "ag-grid-enterprise";
import { useStore } from "vuex";
import { computed } from "vue-demi";
export default {
  components: {
    AgGridVue,
  },
  setup() {
    const store = useStore();
    const getRightDnaAgGridData = computed(() => {
      return store.getters["setDna/getRightDnaAgGridData"];
    });


      //取得載入的狀態
    const loading = computed(() => {
        return store.getters["setDna/getRightAgGridLoading"];
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

    const onSelectionChanged = (x)=>{
      console.log(x)
    }
    const rowDataUpdated = (x)=>{
      console.log(rowDataUpdated)
    }
    return {
        rowDataUpdated,
      onSelectionChanged,
      loading,
      svg,
      getRightDnaAgGridData,
      columnDefs: [
        {
          headerName: "OBJ_ID",
          field: "OBJ_ID",
          sortable: true,
          filter: "agTextColumnFilter",
          width: "120px",
          checkboxSelection: true,
        },
        {
          headerName: "OBJ_NAME",
          field: "OBJ_NAME",
          sortable: true,
          filter: "agTextColumnFilter",
          width: "250px",
        },
        {
          headerName: "OBJ_MEMO",
          field: "OBJ_MEMO",
          sortable: true,
          filter: "agTextColumnFilter",
          width: "200px",
        }
      ],
      defaultColDef: {
        floatingFilter: true,
        resizable: true,
        // headerCheckboxSelection: isFirstColumn,
        // headerCheckboxSelectionFilteredOnly: true,
      },
      onGridReady(params) {
        //設定全域變數，某些事件會使用
        window.RightDnaGridApi = params.api; //設定全域變數
        window.RightDnaGridColumnApi = params.columnApi; //設定全域變數
        // window.gridApi.selectionService.selectIndex("0");
      },
    };
  },
};
</script>

<template>
  <div class="rightDnaAgGridWrap">
    <ag-grid-vue
      v-loading="loading"
      element-loading-text="Loading..."
      :element-loading-spinner="svg"
      element-loading-svg-view-box="-10, -10, 50, 50"
      style="width: 100%; height: 100%"
      class="ag-theme-balham"
      :columnDefs="columnDefs"
      :rowData="getRightDnaAgGridData.data"
      :defaultColDef="defaultColDef"
      @grid-ready="onGridReady"
      animateRows="true"
      rowSelection="multiple"
      :pagination="true"
      enableCellTextSelection="true"
      rowMultiSelectWithClick=true
      @selection-changed="onSelectionChanged"
      @rowDataUpdated="rowDataUpdated"
    >
    </ag-grid-vue>
  </div>
</template>

<style lang="scss" scoped>

.rightDnaAgGridWrap{
  height: 100%;
}
</style>
