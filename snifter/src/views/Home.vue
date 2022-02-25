<template>
  <div class="home">
    <article>
      <h2>Welcome to sNiFTer</h2>
      <p>First round's on us</p>
    </article>
    <div>
      <div>
        <router-link to="/user" class="button is-purple">
          <div>Sign In or Register</div>
        </router-link>
      </div>
      <NFTComponent />
    </div>
  </div>
</template>

<script>
import NFTComponent from "../components/NFTComponent";

export default {
  name: "Home",
  components: { NFTComponent },
  setup() {
    return {};
  },
};
</script>

<style lang="css" scoped>
.hero {
  text-align: center;
}
.blur {
  filter: blur(4px);
}
.hero-body .title {
  text-shadow: 3px 3px 3px rgba(0, 0, 0, 0.6);
  padding: 20px 0 20px 0;
  font-size: 60px;
  text-transform: none;
}
.subtitle {
  text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.7);
  font-size: 30px;
}
.is-xl {
  font-size: 1.3rem;
  height: 100%;
  color: #ffffff;
}
.is-purple {
  color: #6f36bc;
}
.is-white {
  color: #ffffff;
}
.button {
  color: #6f36bc;
  font-weight: 500;
}
p {
  font-size: clamp(16px, 1.2vw, 1.2vw);
  line-height: 2;
  color: #ffffff;
}
h2 {
  font-size: clamp(24px, 3vw, 3vw);
  font-weight: 300;
  margin: 0;
  color: #ffffff;
}
</style>
