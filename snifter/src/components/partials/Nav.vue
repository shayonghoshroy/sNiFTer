<template>
  <va-navbar color="rgba(0,0,0,0.3)">
    <template #left class="mb-2">
      <va-navbar-item class="nav-routes">
        <div class="logo-image">
          <img src="../../assets/logo-white.png" />
        </div>
        <a class="navbar-item router-hover" href="/">
          <strong class="is-size-4">sNiFTer</strong>
        </a>
        <a class="navbar-item router-hover" href="/about">About</a>
        <a class="navbar-item router-hover" href="/news">News</a>
        <a class="navbar-item router-hover" href="/browse">Browse</a>
        <a class="navbar-item router-hover" href="/search">Search</a>
      </va-navbar-item>
    </template>
    <template #right class="mb-2">
      <div>
        <div v-if="user.username">
          <div class="buttons">
            <router-link to="/profile" class="button is-purple"
              >{{ user.username }}'s Profile</router-link
            >
            <v-button class="button is-purple" @click="reloadPage"
              >Logout</v-button
            >
          </div>
        </div>
        <div v-else>
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
      </div>
    </template>
  </va-navbar>
</template>

<script>
import { Auth } from "aws-amplify";

export default {
  name: "Nav",
  components: {},
  data() {
    return {
      user: [],
    };
  },
  // Function to check if user is logged in
  async created() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      this.user = user;
      console.log(this.user.username);
    } catch (e) {
      console.log(e);
    }
  },
  methods: {
    reloadPage() {
      window.location.reload();
    },
  },
};
</script>

<style lang="css" scoped>
nav {
  margin-bottom: 20px;
  color: #ffffff;
}
.logo-image {
  width: 40px;
  height: 40px;
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
.nav-center {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
}
.navbar-item {
  margin-left: 5px;
  color: #ffffff;
}
.router-hover:hover {
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.2);
  color: #ffffff;
}
</style>
