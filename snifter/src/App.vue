<template>
  <div id="app" class="">
    <div class="header modal-mask">
      <Nav />
    </div>
    <div class="margin-top">
      <router-view />
    </div>
  </div>
</template>

<script>
import Nav from "./components/partials/Nav.vue";
//import TestNav from "./components/partials/TestNav.vue";

export default {
  name: "app",
  components: {
    Nav,
    //TestNav,
  },
  data() {
    return { test: "test" };
  },
  methods: {
    check() {},
    refresh() {},
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,400;1,700&display=swap");
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
.header {
  position: fixed; /* fixing the position takes it out of html flow - knows
                   nothing about where to locate itself except by browser
                   coordinates */
  left: 0; /* top left corner should start at leftmost spot */
  top: 0; /* top left corner should start at topmost spot */
  width: 100vw; /* take up the full browser width */
  z-index: 200; /* high z index so other content scrolls underneath */
}
.margin-top {
  margin-top: 100px;
}
</style>
