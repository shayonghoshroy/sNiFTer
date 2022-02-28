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
        <a class="navbar-item router-hover" href="/wiki/home">Wiki</a>
      </va-navbar-item>
    </template>
    <template #right class="mb-2">
      <div>
        <div v-if="user.username">
          <div class="buttons">
            <router-link to="/user" class="button is-purple">{{
              user.username
            }}</router-link>
          </div>
        </div>
        <div v-else>
          <div class="buttons">
            <div class="navbar-item">
              <router-link to="/user" class="button is-purple">
                <div class="is-purple">Sign In</div>
              </router-link>
            </div>
          </div>
          <div @click="connectToMetaMask()">
            <va-icon name="account_balance_wallet" size="large" />
          </div>
        </div>
      </div>
    </template>
  </va-navbar>
</template>

<script setup>
import "@aws-amplify/ui-vue/styles.css";
import Amplify from "aws-amplify";
import awsconfig from "../../aws-exports";

Amplify.configure(awsconfig);
</script>

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
  methods: {
    connectToMetaMask() {
      console.log("connecting...");
      if (window.ethereum !== undefined) {
        console.log("ethereum defined");
        const accounts = window.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log(accounts);
      }
    },
    reloadPage() {
      window.location.reload();
    },
  },
  // Function to check if user is logged in
  async created() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      this.user = user;
    } catch (e) {
      console.log(e);
    }
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
  font-weight: 500;
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
