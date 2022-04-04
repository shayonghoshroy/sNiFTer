<template>
  <h2 class="mb-2 is-white">Welcome home {{ username }}!</h2>
  <div class="is-white">
    <div>
      <div>
        <UserImage
          style="margin-bottom: 10px"
          v-model="form.avatar"
          default-src=""
        />
      </div>
      <span class="flex lg1" style="color: #d3d3d3"> Email: {{ email }}</span>
    </div>
    <div class="column">
      <Watchlist />
      <FavoritesList />
    </div>
  </div>
</template>

<script>
//Import auth
import { Auth } from "aws-amplify";
import Watchlist from "./Watchlist";
import FavoritesList from "./FavoritesList";
import UserImage from "./partials/UserImage";
export default {
  name: "Profile",
  components: { Watchlist, UserImage, FavoritesList },
  data() {
    return {
      username: "",
      email: "",
      first_name: "",
      last_name: "",
      form: {
        avatar: null,
      },
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
