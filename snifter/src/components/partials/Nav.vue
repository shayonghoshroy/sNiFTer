<template>
  <va-navbar color="#FFFFFF">
    <template #left class="mb-2">
      <va-navbar-item class="nav-routes">
        <div class="logo-image">
          <img src="../../assets/logo3.png" />
        </div>
        <a class="navbar-item" href="/">
          <strong class="is-size-4">sNiFTer</strong>
        </a>
        <router-link to="/about" class="navbar-item">About</router-link>
        <router-link to="/news" class="navbar-item">News</router-link>
        <router-link to="/browse" class="navbar-item">Browse</router-link>
        <router-link to="/search" class="navbar-item">Search</router-link>
      </va-navbar-item>
    </template>
    <template #center class="mb-2">
      <div class="nav-center">
        <SearchComponent />
      </div>
    </template>
    <template #right class="mb-2">
      <div>
        <div class="buttons">
          <div>
            <router-link to="/register" class="button is-purple">
              <div class="is-purple">Register</div>
            </router-link>
          </div>
          <div class="navbar-item">
              <router-link to="/signin" class="button is-purple">
                <div class="is-purple">Sign In</div>
              </router-link>
          </div>
        </div>
      </div>
    </template>
  </va-navbar>
</template>

<script>
import SearchComponent from "../SearchComponent.vue";

export default {
  name: "Nav",
  components: {
    SearchComponent
  },
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

.nav-routes {
  display: flex;
  justify-content: center;
  align-items: center;
}

.buttons {
  display: flex;
}

.nav-center {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
