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
          <div @click="connectToMetaMask()">
            <va-icon name="account_balance_wallet" size="large" />
          </div>
        </div>
      </div>
    </template>
  </va-navbar>
</template>

<script>
import SearchComponent from "../SearchComponent.vue";
// import { Auth } from "aws-amplify";

// const checkUser = () => {
//   Auth.currentAuthenticatedUser().then((a) => {
//     console.log(a);
//   });
// };

// checkUser();

export default {
  name: "Nav",
  components: {
    SearchComponent,
  },
  data() {
    return {
      user: [],
    };
  },
  methods: {
    connectToMetaMask() {
      console.log('connecting...');
      if (window.ethereum !== undefined) {
        console.log('ethereum defined');
        const accounts = window.ethereum.request({ method: "eth_requestAccounts" });
        console.log(accounts);
      }
    }
  },
};
</script>

<style lang="css" scoped>
nav {
  margin-top: 15px;
  margin-bottom: 20px;
  color: #2c3e50;
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
  align-items: center;
}

.nav-center {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
