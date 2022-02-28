<template>
  <div class="wikihome">
    <article>
      <h2>Welcome to the sNiFTer Wiki</h2>
    </article>
    <WikiHomeComponent class="sNiFTer Wiki Home" />
  </div>
</template>

<script>
import WikiHomeComponent from "../components/WikiHomeComponent";
export default {
  name: "WikiHome",
  components: { WikiHomeComponent },
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
