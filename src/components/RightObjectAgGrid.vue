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
    const getRightObjectAgGridData = computed(() => {
      return store.getters["setDna/getRightObjectAgGridData"];
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
    return {
      loading,
      svg,
      getRightObjectAgGridData,
      columnDefs: [
        {
          headerName: "SID",
          field: "SID",
          sortable: true,
          filter: "agTextColumnFilter",
          width: "80px",
          checkboxSelection: true,
        },
        {
          headerName: "TAG",
          field: "TAG",
          sortable: true,
          filter: "agTextColumnFilter",
          width: "150px",
        },
        {
          headerName: "GENE_NAME",
          field: "GENE_NAME",
          sortable: true,
          filter: "agTextColumnFilter",
          width: "120px",
        },
                {
          headerName: "DNA_NAME",
          field: "DNA_NAME",
          sortable: true,
          filter: "agTextColumnFilter",
          width: "200px",
        },
      ],
      defaultColDef: {
        floatingFilter: true,
        resizable: true,
        // headerCheckboxSelection: isFirstColumn,
        // headerCheckboxSelectionFilteredOnly: true,
      },
      onGridReady(params) {
        //設定全域變數，某些事件會使用
        window.RightObjectGridApi = params.api; //設定全域變數
        window.RightObjectGridColumnApi = params.columnApi; //設定全域變數
        // window.gridApi.selectionService.selectIndex("0");
      },
    };
  },
};
</script>

<template>
  <div class="rightObjectAgGridWrap">
    <ag-grid-vue
      v-loading="loading"
      element-loading-text="Loading..."
      :element-loading-spinner="svg"
      element-loading-svg-view-box="-10, -10, 50, 50"
      style="width: 100%; height: 100%"
      class="ag-theme-balham"
      :columnDefs="columnDefs"
      :rowData="getRightObjectAgGridData.data"
      :defaultColDef="defaultColDef"
      @grid-ready="onGridReady"
      animateRows="true"
       rowSelection="multiple"
          :pagination="true"
      enableCellTextSelection="true"
      rowMultiSelectWithClick=true
    >
    </ag-grid-vue>
  </div>
</template>

<style lang="scss" scoped>

.rightObjectAgGridWrap{
  height: 100%;
}
</style>
