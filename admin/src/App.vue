<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

import jwt_decode from 'jwt-decode'
export default {
  name: 'app',
  components: {},
  created() {
    if (localStorage.gloryToken) {
      const decode = jwt_decode(localStorage.gloryToken);
      this.$store.dispatch("setIsAutnenticated", !this.isEmpty(decode));
      this.$store.dispatch("setUser", decode);
    }
  },
   methods: {
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    }
  }
}
</script>

<style>
html,body {
  margin: 0;
  padding: 0;
}


</style>
