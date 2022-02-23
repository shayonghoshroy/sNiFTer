<template>
  <div class="background-height">
    <div class="height">
      <div><Profile /></div>
      <div>
        <authenticator>
          <template v-slot="{ signOut }">
            <div>
              <button class="button is-purple" @click="signOut">
                <div class="is-white">Sign Out</div>
              </button>
            </div>
          </template>
        </authenticator>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Authenticator } from "@aws-amplify/ui-vue";
import "@aws-amplify/ui-vue/styles.css";
import Amplify from "aws-amplify";
import awsconfig from "../aws-exports";

Amplify.configure(awsconfig);
</script>

<script>
import Profile from "../components/Profile.vue";

export default {
  name: "SignIn",
  components: {
    Authenticator,
    Profile,
  },
  data() {
    return {};
  },
  methods: {
    reloadPage() {
      window.location.reload();
    },
  },
};
</script>

<style lang="css" scoped>
.is-purple {
  background-color: #6f36bc;
}
.is-white {
  color: #ffffff;
}
.height {
  display: flex;
  align-items: center;
  justify-content: center;
}
.background-height {
  height: 90vh;
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
