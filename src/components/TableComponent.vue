<template>
  <div>
    <h1 class="">table component</h1>
    <!-- <div class="m-4"> -->
    <vuetable
      ref="vuetable"
      api-url="https://vuetable.ratiw.net/api/users"
      comment_api-url="http://localhost:3000/api/table"
      :fields="fields"
      data-path="data"
      pagination-path=""
      :per-page="5"
      :css="css.table"
      @vuetable:pagination-data="onPaginationData"
      @vuetable:checkbox-toggled="CheckboxToggle"
    >
      <!-- <template slot="tableHeader" slot-scope="{ fields }">
        <tr>
          <th>{{ fields }}</th>
          <th>...</th>
        </tr>
      </template> -->
      <template slot="sno" slot-scope="props"
        >{{ props.rowIndex + 1 }}
        <!-- <input type="checkbox" name="" id="" /> -->
      </template>
      <template slot="checkbox"> D</template>
      <template slot="gender" slot-scope="props">
        <p>{{ props.rowData.gender }}sa</p>
      </template>
    </vuetable>
    <!-- footer -->
    <div class="row">
      <div class="col-6">
        <vuetable-pagination-info
          :css="css.pagination"
          ref="paginationInfo"
        ></vuetable-pagination-info>
      </div>
      <div class="col-6">
        <vuetable-pagination
          ref="pagination"
          @vuetable-pagination:change-page="onChangePage"
          :css="css.pagination"
        ></vuetable-pagination>
      </div>
    </div>
    <div>
      <button @click="log">click</button>
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
import Vuetable from "vuetable-2";
import VuetablePagination from "vuetable-2/src/components/VuetablePagination";
import VuetablePaginationInfo from "vuetable-2/src/components/VuetablePaginationInfo";
import VuetableFieldCheckbox from "vuetable-2/src/components/VuetableFieldCheckbox.vue";
import VuetableFieldSequence from "vuetable-2/src/components/VuetableFieldSequence.vue";
// import VuetableRowHeader from "vuetable-2/src/components/VuetableRowHeader.vue";
import tbstyle from "./tablestyle";
// import HeaderS from "./headerComponent.vue";
export default {
  components: {
    Vuetable,
    VuetablePagination,
    VuetablePaginationInfo,

    // VuetableRowHeader,
    // HeaderS,
  },
  data() {
    return {
      fields: [
        {
          name: VuetableFieldSequence,
          title: "S.no",
          titleClass: "text-left ",
          dataClass: "text-left",
        },
        {
          name: VuetableFieldCheckbox,
          title: "Select All",
        },
        {
          name: "name",
          sortField: "caseId",
          title: "Case ID",
          titleClass: "text-left ",
          dataClass: "text-left",
          filterable: true,
          togglable: true,
        },
        {
          name: "email",
          title: "email",
          sortField: "email",
        },
        {
          name: "nickname",
          title: "nickname",
          sortField: "nickname",
        },
        {
          name: "gender",
          title: "gender",
          sortField: "gender",
        },
      ],
      sortOrder: [
        {
          field: "name",
          sortField: "name",
          direction: "asc",
        },
      ],
      css: tbstyle,
    };
  },
  methods: {
    //   as of document
    onPaginationData(paginationData) {
      this.$refs.pagination.setPaginationData(paginationData);
      this.$refs.paginationInfo.setPaginationData(paginationData);
      console.log("paginationData", paginationData);
    },
    onChangePage(page) {
      this.$refs.vuetable.changePage(page);
    },
    CheckboxToggle(data, index, value) {
      console.log("CheckboxToggle", data, index, value);
    },
    log() {
      console.log("row", this.$refs.vuetable.selectedTo);
    },
  },
};
</script>

<style scoped>
.activeClass {
  color: red;
}
</style>
