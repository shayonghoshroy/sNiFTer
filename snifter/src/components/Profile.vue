<template>
  <div class="is-white">
    {{ "Username: " + username + " | Email: " + email + " | Phone: undefined" }}
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

<style lang="css">
.is-white {
  color: white;
}
</style>
