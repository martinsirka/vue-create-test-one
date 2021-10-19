<template>
  <div id="app">

    <navigation />

    <router-view />

  </div>
</template>

<script>
import navigation from "./components/Navigation.vue";

export default {
  components: {
    navigation,
  },
};
</script>

<style lang="scss">
@import "./assets/css/main.scss";
</style>
