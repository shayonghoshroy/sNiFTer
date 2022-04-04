<template>
  <div>
    <div class="quizbox" v-if="(this.quiz != null) && (this.articleID != null)">
      <form>
        <div class="questionbox" v-if="(this.questionIndex < this.quiz.questions.length)"> 
          <h2>Question {{this.questionIndex+1}}</h2> 
        </div>
        <div v-if="(this.questionIndex < this.quiz.questions.length)" class="divider"> </div> 
        <div v-if="(this.questionIndex >= this.quiz.questions.length) && (score == count)">
          <h2>Great job! You mastered this concept!</h2>
        </div>
        <div v-if="(this.questionIndex >= this.quiz.questions.length) && (score != count)">
          <h2>Looks like you missed some things. Give it another shot!</h2>
        </div>

        <div class="textbox" v-if="this.questionIndex < this.quiz.questions.length">
          <h1>{{ this.quiz.questions[this.questionIndex] }} </h1> <br>
          <div class="answerflex">
            <div class="answerChoice" v-for="c in this.quiz.answers[this.questionIndex]" :key="c" >
              <va-button class="answerButton" size="large"  type="button" @click="submit && (this.answer = c)">{{ c }}</va-button> <br>
            </div>
          </div>
        </div>

        <div class="submitflex">
          <div v-if="this.questionIndex < this.quiz.questions.length">
            <br>
            <va-button type="button" @click="submit">Check</va-button>
          </div>
          <div v-else>
            <br>
            <va-button type="button" @click="restart">Restart</va-button> <br>
          </div>
          <p>score: {{ Math.round((score/count)*100 )}}%</p>
        </div>
      </form>
      <br>
    </div>
    <br>
  </div>
</template>

<script>
import { API, graphqlOperation, Auth } from "aws-amplify";
import { listQuizzes, listUsers } from "../graphql/queries";
import { updateUser } from "../graphql/mutations";
export default {
  name: "App",
  async created() {
    await this.getUser();
    await this.getQuiz();
  },
  data() {
    return {
      count: 1,
      score: 0,
      questionIndex: 0,
      question: null,
      answer: "",
      quiz_score: 0,
      quiz: null,
      user: null,
      username: null,
      completedQuizzes: [],
    };
  },
  props: {
      articleID: {
          type: String,
          default: null
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
        const currentusername = userAuth.username;

        // Query associated model from user table if a user is logged in
        if(userAuth != null) {
          const user = await API.graphql({
            query: listUsers,
            variables: {
              limit: 300,
              filter: { id: { eq: currentusername } },
            },
          });

          //// Populate related fields
          if(user.data.listUsers.items[0] != null) {
            this.user = user.data.listUsers.items[0];
          }
          // Store completed quizzes if the user has completed any. Otherwise, leave the array blank.
          if(user.data.listUsers.items[0].completed_quizzes != null) {
            this.completedQuizzes = user.data.listUsers.items[0].completed_quizzes;
          }
          // Store user's points from completing quizzes unless they haven't attempted any
          if(user.data.listUsers.items[0].quiz_points != null) {
            this.quiz_score = user.data.listUsers.items[0].quiz_points;
          }
        }
      } catch (e) {
          console.error(e);
      }
    },

    /**
      * Update user with additional completed quiz and new quiz score after completing quiz
      *
      */
    async updateUser() {
      try {
        // Push the new completed quiz onto array of completed quizzes
        this.completedQuizzes.push(this.articleID);
        // Mutate user in dynamo model to store this information
        await API.graphql(graphqlOperation(updateUser, {input: {id: this.user.id, completed_quizzes: this.completedQuizzes, quiz_points: this.quiz_score}}));

      } catch (e) {
        console.error(e);
      }
    },

    /**
      * Query and store the quiz associated with the articleID of the current Wiki article
      *
      */
    async getQuiz() {
      try {
        // Query fires here, filtering for correct articleID
        const quiz = await API.graphql({
          query: listQuizzes,
          variables: {
            filter: {id: {eq: this.articleID}}
          },
        });
        // Store it
        this.quiz = quiz.data.listQuizzes.items[0];
      } catch (e) {
        console.error(e);
      }
    },

    /**
      * Fires when user advances quiz question. Either increments questions and fixes score, or prepares to submit progress from completed quiz
      *
      */
    submit() {
      // Update score for this quiz if answer is right
      if (this.answer === this.quiz.correct_answer[this.questionIndex]) {
        this.score++;
      }
      // Advance count of completed questions
      if(this.questionIndex != 0) {
        this.count++;
      }
      // Advance index of the arrays of question, answer choices, and correct answers 
      if (this.questionIndex < this.quiz.questions.length) {
        this.questionIndex++;
      }
      // If user completes quiz and scores 100%, update their overall quiz score (experience field) and mutate user in database to store it
      if((this.questionIndex >= this.quiz.questions.length) && (this.score == this.count)) {
        if((this.user != null) && !(this.completedQuizzes.includes(this.articleID))) {
          this.quiz_score += this.quiz.questions.length;
          this.updateUser(); // Call mutatator funtion
        }
      }
    },

    /**
      * Restart quiz related data when user hits reset button, so they can take it again
      *
      */
    restart() {
      this.answer = "";
      this.questionIndex = 0;
      this.score = 0;
      this.count = 1;
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
.quizbox {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
  width: 60rem;
  height: 30rem;
  border: 15px solid white;
  background: #FFFFFF;
  border-radius: 0.5rem;
  padding-top: 5px;
  margin-bottom: 0px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
}

.answerflex {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 2px;
  width: 100%;
}

.answerChoice {
  width: inherit;
}

.answerButton {
  width: inherit;
}

.submitflex {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: nowrap;
  gap: 2px;
}

.divider {
  border-bottom: 1px solid black;
  margin: 5px
}
.box {
  display: flex;
  border-top: 1px solid lightgray;
  border-bottom: 1px solid lightgray;
  border-right: 1px solid lightgrey;
  align-items: flex-start;
  gap: 20px;
  max-width: 30rem;
	width: 30rem;
	min-height: 30rem;
}
.questionbox {
  display: flex;
  flex-direction: row;
}

.textbox {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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
  text-align: center;
}
@media (max-width: 700px) {
  img,
  button {
    height: 20px;
  }
}
</style>
