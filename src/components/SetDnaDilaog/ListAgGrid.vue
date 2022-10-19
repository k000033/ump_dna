<script>
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { AgGridVue } from "ag-grid-vue3";
import "ag-grid-enterprise";
import { computed, reactive, ref, watch } from "vue-demi";
import { useStore } from "vuex";
export default {
  components:{
AgGridVue
  },
  props:{
    getObjectType:{
        type:Number,
        default:2
    }
  },
  setup(props) {
    const store = useStore();
    const getListAgGridata = computed(() => {
      return store.getters["setDna/getSetLisAgGridtData"];
    });


   

    const itemCol = [
      {
        headerName: "代碼",
        field: "ID",
        sortable: true,
        filter: "agTextColumnFilter",
        width: "100px",
      },
      {
        headerName: "名稱",
        field: "NAME",
        sortable: true,
        filter: "agTextColumnFilter",
        width: "400px",
      },
      // {
      //   headerName: "DESCRIPTION",
      //   field: "DESCRIPTION",
      //   sortable: true,
      //   filter: "agTextColumnFilter",
      //   width: "200px",
      // },
      {
        headerName: "大群組",
        field: "LINE_NAME",
        sortable: true,
        filter: "agTextColumnFilter",
        width: "150px",
      },
      {
        headerName: "群組",
        field: "CATEGORY_NAME",
        sortable: true,
        filter: "agTextColumnFilter",
        width: "210px",
      },
    ];

        const orgCol = [
      {
        headerName: "OBJ_ID",
        field: "OBJ_ID",
        sortable: true,
        filter: "agTextColumnFilter",
        width: "100px",
      },
      {
        headerName: "OBJ_NAME",
        field: "OBJ_NAME",
        sortable: true,
        filter: "agTextColumnFilter",
        width: "200px",
      },
      {
        headerName: "OBJ_MEMO",
        field: "OBJ_MEMO",
        sortable: true,
        filter: "agTextColumnFilter",
        width: "200px",
      },
      {
        headerName: "CATEGORY",
        field: "CATEGORY_ID",
        sortable: true,
        filter: "agTextColumnFilter",
        width: "210px",
      },
    ];

    //取得載入的狀態
    const loading = computed(() => {
      return store.getters["setDna/getListAgGridLoading"];
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
itemCol,
orgCol,
        props,
      loading,
      getListAgGridata,
      svg,
      defaultColDef: {
        floatingFilter: true,
        resizable: true,
      },
      onGridReady(params) {
        //設定全域變數，某些事件會使用
        window.listGridApi = params.api; //設定全域變數
        window.listGridColumnApi = params.columnApi; //設定全域變數
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
      :columnDefs="itemCol"
      :rowData="getListAgGridata.data"
      :defaultColDef="defaultColDef"
      @grid-ready="onGridReady"
      animateRows="true"
      :pagination="true"
      enableCellTextSelection="true"
      rowSelection="single"
    >
    </ag-grid-vue>
  </div>
</template>

<style></style>
