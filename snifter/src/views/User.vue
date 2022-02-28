<template>
  <div class="background-height">
    <div class="height">
      <div>
        <authenticator>
          <template v-slot="{ signOut }">
            <div class="margin-bottom">
              <Profile />
            </div>
            <div>
              <button class="button is-purple" @click="signOut">
                Sign Out
              </button>
            </div>
          </template>
        </authenticator>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-vue";
import "@aws-amplify/ui-vue/styles.css";
import Amplify from "aws-amplify";
import awsconfig from "../aws-exports";
import { Auth } from "aws-amplify";

Amplify.configure(awsconfig);

const auth = useAuthenticator();
auth.signOut();
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
    return {
      username: this.username,
    };
  },
  async created() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      this.user = user;
      this.username = user.username;
    } catch (e) {
      console.error(e);
    }
  },
  methods: {
    reloadPage() {
      Auth.signOut();
      window.location.reload();
    },
    goToHome() {
      this.$router.push("/");
    },
  },
};
</script>

<style lang="css" scoped>
.is-purple {
  color: #6f36bc;
  font-weight: 500;
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
.margin-bottom {
  margin-bottom: 1rem;
}
</style>
