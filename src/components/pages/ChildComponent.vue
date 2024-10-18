<template>
  <div class="child">
    <p>this is child component</p>
    <p>input value:{{ text }}</p>
    <P>parent count -- {{ countval }}</P>
    <p>props from parent comp title: {{ title }}, id:{{ no }}</p>
    <!-- child component data -->
    <p>message:{{ msg }}</p>
    <p>counter in child comp -- {{ count }}</p>
    <!-- local method -->
    <button @click="counter">child counter</button>
    <p>$emit parent function from child comp</p>
    <!-- parent method -->
    <button @click="$emit('resizer')">emit inline fn</button><br />
    <button @click="fnemit">emit from methods</button>
    <!-- parent method -->
    <p>$emit parent function from child comp</p>
    <button @click="$emit('counter')">increment</button>
    <!-- slot -->
    <p>slot - include content on child from parent comp</p>
    <slot
      ><p>
        fallback content - remove everything inside child comp tag in parent
        comp
      </p></slot
    >
    <!-- named slots -->
    <slot name="slot2" class="slot-cls"></slot>
  </div>
</template>

<script>
export default {
  props: ["title", "no", "countval", "text"],
  data() {
    return {
      msg: "hello",
      count: 0,
    };
  },
  methods: {
    popup() {
      alert("clicked");
    },
    fnemit() {
      this.$emit("resizer");
    },
    counter() {
      this.count += 1;
    },
  },
};
</script>

<style scoped>
.child {
  border: 1px dotted gray;
  margin: 10px;
  padding: 10px;
}
button {
  margin: 5px;
}
.slot-cls {
  border: 10px red solid;
}
</style>
