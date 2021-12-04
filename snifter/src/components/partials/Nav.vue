<template>
  <nav class="navbar container" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <div class="logo-image">
        <img src="../../assets/logo3.png" />
      </div>
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
        <router-link to="/about" class="navbar-item">About</router-link>
        <router-link to="/news" class="navbar-item">News</router-link>
        <router-link to="/browse" class="navbar-item">Browse</router-link>
      </div>
      <div class="navbar-end">
        <div class="buttons">
          <router-link to="/register" class="button is-purple">
            <div class="is-purple">Register</div>
          </router-link>
        </div>
      </div>
      <div class="navbar-item">
        <div class="buttons">
          <router-link to="/signin" class="button is-purple">
            <div class="is-purple">Sign In</div>
          </router-link>
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
  margin-top: 15px;
  margin-bottom: 20px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #6f36bc;
    }
  }
}
.logo-image {
  width: 40px;
  height: 40px;
  border-radius: 20%;
  overflow: hidden;
  margin: 0 -5px;
  margin-top: 5px;
}
.margin-top-5 {
  margin-top: 24px;
}
.is-purple {
  color: #6f36bc;
}
.is-white {
  color: #ffffff;
}
</style>
