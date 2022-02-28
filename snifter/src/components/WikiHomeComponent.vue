<template>
    <div id="wikiHomeComponent">
      <div class="flexbox">
        <div class="post" v-for="category in categories" :key="category.id">
          <div class="outerbox">
            <div class="box">
              <h1> {{category}} <br> Technology</h1>
            </div>
            <div class="box">
              <div v-for="article in categorize[category]" :key="article.id">
                <router-link
                  :to="{ name: 'Wiki', path: 'Wiki/'+ article.title,
                  query: article
                }">
                  <va-card class="wiki-card" style="height: 300px; width: 300px" outlined>
                    <va-card-content
                      > <h1>{{ article.title }}</h1>  {{article.blurb}}
                    </va-card-content>
                  </va-card>
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <br>
      </div>
    </div>
</template>

<script>
import { API } from "aws-amplify";
import { listArticles } from "../graphql/queries";
export default {
  name: "WikiHomeComponent",
  components: {  },
  async created() {
    await this.getArticle();
  },
  data() {
    return {
      id: "",
      articles: [],
      categories: [ "NFT", "Blockchain" ],
    };
  },
  computed: {
    filteredArticles() {
        return this.articles;
    },
    filteredCategories() {
        return this.categories;
    },
    categorize() {
        const groups = {};
        this.filteredArticles.forEach(article => {
            groups[article.category] = groups[article.category] || [];
            groups[article.category].push(article);
        })
    return groups;
  }
  },
  methods: {
    async getArticle() {
      try {
        const articles = await API.graphql({
          query: listArticles,
          variables: {
            limit: 100,
          },
        });
        this.articles = articles.data.listArticles.items;
        console.log(this.articles);
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
  color: #9d9d9d;
}
h2 {
  font-size: clamp(24px, 3vw, 3vw);
  font-weight: 300;
  margin: 0;
}
h1 {
  font-size: clamp(20px, 2vw, 3vw);
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
.outerbox{ 
  margin-left: 5px;
  margin-top: 5px;
  display: flex;
  text-align: center;
  border: 1px solid lightgrey;
  border-radius: 50px;
  align-items: flex-start;
  gap: 20px;
}
.box {
  display: flex;
  border-top: 1px solid lightgray;
  border-bottom: 1px solid lightgray;
  border-right: 1px solid lightgrey;
  align-items: flex-start;
  gap: 20px;
}
.flexbox {
  display: flex;
  align-items: left;
  flex-direction: column-reverse;
}
.box>*:first-child {
    align-self: center;
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
.wiki-card:hover {
  cursor: pointer;
  box-shadow: 5px 5px 5px 5px lightgrey;
}
</style>