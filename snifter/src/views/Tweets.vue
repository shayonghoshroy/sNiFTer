<template>
  <div>
    <article>
      <h2 class="is-white">News</h2>
      <p class="is-white">See what's hot in the world of NFT's</p>
    </article>
    <TwitterSearchComponent class="TwitterSearchComponent" />
  </div>
</template>

<script>
import TwitterSearchComponent from "../components/TwitterSearchComponent.vue";
export default {
  name: "About",
  components: { TwitterSearchComponent },
};
</script>

<style scoped>
div {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}
h1 {
  margin-top: 1em;
  text-align: center;
}
p {
  font-size: clamp(16px, 1.2vw, 1.2vw);
  line-height: 2;
  color: #9d9d9d;
}
h2 {
  font-size: clamp(24px, 3vw, 3vw);
  font-weight: 300;
  margin: 0;
}
.description {
  width: 92vw;
  height: 90vh;
}
.is-white {
  color: #ffffff;
}
</style>
