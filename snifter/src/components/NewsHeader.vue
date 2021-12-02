<template>
  <article>
    <h2>sNiFTer News</h2>
    <p>See what's hot in the world of NFT's</p>
  </article>
</template>

<script>
export default {
  name: "Description",
  data() {
    return {};
  },
};
</script>

<style scoped>
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
ul {
  margin-top: clamp(3em, 4vw, 4vw);
  list-style-type: none;
  display: flex;
  justify-content: space-around;
}
img {
  height: 30px;
  filter: grayscale();
  transition: filter 0.2s ease-in-out;
}
button {
  height: 30px;
  border: none;
  font-size: 18px;
  font-weight: 900;
  background-color: white;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}
button:hover {
  background-color: #59ff9c;
}
img:hover {
  filter: none;
}
span {
  background-color: #141414;
  margin: 0.3em;
  padding: 0.3em 0.7em;
  color: #8d8d8d;
}
@media (max-width: 700px) {
  img,
  button {
    height: 20px;
  }
}
</style>
