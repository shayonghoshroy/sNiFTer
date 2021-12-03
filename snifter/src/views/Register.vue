<template>
  <authenticator initial-state="signUp">
    <template v-slot="{ user, signOut }">
      <h1>Hello {{ user.username }}!</h1>
      <div class="padding">
        <button class="button is-purple" @click="signOut">
          <div class="is-white">Sign Out</div>
        </button>
      </div>
    </template>
  </authenticator>
</template>

<script setup>
import { Authenticator } from "@aws-amplify/ui-vue";
import "@aws-amplify/ui-vue/styles.css";

import Amplify from "aws-amplify";
import awsconfig from "../aws-exports";

Amplify.configure(awsconfig);
</script>

<style lang="css" scoped>
.is-purple {
  background-color: #6f36bc;
}
.is-white {
  color: #ffffff;
}
.padding {
  padding-top: 1rem;
}
</style>
