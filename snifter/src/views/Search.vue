<template>
  <div class="search">
    <article>
      <h2>Take your pick</h2>
      <p>You've already got your eye on these</p>
    </article>
    <SearchComponent/>
  </div>
</template>

<script>
  import SearchComponent from "../components/SearchComponent";
  export default {
    name: "Search",
    components: { SearchComponent },
    setup() {
      return {};
    }
  };
</script>

<style scoped>
h1 {
  margin-top: 1em;
  text-align: center;
}
.description {
  width: 60vw;
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
</style>