<template>
  <article>
    <h2 style="color: white">A little about us</h2>
    <div class="div">
      <p>
        sNiFTer is an information platform, with the goal to decrease the
        learning curve, increase engagement, and provide reliable, actionable
        information for the NFT space. sNiFTer aims to tackle this challenge on
        3 fronts; insights and tracking into the performance of and engagement
        with an NFT entity, interactive educational resources on NFT and
        BlockChain technology, and interaction between users in a social manner
        for community engagement. By NFT entity, we are referring to an
        individual token, an NFT collection, or an NFT creator.
      </p>
      <p class="margin">
        Insights and tracking into the performance of, and engagement with, an
        NFT entity are provided through features that allow users to view the
        historical and current sales performance and transaction events
        associated with an NFT entity, along with community engagement on social
        sites. This is achieved through NFT entity search, NFT entity current
        and historical sales performance, transaction history, and beautiful
        artwork that drives the marketplace. Finally, users can track the events
        associated with an NFT entity through watch lists that provide current
        sales information and notify of transactions or upcoming airdrops.
      </p>
      <p>
        Interactive educational resources, presented in a story-like style, with
        quizzes after short videos, allow users to learn relevant technical
        information in bite-sized pieces. Social interaction between members
        will be achieved through posts detailing NFT events, such as a
        transaction on an NFT, an NFT collection, or even NFT artwork that one
        finds interesting.
      </p>
    </div>
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
  font-size: 18px;
  line-height: 2;
  color: #d3d3d3;
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
span {
  background-color: #141414;
  margin: 0.3em;
  padding: 0.3em 0.7em;
  color: #8d8d8d;
}
.margin {
  margin: clamp(3em, 4vw, 4vw);
}
.div {
  padding-top: 50px;
  padding-right: 50px;
  padding-bottom: 50px;
  padding-left: 50px;
}
</style>
