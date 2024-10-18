/* eslint-disable */
<template>
  <div>
    <p>Dynamic form</p>
    <template v-for="list in form_fields">
      <ValidationProvider
        :rules="list.attribute && list.attribute.validation"
        tag="div"
        :key="list.id"
        ref="dyn_validator"
      >
        <template v-slot="{ errors }" v-if="list.attribute">
          <p for="">{{ list.displayName }}</p>
          <input
            ref="vali_temp"
            type="text"
            :name="list.displayName"
            :disabled="list.authorityCode === 'read_write' ? false : true"
            v-model="valuemodel[list.fieldcode]"
          />
          <p id="error" class="text-danger">{{ errors[0] }}</p>
          <!-- <button @click="validate">self validate</button> -->
        </template>
      </ValidationProvider>
    </template>
    <button @click="logg()">log</button>
    <!--
    <button @click="demo()">set store</button> -->
  </div>
</template>

<script>
export default {
  props: ["form_fields"],
  data() {
    return {
      value: "address.pin",
      email: "",
      form: {
        extra: "",
      },
    };
  },
  methods: {
    demo() {
      console.log("vali_temp", this.$refs.vali_temp);
    },
    logg() {
      console.log("log form", this.$refs.dyn_validator);
      //  window.print();
    },
  },
  computed: {
    valuemodel: {
      get() {
        return this.form;
      },
      set(value) {
        this.form = value;
      },
    },
  },
};
</script>

<style scoped>
.inp-box {
  border-color: green;
}
.inp-box-invalid {
  border-color: red;
}
</style>
