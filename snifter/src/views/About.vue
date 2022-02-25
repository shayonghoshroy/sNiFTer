<template>
  <div>
    <Description class="description" />
  </div>
</template>

<script>
import Description from "../components/Description";
export default {
  name: "About",
  components: { Description },
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
  width: 92vw;
  height: 90vh;
}
</style>
