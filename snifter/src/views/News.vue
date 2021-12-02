<template>
  <div class="home">
    <section class="hero is-dark">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">sNiFTer News</h1>
          <h2 class="subtitle">Figure out whats new in the world of NFT's</h2>
        </div>
      </div>
    </section>
    <ListComponent />
  </div>
</template>

<script>
import ListComponent from "../components/ListComponent.vue";
export default {
  name: "News",
  components: {
    ListComponent,
  },
};
</script>
