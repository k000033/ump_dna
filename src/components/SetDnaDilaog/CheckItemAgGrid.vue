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
    /**
     * 紀錄勾選的數量
     */
    const selectCont = ref(0);
    /**
     * 紀錄勾選Row的Data
     */
    const sltRowData = reactive({ data: [] });
   
   /**
    * 取得當前的Menu選項
    */
    const getMenuIndex = computed(() => {
      const res = store.getters["setDna/getMenuIndex"];
      return res;
    });
    // watch(getMenuIndex,(value)=>{
    //       sltRowData.data=[];
    // });
    
    const getCheckDnaAgGridData = computed(() => {
      selectCont.value = 0;              
      sltRowData.data = [];
      return store.getters["setDna/getCheckDnaAgGridData"];
    });
    //取得載入的狀態
    const loading = computed(() => {
      return store.getters["setDna/getListAgGridLoading"];
    });

    const rowSelected = (row) => {
      console.log(row);

      selectCont.value = window.checkGridApi.getSelectedRows().length;
      const rowData = row.data;
      const isExist = sltRowData.data.includes(rowData);

      if (isExist) {
        const index = sltRowData.data.findIndex((x) => x.ID == rowData.ID);
        console.log(index);
        sltRowData.data.splice(index, 1);
      } else {
        sltRowData.data.push(rowData);
      }
      console.log(sltRowData.data);
    };

    const btnNextPage = () => {
      store.dispatch("setDna/setPageAction", 1);
      window.resultGridApi.setRowData([]);
      window.resultGridApi.setRowData(sltRowData.data);
      store.dispatch("setDna/setResultAgGridDataAction", sltRowData.data);
    };

    //全選
    window.isFirstColumn = function isFirstColumn(params) {
      var displayedColumns = params.columnApi.getAllDisplayedColumns();
      var thisIsFirstColumn = displayedColumns[0] === params.column;
      return thisIsFirstColumn;
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
      btnNextPage,
      rowSelected,
      getMenuIndex,
      selectCont,
      isFirstColumn,
      loading,
      getCheckDnaAgGridData,
      svg,
      columnDefs: [
        {
          headerName: "ID",
          field: "ID",
          sortable: true,
          filter: "agTextColumnFilter",
          width: "130px",
          headerCheckboxSelection: isFirstColumn,
          checkboxSelection: isFirstColumn,
          headerCheckboxSelectionFilteredOnly: true,
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
      onGridReady(params) {
        //設定全域變數，某些事件會使用
        window.checkGridApi = params.api; //設定全域變數
        window.checkGridColumnApi = params.columnApi; //設定全域變數
      },
    };
  },
};
</script>

<template>
  <div>
    <ag-grid-vue
      v-loading="loading"
      element-loading-text="Loading..."
      :element-loading-spinner="svg"
      element-loading-svg-view-box="-10, -10, 50, 50"
      style="width: 100%; height: 70vh"
      class="ag-theme-balham"
      :columnDefs="columnDefs"
      :rowData="getCheckDnaAgGridData.data"
      :defaultColDef="defaultColDef"
      @grid-ready="onGridReady"
      animateRows="true"
      :pagination="true"
      enableCellTextSelection="true"
      rowSelection="multiple"
      rowMultiSelectWithClick="true"
      @rowSelected="rowSelected"
    >
    </ag-grid-vue>
    <div class="btnSubmit">
      <el-button type="primary" size="default" @click="btnNextPage"
        >下一步 已勾選{{ selectCont }}筆</el-button
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
.btnSubmit {
  margin: 15px 0;
  text-align: center;
}
</style>
