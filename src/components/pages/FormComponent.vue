<template>
  <div>
    <h1>Form Component</h1>
    <!-- <div class="row m-2">
      <MultiSelect
        id="11"
        v-model="selected"
        InputClass="Inp-Box"
        class="col-3"
      ></MultiSelect>
      <br />
      <p>selected: {{ selected }}</p>
    </div> -->
    <p>next line</p>
    <div class="row p-3">
      <!-- <basic-form :fields="fields" :responseData="responseData" /> -->
      <div class="col">
        <!-- <ValidationObserver ref="form_refs">
          <DynamicForm :form_fields="fields"></DynamicForm>
        </ValidationObserver> -->
      </div>
      <b-form-tags
        input-id="tags-basic"
        @input="OnchangeInp"
        tag-variant="secondary"
          v-model="tags"
      ></b-form-tags>
      {{ tags }}
      <!-- <div class="col"><DynamicForm :form_fields="fields"></DynamicForm></div> -->
    </div>
    <button @click="form_submit()">form_submit</button>
    <div>
      <!-- Datepicker -->

      <!-- <Datepicker
        v-model="date"
        :disabled="false"
        :placeholder="'placeholder'"
        name="datepicker"
        :format="formater"
        id="input-id"
        input-class="form-control mb-2 bg-white w-100"
        :disabled-dates="disabled"
      ></Datepicker> -->
    </div>
    <!-- <button @click="print_data">log</button>
    <button @click="showdate">Show date</button> -->
  </div>
</template>

<script>
/* eslint-disable */
// import basicform from "@/utils/BasicForm.vue";
import Datepicker from "vuejs-datepicker";
import MultiSelect from "@/components/form/multiselect/MultiSelect";
import _ from "lodash";
import DynamicForm from "@/components/form/DynamicForm.vue";
import moment from "moment";
// import axios from "axios";
export default {
  components: {
    // BasicForm: basicform,
    DynamicForm,
    Datepicker,
    MultiSelect,
  },
  data() {
    return {
      date: "",
      disabled: { dates: [] },
      fields: [
        {
          id: 1,
          displayName: "First Name",
          attribute: {
            type: "text",
            validation: "max:10|min:4|required",
          },
          fieldcode: "first_name",
          isMandatory: "true",
          isVisble: "true",
          authorityCode: "read_write",
        },
        {
          id: 2,
          displayName: "Last Name",
          attribute: {
            type: "text",
          },
          fieldcode: "last_name",
          isMandatory: "false",
          isVisble: "true",
          authorityCode: "read_write",
        },
        {
          id: 3,
          displayName: "E-mail",
          attribute: {
            type: "email",
            validation: "email|required",
          },
          fieldcode: "e_mail",
          isMandatory: "false",
          isVisble: "true",
          authorityCode: "read_write",
        },
        {
          id: 4,
          displayName: "Phone number",
          attribute: {
            type: "ph_number",
            validation: "numeric",
          },
          fieldcode: "p_number",
          isMandatory: "false",
          isVisble: "true",
          authorityCode: "read_write",
        },
        {
          id: 5,
          displayName: "is available?",
          attribute: {
            type: "select",
          },
          fieldcode: "is_available",
          isMandatory: "false",
          isVisble: "true",
          authorityCode: "read_write",
        },
        {
          id: 6,
          displayName: "Remarks",
          attribute: {
            type: "text_area",
          },
          fieldcode: "ava_remark",
          isMandatory: "false",
          isVisble: "true",
          authorityCode: "read_write",
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
      selected: "one",
      tags: [],
    };
  },
  computed: {
    getvalue(field) {
      return _.get(this.responseData, field);
    },
    Cselected: {
      get() {
        return this.selected;
      },
      set(value) {
        console.log("Cselected", value);
        this.selected = value;
      },
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
      console.log("chech data");
    },
    form_submit() {
      console.log("form submit...", this.$refs.form_refs);
      this.$refs.form_refs.validate().then((res) => {
        console.log("this.$refs.form_refs.handleSubmit()", res);
      });
    },
    formater(date) {
      console.log("formater", moment(date).format("MMMM DD yyyy"));
      return moment(date).format("MMMM DD yyyy");
    },
    check_weekend(date) {
      let _day = date.getDay();
      let _res = _day === 6 || _day === 0 ? true : flase;
      return _res;
    },
    getDaysArray(start, end) {
      for (
        var arr = [], dt = new Date(start);
        dt <= new Date(end);
        dt.setDate(dt.getDate() + 1)
      ) {
        arr.push(new Date(dt));
      }
      return arr;
    },
    print_data() {
      let _date_period = [];
      let _unsed_date = [];
      let _no_Of_day = 10;
      let _no_Of_day_max = 45;
      let _temp_end_date = moment().add(_no_Of_day_max, "days");
      let daylist = this.getDaysArray(moment(), _temp_end_date);

      daylist.map((date) => {
        if (
          date.getDay() != 0 &&
          date.getDay() != 6 &&
          _date_period.length < _no_Of_day
        ) {
          _unsed_date.push(new Date(date));
        } else if (_date_period.length < _no_Of_day) {
          _date_period.push(new Date(date));
        }
      });
      console.log("daylist", _date_period);
      this.disabled["dates"] = _date_period;
      this.disabled["to"] = new Date(moment().subtract(1, "days"));
      this.disabled["from"] = new Date(_unsed_date[_no_Of_day - 1]);

      console.log("fromdates", fromdates);
      // working
      // let _temp = moment().add(27, "days");
      // let _days = moment(_temp, "MMMM Do yyyy").fromNow();
      // let _current = moment();
      // let _deff = moment.duration(_temp.diff(_current)).asDays();
      // console.log("dates", _temp, "_days", _days, "_deff", _deff);
      // moment.duration(start.diff(end)).asDays();

      // flow
      // get current and end date / days
      // check weekend and remove date
      // add miss no.of days
      // done
    },
    showdate() {
      console.log("show date", new Date().setDate(new Date().getDate() - 1));
    },
    OnchangeInp(data) {
      console.log(("tag Chnges", data));
      // this.tags=data.map(tag=>{
      //   return{userId:tag}
      // })
    },
  },
};
</script>

<style lang="scss">
.Inp-Box {
  font-weight: bold;
  background: #ffffff;

  border: 1px solid #d7eafc;
  border-radius: 5px;
  padding: 6px;
  //width: 100%;
  width: fit-content;
  font-size: 14px;
  &::placeholder {
    color: #a1bbd5;
    font-size: 10px;
  }
  &:focus {
    outline: none;
    border: 1.5px #0068b4 solid;
  }
  &:disabled {
    background: #e8e8e8 !important;
  }
}
.badge-secondary {
    color: #fff;
    background-color: #6c757d;
}
</style>
