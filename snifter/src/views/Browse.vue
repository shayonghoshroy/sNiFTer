<template>
  <div>
    <article>
      <h2 style="color: white">Take a look</h2>
      <p style="color: white">You should definitely keep your eye on these</p>
    </article>
    <NFTComponent />
  </div>
</template>

<script>
import NFTComponent from "../components/NFTComponent";
export default {
  name: "Browse",
  components: { NFTComponent },
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
