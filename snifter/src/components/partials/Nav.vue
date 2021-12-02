<template>
  <nav class="navbar container" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="/">
        <strong class="is-size-4">sNiFTer</strong>
      </a>
      <a
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div id="navbar" class="navbar-menu">
      <div class="navbar-start">
        <router-link to="/" class="navbar-item">Home</router-link>
        <router-link to="/about" class="navbar-item">About</router-link>
        <router-link to="/news" class="navbar-item">News</router-link>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <router-link to="/register" class="button is-dark">
              <strong>Register</strong>
            </router-link>
          </div>
        </div>
        <div class="navbar-item">
          <div class="buttons">
            <router-link to="/signin" class="button is-dark">
              <strong>Sign In</strong>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Nav",
  components: {},
};
</script>

<style lang="css" scoped>
nav {
  margin-top: 25px;
  margin-bottom: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #6f36bc;
    }
  }
}
</style>
