<template>
  <div>
    <h1>routing parent</h1>
    <ol>
      <li><router-link to="/firstroute">first</router-link></li>
      <li><router-link to="/secondroute">second</router-link></li>
    </ol>
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
