<template>
    <div id="wikiComponent">
        <h2 style="color: white">{{ article.title }}</h2>
        <div v-if="article.related_links != undefined">
          <div class="post" v-for="video_link in article.related_links" :key="video_link.id">
            <div v-if="(video_link != undefined) && (video_link != '')">
              <YouTube 
                :src="video_link" 
                @ready="onReady"
                ref="youtube" />
            </div>
          </div>
        </div>
      <div class="qaflex">
        <div class="post" v-for="(n, index) in article.questions.length" :key="index">
          <h1>{{ questions[index]}} </h1>
          <p>{{ answers[index] }}</p>
          <br>
        </div>
      </div>
    </div>
</template>

<script>
import { API } from "aws-amplify";
import { listArticles } from "../graphql/queries";
import YouTube from 'vue3-youtube'
export default {
  name: "WikiComponent",
  components: {YouTube},
  async created() {
    //console.log(this.$route.query);
    this.articleData = this.$route.query;
    //console.log(this.articleData.questions);
    this.questions = this.articleData.questions;
    this.answers = this.articleData.answers;
    this.title = this.articleData.title;
    this.article = this.articleData;
    // console.log(this.article.related_links);
    //console.log(this.article.id);
    this.$emit('getID', this.article.id)
    //console.log(this.questions);
    //console.log(this.articleData.id)
    //await this.getArticle(this.articleData.id);
  },
  data() {
    return {
      id: "",
      related_links: [""],
      title: "",
      questions: [],
      answers: [],
      articleData: [],
      article: null,
    };
  },
  methods: {
    onReady() {
      
    },
    async getArticle(articleId) {
      try {
        const articles = await API.graphql({
          query: listArticles,
          variables: {
            filters: {id: {eq: articleId}},
            limit: 1,
          },
          
        });
        this.article = articles.data.listArticles.items;
        this.questions = this.article.questions;
        this.answers = this.article.answers;
        this.id = this.article.id;
        
      } catch (e) {
        console.error(e);
      }
    }
  },
};
</script>

<style scoped>
p {
  font-size: 18px;
  line-height: 2;
  color: #ffffff;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-right: 50px;
  margin-left: 50px;
  justify-content: left;
}
h1 {
  font-size: 24px;
  line-height: 2;
  color: #000000d0;
  margin-top: 20px;
  margin-bottom: 10px;
  margin-right: 50px;
  margin-left: 50px;
}

.articleflex {
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  width: 60%;
}

.qaflex {
  display: flex;
  flex-direction: column;
  width: 60rem;
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
.margin {
  margin: clamp(3em, 4vw, 4vw);
}
.div {
  padding-top: 50px;
  padding-right: 50px;
  padding-bottom: 50px;
  padding-left: 50px;
}
@media (max-width: 700px) {
  img,
  button {
    height: 20px;
  }
}
</style>
