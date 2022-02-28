<template>
  <h2 class="mt-5 mb-2 is-white">Welcome home</h2>
  <div class="is-white">
    <va-divider horizontal />
    <div>
      <span class="flex lg1"> Username: {{ username }} |</span>
      <span class="flex lg1"> Email: {{ email }} |</span>
      <span class="flex lg1"> Phone: undefined</span>
    </div>
    <va-divider horizontal />
    <Watchlist />
  </div>
</template>

<script>
//Import auth
import { Auth } from "aws-amplify";
import Watchlist from "./Watchlist";

export default {
  name: "Profile",
  components: { Watchlist },
  data() {
    return {
      username: "",
      email: "",
      first_name: "",
      last_name: "",
    };
  },
  async created() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      this.user = user;
      this.username = user.username;
      this.email = user.attributes.email;
      this.first_name = user.attributes.given_name;
      this.last_name = user.attributes.family_name;
    } catch (e) {
      console.error(e);
    }
  },
};
</script>

<style lang="css" scoped>
.is-white {
  color: white;
}
h2 {
  font-size: clamp(16px, 2vw, 2vw);
  font-weight: 300;
  margin: 0;
}
</style>
