<template>
  <div>
    <p>form</p>
    <div v-for="ipt in data" :key="ipt.label">
      <label>{{ ipt.label }}</label>
      <br />
      <input
        type="text"
        :name="ipt.label"
        :placeholder="ipt.label"
        :value="getvalues(ipt.fieldcode)"
        :key="ipt.label"
        @input="setvalue(ipt.fieldcode, $event.target.value)"
      />
      {{ getvalues(ipt.fieldcode) }}
      <br />
      <br />
    </div>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  props: ["fields", "responseData"],
  data() {
    return {
      // fields:this.fields
      data: this.fields,
      res: this.responseData,
    };
  },
  computed: {
    getvalue(field) {
      return _.get(this.res, field);
    },
  },
  mounted() {
    // console.log("window.location.href", window.location.pathname);
  },
  methods: {
    setvalue(field, value) {
      console.log("setvalue", field, value);
      _.set(this.res, field, value);
    },
    getvalues(field) {
      // console.log("getvalue", field);
      return _.get(this.res, `value.${field}`);
    },
  },
};
</script>

<style lang="scss" scoped></style>
