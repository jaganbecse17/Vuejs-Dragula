<template>
  <div class="custom-selec__body">
    <!-- :class="InputClass" -->
    <!-- <input type="text" name="" id="" /> -->
    <div class="custom-selec__content d-flex flex-wrap">
      <p class="m-1 p-1 tag">one day</p>
      <p class="m-1 p-1 tag">two</p>
      <p class="m-1 p-1 tag">two</p>
    </div>
    <div class="custom-select-option" v-show="showOption">
      <p
        v-for="opt in getOptions"
        :value="opt && opt.value ? otp.value : opt"
        :key="opt && opt.id ? opt.id : opt"
      >
        {{ opt && opt.name ? opt.name : opt }}
      </p>
    </div>
    <!-- <select
      name=""
      :value="getvalue"
      class="Inp-Box hide-box"
      :class="InputClass"
      @change="changevalue($event)"
    >
      <option selected disabled>... select ....</option>
      <option
        v-for="opt in getOptions"
        :value="opt && opt.value ? otp.value : opt"
        :key="opt && opt.id ? opt.id : opt"
      >
        {{ opt && opt.name ? opt.name : opt }}
      </option>
    </select> -->
  </div>
</template>

<script>
export default {
  name: "MultiSelect",
  props: ["CurrentValue", "value", "InputClass", "id"],
  computed: {
    getOptions() {
      if (this.type != "multi") {
        return this.Soptions;
      } else {
        return this.Moptions;
      }
    },
    getvalue() {
      return this.selected;
    },
  },
  mounted() {
    this.selected = this.value;
  },
  data() {
    return {
      type: "single/multi",
      searchAble: true,
      Soptions: ["one", "two", "three"],
      Moptions: [
        {
          id: "01",
          name: "one day",
          value: "one",
        },
        {
          id: "02",
          name: "two day",
          value: "two",
        },
        {
          id: "03",
          name: "three day",
          value: "three",
        },
      ],
      selected: "",
      showOption: true,
    };
  },

  watch: {},
  methods: {
    logvalue() {
      // let _temp = this.$refs.inpmultiselect.dataset.val;
      // console.table("logvalue", _temp);
      // _temp = "two";
      // console.log("after update", _temp);
      this.$emit("valChange", this.selected);
    },
    changevalue(value) {
      let _temp = value.target.value;
      console.log("change value", _temp);
      this.selected = _temp;
      this.$emit("input", _temp);
    },
  },
};
</script>

<style lang="scss" scoped>
.hide-box {
  opacity: 0;
  width: 100%;
  height: 100%;
}
.custom-selec__content {
  // position: absolute;
  border: 1px solid #d7eafc;
  border-radius: 5px;
  width: 100%;
}
.custom-selec__body {
  position: relative;
  padding: 0 !important;
  top: 0;
}
.tag {
  border: 2px solid #d7eafc;
  border-radius: 5px;
  background-color: rgba(128, 128, 128, 0.1);
  text-overflow: ellipsis;
  overflow: hidden;
}
.custom-select-option {
  position: absolute;
  background-color: rgb(255, 255, 255);
  border: 1px solid gray;
  border-radius: 5px;
  width: inherit;
  padding: 5px;
  & > p {
    background-color: #fff;
    padding: 2px;
    margin: 0;
    &:hover {
      background-color: rgb(253, 235, 235);
    }
  }
}
</style>
