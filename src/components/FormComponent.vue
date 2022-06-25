<template>
  <div>
    <h1>Form Component</h1>
    <div>
      <basic-form :fields="fields" :responseData="responseData" />
    </div>
    <div>
      <p>only numbers</p>
      <input type="text" name="" id="" v-model="data" @keypress="log($event)" />
      {{ data }}
    </div>
    <button @click="log">log</button>
  </div>
</template>

<script>
import basicform from "@/utils/BasicForm.vue";
import _ from "lodash";
import axios from "axios";
export default {
  components: {
    BasicForm: basicform,
  },
  data() {
    return {
      data: "",
      fields: [
        {
          label: "field1",
          attribute: {
            type: "text",
          },
          fieldcode: "field1",
        },
        {
          label: "field2",
          attribute: {
            type: "text",
          },
          fieldcode: "field2",
        },
        {
          label: "field3",
          attribute: {
            type: "text",
          },
          fieldcode: "field3.name",
        },
      ],
      responseData: {
        value: {
          field1: "value1",
          field2: "value2",
          field3: {
            name: "vuejs",
          },
        },
      },
    };
  },
  computed: {
    getvalue(field) {
      return _.get(this.responseData, field);
    },
  },
  watch: {
    data(newval, oldval) {
      const reg = new RegExp("^[0-9]+$");
      if (reg.test(newval) || newval === "") {
        this.data = newval;
        return null;
      }
      this.data = oldval;

      // return false;
    },
  },
  mounted() {
    // console.log("window.location.href", window.location.pathname);
  },
  methods: {
    setvalue(field, value) {
      // console.log("setvalue", field, value);
      _.set(this.responseData, field, value);
    },
    getvalues(field) {
      // console.log("getvalue", field);
      return _.get(this.responseData, `value.${field}`);
    },
    log() {
      console.log("log");
      axios.get(
        "http://localhost:8010/proxy/ilm/configuration/user/api/fetchUserPermissions?payload=eyJ1c2VySWQiOiJtYWNjb3ljb25zdWx0YW5jeUBpbnZlc3RpZ2F0b3IuY29tIn0%3D"
      );
      // this.$store.commit("setlog", { [event.key]: event });
      // alert("hi");
    },
  },
};
</script>

<style lang="scss" scoped></style>
