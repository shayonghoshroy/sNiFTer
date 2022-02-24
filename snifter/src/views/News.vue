<template>
  <div>
    <article>
      <h2 style="color: white">sNiFTer News</h2>
      <p style="color: white">See what's hot in the world of NFT's</p>
    </article>
    <TweetComponent />
  </div>
</template>

<script>
import TweetComponent from "../components/TweetComponent";
export default {
  name: "News",
  components: { TweetComponent },
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
