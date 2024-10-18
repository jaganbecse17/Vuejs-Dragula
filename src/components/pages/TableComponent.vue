<template>
  <div>
    <h1 class="">table component</h1>
    <!-- <div class="m-4"> -->
    <vuetable
      ref="vuetable"
      api-url="http://localhost:8010/proxy/ilm/investigation/api/fetchLatestInvestigationByUser"
      comment_api-url="http://localhost:3000/api/table"
      :fields="fields"
      data-path="data"
      pagination-path=""
      :per-page="5"
      :css="css.table"
      :sort-order="sortOrder"
      :http-options="http_header()"
      :append-params="moreParams()"
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
import tbstyle from "../tablestyle";
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
      payload1:
        "eyJzdGF0dXNJZHMiOlt7InZhbHVlIjoiNS1BY2NlcHRlZCIsInRleHQiOiJBY2NlcHRlZCIsImlkIjoxLCJhY3R1YWxfc3RhdHVzIjp7InN0YXR1c0lkIjoxLCJzdGF0dXNOYW1lIjoiQWNjZXB0ZWQifX1dLCJzdGFydERhdGUiOiIiLCJlbmREYXRlIjoiIiwiY2xhaW1UeXBlSWQiOiJDQVNITEVTUyIsInNlYXJjaFR5cGUiOiJBIn0=",
      payload2:
        "eyJzdGF0dXNJZHMiOlt7InZhbHVlIjoiNS1BY2NlcHRlZCIsInRleHQiOiJBY2NlcHRlZCIsImlkIjoxLCJhY3R1YWxfc3RhdHVzIjp7InN0YXR1c0lkIjoxLCJzdGF0dXNOYW1lIjoiQWNjZXB0ZWQifX0seyJ2YWx1ZSI6IjUtQWNjZXB0ZWQgYnkgRXh0ZXJuYWwgSW52KEFIKSIsInRleHQiOiJBY2NlcHRlZCBieSBFeHRlcm5hbCBJbnYoQUgpIiwiaWQiOjUzLCJhY3R1YWxfc3RhdHVzIjp7InN0YXR1c0lkIjo1Mywic3RhdHVzTmFtZSI6IkFjY2VwdGVkIGJ5IEV4dGVybmFsIEludihBSCkifX0seyJ2YWx1ZSI6IjUtQXBwb2ludG1lbnQgU2NoZWR1bGUgIiwidGV4dCI6IkFwcG9pbnRtZW50IFNjaGVkdWxlICIsImlkIjo4OSwiYWN0dWFsX3N0YXR1cyI6e319LHsidmFsdWUiOiI1LUFzc2lnbmVkIiwidGV4dCI6IkFzc2lnbmVkIiwiaWQiOjMsImFjdHVhbF9zdGF0dXMiOnsic3RhdHVzSWQiOjMsInN0YXR1c05hbWUiOiJBc3NpZ25lZCJ9fSx7InZhbHVlIjoiNS1Bc3NpZ25lZCBieSBBZ2VuY3kgSGVhZCIsInRleHQiOiJBc3NpZ25lZCBieSBBZ2VuY3kgSGVhZCIsImlkIjo1MiwiYWN0dWFsX3N0YXR1cyI6eyJzdGF0dXNJZCI6NTIsInN0YXR1c05hbWUiOiJBc3NpZ25lZCBieSBBZ2VuY3kgSGVhZCJ9fSx7InZhbHVlIjoiNS1Bc3NpZ25lZCB0byBWaWRlbyBBc3NvY2lhdGUiLCJ0ZXh0IjoiQXNzaWduZWQgdG8gVmlkZW8gQXNzb2NpYXRlIiwiaWQiOjg4LCJhY3R1YWxfc3RhdHVzIjp7InN0YXR1c0lkIjo4OCwic3RhdHVzTmFtZSI6IkFzc2lnbmVkIHRvIFZpZGVvIEFzc29jaWF0ZSJ9fSx7InZhbHVlIjoiNS1DYWxsIEJ1c3kiLCJ0ZXh0IjoiQ2FsbCBCdXN5IiwiaWQiOjM2OCwiYWN0dWFsX3N0YXR1cyI6eyJzdGF0dXNJZCI6MzY4LCJzdGF0dXNOYW1lIjoiQ2FsbCBCdXN5In19LHsidmFsdWUiOiI1LUNhbGwgQ29tcGxldGVkLUF1ZGlvIiwidGV4dCI6IkNhbGwgQ29tcGxldGVkLUF1ZGlvIiwiaWQiOjkxLCJhY3R1YWxfc3RhdHVzIjp7fX0seyJ2YWx1ZSI6IjUtQ2FsbCBDb21wbGV0ZWQtVmlkZW8iLCJ0ZXh0IjoiQ2FsbCBDb21wbGV0ZWQtVmlkZW8iLCJpZCI6OTIsImFjdHVhbF9zdGF0dXMiOnt9fSx7InZhbHVlIjoiNS1DYWxsIERpc2Nvbm5lY3RlZCIsInRleHQiOiJDYWxsIERpc2Nvbm5lY3RlZCIsImlkIjozNjcsImFjdHVhbF9zdGF0dXMiOnsic3RhdHVzSWQiOjM2Nywic3RhdHVzTmFtZSI6IkNhbGwgRGlzY29ubmVjdGVkIn19LHsidmFsdWUiOiI1LUNhbGxCYWNrIiwidGV4dCI6IkNhbGxCYWNrIiwiaWQiOjM2NCwiYWN0dWFsX3N0YXR1cyI6eyJzdGF0dXNJZCI6MzY0LCJzdGF0dXNOYW1lIjoiQ2FsbEJhY2sifX0seyJ2YWx1ZSI6IjUtQ2xvc2VkIiwidGV4dCI6IkNsb3NlZCIsImlkIjo1LCJhY3R1YWxfc3RhdHVzIjp7InN0YXR1c0lkIjo1LCJzdGF0dXNOYW1lIjoiQ2xvc2VkIn19LHsidmFsdWUiOiI1LURlY2xpbmVkIiwidGV4dCI6IkRlY2xpbmVkIiwiaWQiOjYsImFjdHVhbF9zdGF0dXMiOnsic3RhdHVzSWQiOjYsInN0YXR1c05hbWUiOiJEZWNsaW5lZCJ9fSx7InZhbHVlIjoiNS1EZW5pZWQgVmlkZW8gSW52ZXN0aWdhdGlvbiIsInRleHQiOiJEZW5pZWQgVmlkZW8gSW52ZXN0aWdhdGlvbiIsImlkIjozNjMsImFjdHVhbF9zdGF0dXMiOnsic3RhdHVzSWQiOjM2Mywic3RhdHVzTmFtZSI6IkRlbmllZCBWaWRlbyBJbnZlc3RpZ2F0aW9uIn19LHsidmFsdWUiOiI1LUlTU1VFIiwidGV4dCI6IklTU1VFIiwiaWQiOjkwLCJhY3R1YWxfc3RhdHVzIjp7fX0seyJ2YWx1ZSI6IjUtSW52YWxpZCBObyIsInRleHQiOiJJbnZhbGlkIE5vIiwiaWQiOjM3MCwiYWN0dWFsX3N0YXR1cyI6eyJzdGF0dXNJZCI6MzcwLCJzdGF0dXNOYW1lIjoiSW52YWxpZCBObyJ9fSx7InZhbHVlIjoiNS1JbnZvaWNlIFJldmlld2VkIGFuZCBTdWJtaXR0ZWQgQmFjayIsInRleHQiOiJJbnZvaWNlIFJldmlld2VkIGFuZCBTdWJtaXR0ZWQgQmFjayIsImlkIjo4MiwiYWN0dWFsX3N0YXR1cyI6eyJzdGF0dXNJZCI6ODIsInN0YXR1c05hbWUiOiJJbnZvaWNlIFJldmlld2VkIGFuZCBTdWJtaXR0ZWQgQmFjayJ9fSx7InZhbHVlIjoiNS1Ob3QgUmVhY2hhYmxlIiwidGV4dCI6Ik5vdCBSZWFjaGFibGUiLCJpZCI6MzcyLCJhY3R1YWxfc3RhdHVzIjp7InN0YXR1c0lkIjozNzIsInN0YXR1c05hbWUiOiJOb3QgUmVhY2hhYmxlIn19LHsidmFsdWUiOiI1LU91dCBPZiBOZXR3b3JrIiwidGV4dCI6Ik91dCBPZiBOZXR3b3JrIiwiaWQiOjM3MSwiYWN0dWFsX3N0YXR1cyI6eyJzdGF0dXNJZCI6MzcxLCJzdGF0dXNOYW1lIjoiT3V0IE9mIE5ldHdvcmsifX0seyJ2YWx1ZSI6IjUtT3V0IE9mIE9yZGVyIiwidGV4dCI6Ik91dCBPZiBPcmRlciIsImlkIjozNzMsImFjdHVhbF9zdGF0dXMiOnsic3RhdHVzSWQiOjM3Mywic3RhdHVzTmFtZSI6Ik91dCBPZiBPcmRlciJ9fSx7InZhbHVlIjoiNS1QZW5kaW5nIiwidGV4dCI6IlBlbmRpbmciLCJpZCI6ODcsImFjdHVhbF9zdGF0dXMiOnsic3RhdHVzSWQiOjg3LCJzdGF0dXNOYW1lIjoiUGVuZGluZyJ9fSx7InZhbHVlIjoiNS1QZW5kaW5nIGZvciByZXZpZXcgYnkgUUMxIiwidGV4dCI6IlBlbmRpbmcgZm9yIHJldmlldyBieSBRQzEiLCJpZCI6MjYsImFjdHVhbF9zdGF0dXMiOnsic3RhdHVzSWQiOjE4LCJzdGF0dXNOYW1lIjoiUGVuZGluZyBmb3IgcmV2aWV3IGJ5IFFDMSJ9fSx7InZhbHVlIjoiNS1QZW5kaW5nIGZvciByZXZpZXcgYnkgUUMzIiwidGV4dCI6IlBlbmRpbmcgZm9yIHJldmlldyBieSBRQzMiLCJpZCI6MjAsImFjdHVhbF9zdGF0dXMiOnsic3RhdHVzSWQiOjIwLCJzdGF0dXNOYW1lIjoiUGVuZGluZyBmb3IgcmV2aWV3IGJ5IFFDMyJ9fSx7InZhbHVlIjoiNS1QZW5kaW5nIGZvciByZXZpZXcgd2l0aCBBZ2VuY3kiLCJ0ZXh0IjoiUGVuZGluZyBmb3IgcmV2aWV3IHdpdGggQWdlbmN5IiwiaWQiOjIxLCJhY3R1YWxfc3RhdHVzIjp7InN0YXR1c0lkIjoyMSwic3RhdHVzTmFtZSI6IlBlbmRpbmcgZm9yIHJldmlldyB3aXRoIEFnZW5jeSJ9fSx7InZhbHVlIjoiNS1SZXBvcnQgU3VibWl0dGVkIGJ5IEV4dGVybmFsIEludihBSCkiLCJ0ZXh0IjoiUmVwb3J0IFN1Ym1pdHRlZCBieSBFeHRlcm5hbCBJbnYoQUgpIiwiaWQiOjU0LCJhY3R1YWxfc3RhdHVzIjp7InN0YXR1c0lkIjo1NCwic3RhdHVzTmFtZSI6IlJlcG9ydCBTdWJtaXR0ZWQgYnkgRXh0ZXJuYWwgSW52KEFIKSJ9fSx7InZhbHVlIjoiNS1SaW5naW5nIGJ1dCBOb3QgUmVzcG9uZGluZyIsInRleHQiOiJSaW5naW5nIGJ1dCBOb3QgUmVzcG9uZGluZyIsImlkIjozNjYsImFjdHVhbF9zdGF0dXMiOnsic3RhdHVzSWQiOjM2Niwic3RhdHVzTmFtZSI6IlJpbmdpbmcgYnV0IE5vdCBSZXNwb25kaW5nIn19LHsidmFsdWUiOiI1LVNlbGYgQXNzaWduZWQgYnkgQWdlbmN5IEhlYWQiLCJ0ZXh0IjoiU2VsZiBBc3NpZ25lZCBieSBBZ2VuY3kgSGVhZCIsImlkIjo3OCwiYWN0dWFsX3N0YXR1cyI6eyJzdGF0dXNJZCI6NzgsInN0YXR1c05hbWUiOiJTZWxmIEFzc2lnbmVkIGJ5IEFnZW5jeSBIZWFkIn19LHsidmFsdWUiOiI1LVNlbnQgQmFjayBieSBRQzEiLCJ0ZXh0IjoiU2VudCBCYWNrIGJ5IFFDMSIsImlkIjozMCwiYWN0dWFsX3N0YXR1cyI6e319LHsidmFsdWUiOiI1LVNlbnQgQmFjayB0byBFeHRlcm5hbCBJbnYgZm9yIEludm9pY2UgUmV2aWV3IiwidGV4dCI6IlNlbnQgQmFjayB0byBFeHRlcm5hbCBJbnYgZm9yIEludm9pY2UgUmV2aWV3IiwiaWQiOjgxLCJhY3R1YWxfc3RhdHVzIjp7InN0YXR1c0lkIjo4MSwic3RhdHVzTmFtZSI6IlNlbnQgQmFjayB0byBFeHRlcm5hbCBJbnYgZm9yIEludm9pY2UgUmV2aWV3In19LHsidmFsdWUiOiI1LVNlbnQgQmFjayB0byBJbnZlc3RpZ2F0b3IgZm9yIEludm9pY2UgUmV2aWV3IiwidGV4dCI6IlNlbnQgQmFjayB0byBJbnZlc3RpZ2F0b3IgZm9yIEludm9pY2UgUmV2aWV3IiwiaWQiOjgwLCJhY3R1YWxfc3RhdHVzIjp7InN0YXR1c0lkIjo4MCwic3RhdHVzTmFtZSI6IlNlbnQgQmFjayB0byBJbnZlc3RpZ2F0b3IgZm9yIEludm9pY2UgUmV2aWV3In19LHsidmFsdWUiOiI1LVNlbnQgYmFjayBieSBBZ2VuY3kgSGVhZCIsInRleHQiOiJTZW50IGJhY2sgYnkgQWdlbmN5IEhlYWQiLCJpZCI6NTUsImFjdHVhbF9zdGF0dXMiOnsic3RhdHVzSWQiOjU1LCJzdGF0dXNOYW1lIjoiU2VudCBiYWNrIGJ5IEFnZW5jeSBIZWFkIn19LHsidmFsdWUiOiI1LVN3aXRjaCBPZmYiLCJ0ZXh0IjoiU3dpdGNoIE9mZiIsImlkIjozNjksImFjdHVhbF9zdGF0dXMiOnsic3RhdHVzSWQiOjM2OSwic3RhdHVzTmFtZSI6IlN3aXRjaCBPZmYifX0seyJ2YWx1ZSI6IjUtV2l0aGRyYXduIiwidGV4dCI6IldpdGhkcmF3biIsImlkIjozMywiYWN0dWFsX3N0YXR1cyI6eyJzdGF0dXNJZCI6MzMsInN0YXR1c05hbWUiOiJXaXRoZHJhd24ifX0seyJ2YWx1ZSI6IjUtV2l0aGRyYXduIGJ5IEFnZW5jeSBIZWFkIiwidGV4dCI6IldpdGhkcmF3biBieSBBZ2VuY3kgSGVhZCIsImlkIjo1NywiYWN0dWFsX3N0YXR1cyI6eyJzdGF0dXNJZCI6NTcsInN0YXR1c05hbWUiOiJXaXRoZHJhd24gYnkgQWdlbmN5IEhlYWQifX0seyJ2YWx1ZSI6IjUtV3JvbmcgTnVtYmVyIiwidGV4dCI6Ildyb25nIE51bWJlciIsImlkIjozNjUsImFjdHVhbF9zdGF0dXMiOnsic3RhdHVzSWQiOjM2NSwic3RhdHVzTmFtZSI6Ildyb25nIE51bWJlciJ9fV0sInN0YXJ0RGF0ZSI6IiIsImVuZERhdGUiOiIiLCJjbGFpbVR5cGVJZCI6IkNBU0hMRVNTIiwic2VhcmNoVHlwZSI6IkEifQ==",
      sortOrder: [
        {
          field: "modifiedDate",
          direction: "desc",
        },
      ],
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
      // sortOrder: [
      //   {
      //     field: "name",
      //     sortField: "name",
      //     direction: "asc",
      //   },
      // ],
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
    moreParams() {
      return {
        main_filter: "maccoyconsultancy@investigator.com",
        claimType: "CASHLESS",
        payload: this.payload2,
      };
    },
    http_header() {
      return {
        headers: {
          auth: "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJIMEJOai1ZOE41a1d5Q3NKdlJNekREMlp3ajM0UzFBdGp5OTducVdVdzRnIn0.eyJqdGkiOiIwMjhkZGVhMy02ZGViLTRiNWMtODg2MC05Zjg0OWM2MzFjY2EiLCJleHAiOjE2NjQ3OTExMTcsIm5iZiI6MCwiaWF0IjoxNjY0Nzg5MzE3LCJpc3MiOiJodHRwczovL2F1dGguYmFnaWN1YXQuYmFqYWphbGxpYW56LmNvbS9hdXRoL3JlYWxtcy9CYWdpYyIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiJiYzBkOGNmNy1iMDkwLTQ2YjQtOWQ1Ni1hZWUzMzA2MDkyNDciLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJiYWdpYy11aS1pbG0iLCJub25jZSI6IjYyM2E4NzlmLWFlOTMtNDM3Ni1iM2Q2LTMzOThiZDY0Yzc4ZSIsImF1dGhfdGltZSI6MTY2NDc4OTMxNSwic2Vzc2lvbl9zdGF0ZSI6ImYzNjk2YWM4LTRhMDQtNGVhZC05MTEzLWE2NmJmZDYzMzYxZSIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cHM6Ly9pbG0uYmFnaWN1YXQuYmFqYWphbGxpYW56LmNvbSJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiJtYWNjb3ljb25zdWx0YW5jeSBpbnZlc3RpZ2F0b3IiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtYWNjb3ljb25zdWx0YW5jeUBpbnZlc3RpZ2F0b3IuY29tIiwiZ2l2ZW5fbmFtZSI6Im1hY2NveWNvbnN1bHRhbmN5IiwiZmFtaWx5X25hbWUiOiJpbnZlc3RpZ2F0b3IifQ.LYE4he-rPC_ryVvrn7Iwgn12ufFO4trIg_y9DxiuzsD0xovVNcRPcFsyO4zFWg3BhYAqZ45KDxapfaBpkFIZDK9ySZdHKuCZuE0uYqoRbvgMDNXlPe-I-Qm5gXAslA7jRV6bFWqEoUva-W22UJH0pg9_s8cBq5LuN5FRu6clTcKu1sCouS6fbBlyDtdn9XQ6EQ0EoqL1s7W1HDisDrRJ6tZZ_7zoAyczdB8VkDbGdxQbbFnN1ABXr1MIkCn9I-TTe_srCtVcq4o8cWpcPP0EylOk46jffNzYrSfGvJaR5u_HRGZ6FjDsIKSl8GLTejhIIPRykVo-pVTbFs3SuV84Gw",
          correlationid: " fb1873bf-7ac9-4a6d-a675-4e7389421ddf",
          business_correlationid: "fb1873bf-7ac9-4a6d-a675-4e7389421ddf",
        },
      };
    },
  },
};
</script>

<style scoped>
.activeClass {
  color: red;
}
</style>
