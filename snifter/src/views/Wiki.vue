<template>
  <div>
    <div>
      <WikiComponent class="sNiFTer Wiki" @getID="setID($event)" />
    </div>
    
    <div v-if="id != ''">
      <QuizComponent :articleID="id" class="sNiFTer Quiz" />
    </div>
  </div>
</template>

<script>
import WikiComponent from "../components/WikiComponent";
import QuizComponent from "../components/QuizComponent";
export default {
  name: "Wiki",
  components: { WikiComponent, QuizComponent },
  data() {
    return {
      id: "",
    }
  },
  methods: {
    setID(articleID) {
      this.id = articleID;
      //console.log(this.id);
    }
  },
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
