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
        <a class="navbar-item router-hover" href="/search">Search</a>
        <a class="navbar-item router-hover" href="/wiki/home">Wiki</a>
      </va-navbar-item>
    </template>
    <template #right class="mb-2">
      <div>
        <div v-if="isLoggedIn">
          <div class="navbar-item">
            <router-link to="/user"
              ><img :src="store.src" class="avatar"
            /></router-link>
          </div>
        </div>
        <div v-else>
          <div class="navbar-item">
            <router-link to="/user"
              ><img src="../../assets/stockavatar.png" class="avatar"
            /></router-link>
          </div>
        </div>
      </div>
    </template>
  </va-navbar>
</template>

<script setup>
import "@aws-amplify/ui-vue/styles.css";
import { Amplify, API } from "aws-amplify";
import awsconfig from "../../aws-exports";
import avatar from "../../assets/stockavatar.png";
import { Storage } from "aws-amplify";
import awsExports from "../../aws-exports";
import stockavatar from "../../assets/stockavatar.png";
import { getUser } from "../../graphql/queries";
Amplify.configure(awsconfig);
</script>

<script>
import { Auth } from "aws-amplify";
import { store } from "../../store/store.js";

export default {
  name: "Nav",
  components: {},
  data() {
    return {
      user: [],
      src: null,
      avatar,
      store,
    };
  },
  computed: {
    isLoggedIn() {
      return this.store.isLoggedIn;
    },
  },
  methods: {},
  async created() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      this.user = user;
      if (this.user) {
        this.store.isLoggedIn = true;
      }
      let username = this.user.username;
      this.imgKey = "profile-image-" + username;
      // Get user
      const userData = await API.graphql({
        query: getUser,
        variables: {
          id: username,
        },
      });
      let hasImage = userData.data.getUser.hasImage;
      console.log(hasImage);
      if (hasImage) {
        this.src = await Storage.get(this.imgKey, {
          level: "public",
          bucket: awsExports.aws_user_files_s3_bucket,
          region: awsExports.aws_user_files_s3_bucket_region,
        });
        this.store.src = this.src;
      } else {
        this.src = stockavatar;
      }
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
  border-radius: 5px;
}
.avatar {
  min-height: 35px;
  width: 35px;
  border-radius: 50%;
  border: 1px solid #666666;
  background-color: #ffffff;
  margin-top: 6px;
}
</style>
