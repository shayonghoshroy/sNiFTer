<template>
  <div>
    <NewsHeader class="description" />
    <TweetComponent />
  </div>
</template>

<script>
import NewsHeader from "../components/NewsHeader";
import TweetComponent from "../components/TweetComponent";
export default {
  name: "News",
  components: { NewsHeader, TweetComponent },
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
.description {
  width: 60vw;
}
@media (max-width: 700px) {
  div {
    padding: 4em 0em;
  }
  .description {
    text-align: justify;
    width: 90vw;
  }
}
</style>
