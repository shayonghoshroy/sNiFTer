<template>
  <div id="wikiHomeComponent">
    <div class="progressbox" v-if="this.user != undefined">
      <h2 style="color: white">Welcome {{ this.user.username }}!</h2>
      <p style="color: white">
        Your current Wiki level is {{ level }}. Read more articles and complete
        more quizzes to level up! <br> Current progress to the next level:
      </p>
      <p style="color: white"> </p>
      <va-progress-bar
        :model-value="this.progressValue"
        size="large"
        color="#FFFFFF"
      > <div v-if="this.progressValue > 0" style="color: black"> {{ this.progressValue + "%" }} </div>
      </va-progress-bar>
    </div>
    <div v-else>
      <h2 style="color: white">Welcome to the sNiFTer Wiki</h2>
    </div>
    <div class="flexbox">
      <div class="post" v-for="category in categories" :key="category.id">
        <div class="outerbox">
          <div class="categorybox">
            <h1>
              {{ category }} <br />
              Technology
            </h1>
          </div>
          <div class="box">
            <div v-for="article in categorize[category]" :key="article.id">
              <router-link
                :to="{
                  name: 'Wiki',
                  path: 'Wiki/' + article.title,
                  query: article,
                }"
              >
                <va-card
                  class="wiki-card"
                  style="height: 300px; width: 300px"
                  outlined
                >
                  <div class="cardflex" style="height: 300px; width: 300px">
                    <va-card-content>
                      <h1>{{ article.title }}</h1>
                      {{ article.blurb }}
                      <div
                        v-if="completedQuizzes.includes(article.id)"
                        class="flex-item-bottom"
                      >
                        <va-icon name="done" color="#9BEC15" class="mr-4" />
                      </div>
                    </va-card-content>
                  </div>
                </va-card>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <br />
    </div>
  </div>
</template>

<script>
import { API } from "aws-amplify";
import { listArticles, listUsers } from "../graphql/queries";
import { Auth } from "aws-amplify";
// Vue.use(LazyTube);
export default {
  name: "WikiHomeComponent",
  components: {},
  async created() {
    await this.getUser();
    await this.getArticle(this.searchtitle);
  },
  data() {
    return {
      id: "",
      articles: [],
      completedQuizzes: [],
      progressValue: 0,
      searchtitle: "",
      quiz_score: 0,
      level: 0,
      user: undefined,
      username: undefined,
      categories: [ "NFT", "Blockchain", "Currency" ],
    };
  },
  computed: {
    filteredArticles() {
      return this.articles;
    },
    filteredCategories() {
      return this.categories;
    },

    /**
      * Creates arrays with articles grouped by a category field present within the article model
      *
      * @return {{article}} groups of articles
      */
    categorize() {
      const groups = {};
      this.filteredArticles.forEach((article) => {
        groups[article.category] = groups[article.category] || [];
        groups[article.category].push(article);
      });
      return groups;
    },
  },
  methods: {
    /**
      * Collects the currently logged in user (if logged in) and populate fields of related data in component
      *
      */
    async getUser() {
      try {
        // Utilize Auth function to grab currently logged in user on cognito service
        const userAuth = await Auth.currentAuthenticatedUser();
        this.username = userAuth.username;
        
        // Query associated model from user table if a user is logged in
        if (userAuth != null) {
          const user = await API.graphql({
            query: listUsers,
            variables: {
              limit: 300,
              filter: { id: { eq: this.username } },
            },
          });

          //// Populate related fields
          this.user = user.data.listUsers.items[0];
          // Store completed quizzes if the user has completed any. Otherwise, leave the array blank.
          if (user.data.listUsers.items[0].completed_quizzes != null) {
            this.completedQuizzes =
              user.data.listUsers.items[0].completed_quizzes;
          }
          // Store user's points from completing quizzes unless they haven't attempted any
          if (user.data.listUsers.items[0].quiz_points != null) {
            this.quiz_score = user.data.listUsers.items[0].quiz_points;
          }
          // Evaluate progress from above metrics ^ for display
          this.evaluateProgress();
        }
      } catch (e) {
        console.error(e);
      }
    },
    /**
      * Collects all articles to display on home page of Wiki
      *
      * @param {string} searchTitle Title of article to be searched, currently left blank for all queries
      *
      */
    async getArticle(searchtitle) {
      // Query all articles if searchTitle is blank, and store them to be categorized in computed
      if (searchtitle == "") {
        try {
          const articles = await API.graphql({
            query: listArticles,
            variables: {
              limit: 100,
            },
          });
          this.articles = articles.data.listArticles.items;

        } catch (e) {
          console.error(e);
        }
      } else {
        try {
          const articles = await API.graphql({
            query: listArticles,
            variables: {
              filters: { title: { eq: this.searchtitle } },
              limit: 100,
            },
          });
          this.articles = articles.data.listArticles.items;

        } catch (e) {
          console.error(e);
        }
      }
    },
    /**
      * Generate user progress for display, using quiz_score
      *
      */
    evaluateProgress() {
      this.level = Math.floor(this.quiz_score / 5) + 1;
      this.progressValue = ((this.quiz_score % 5) / 5) * 100;
    },
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
.outerbox {
  margin-left: 5px;
  margin-top: 5px;
  display: flex;
  text-align: center;
  border: 1px solid lightgrey;
  border-radius: 50px;
  background-color: white;
  align-items: flex-start;
  gap: 20px;
}
.categorybox {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  margin-left: 20px;
  align-self: center;
}
.box {
  display: flex;
  border-top: 1px solid lightgray;
  border-bottom: 1px solid lightgray;
  border-right: 1px solid lightgrey;
  align-items: flex-start;
  gap: 20px;
}
.levelflex {
  display: flex;
  align-items: left;
  flex-direction: row;
  margin-bottom: 3vw;
}
.levelbox {
  display: flex;
  background-color: white;
  border-top: 1px solid lightgray;
  border-bottom: 1px solid lightgray;
  border-right: 1px solid lightgrey;
  border-left: 1px solid lightgrey;
  margin-left: 50px;
  margin-right: 50px;
  border-radius: 5px;
  align-items: flex-start;
  justify-content: space-around;
  flex-direction: column;
}

.flexbox {
  display: flex;
  align-items: left;
  flex-direction: column;
  margin-bottom: 3vw;
}

.progressbox {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 3vw;
  gap: 2px;
}

.progressflex {
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 20px;
}

.cardflex {
  display: flex;
  flex-flow: row wrap;
}

.box > *:first-child {
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
.flex-item-bottom {
  order: 1;
  flex: 0 1 auto;
  align-items: flex-end;
  justify-content: flex-end;
}
</style>
