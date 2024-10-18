<template>
  <div>
    <p :style="{ fontSize: size + 'px' }">This is parenet component</p>
    <input type="text" name="" id="" v-model="text" />
    <p>count:{{ count }}</p>
    <p>call methods in parent comp from child comp</p>
    <button @click="resize">this.resize</button>

    <div v-for="data in list" :key="data.id">
      <childcomponent
        :title="data.title"
        :no="data.id"
        @counter="counter"
        @resizer="resize"
        :countval="count"
        :text="text"
      >
        <p>hello</p>
        <p>pass slot with component - counter</p>
        <button @click="counter">increment</button>
        <template v-slot:slot2> <p>named slot - slot2</p></template>
        <!-- <template #slot2> <p>named slot - slot2</p></template> -->
      </childcomponent>
    </div>
  </div>
</template>

<script>
import childcomponent from "@/components/pages/ChildComponent.vue";
export default {
  components: {
    childcomponent,
  },
  data() {
    return {
      size: 30,
      text: "",
      count: 1,
      list: [
        { title: "vue", id: 2, method: "counter" },
        { title: "node", id: 3, method: "counter" },
      ],
    };
  },
  methods: {
    popup() {
      alert("clicked");
    },
    resize() {
      this.size += 5;
    },
    counter() {
      this.count += 1;
    },
  },
};
</script>

<style lang="scss" scoped></style>
