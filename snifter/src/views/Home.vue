<template>
  <div class="home">
    <article>
      <h2>Welcome to sNiFTer</h2>
      <p>First round's on us</p>
    </article>
    <div>
      <SearchComponent />
      <NFTComponent />
    </div>
  </div>
</template>

<script>
import NFTComponent from "../components/NFTComponent";
import SearchComponent from "../components/SearchComponent.vue";

export default {
  name: "Home",
  components: { NFTComponent, SearchComponent },
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
.button-block {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  position: absolute;
  bottom: -150px;
  .button {
  }
  .welcome {
    width: 400px;
    padding: 10px;
    margin-left: auto;
    margin-right: auto;
  }
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
.div {
  padding-top: 50px;
  padding-right: 50px;
  padding-bottom: 50px;
  padding-left: 50px;
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
