<template>
  <div class="quizbox" v-if="(this.quiz != null) && (this.articleID != null)">
    <form>
      <div>
        <h2>Try your luck at a quiz!</h2> 
      </div>
      <div class="divider"> </div>
      <div v-if="(this.questionIndex >= this.quiz.questions.length) && (score == count)">
        <h2>Great job! You mastered this concept!</h2>
      </div>
      <div v-if="(this.questionIndex >= this.quiz.questions.length) && (score != count)">
        <h2>Looks like you missed some things. Give it another shot!</h2>
      </div>

      <div v-if="this.questionIndex < this.quiz.questions.length">
        <h1>{{ this.quiz.questions[this.questionIndex] }} </h1>
        <div>
          <va-radio style="padding-left: 8px; padding-right: 8px;"
            v-for="c in this.quiz.answers[this.questionIndex]"
            :key="c"
            v-model="answer"
            :option="c"
          />
        </div>
      </div>
      <div v-else>
        <br>
        <va-button type="button" @click="restart">Restart</va-button> <br>
      </div>
      <div v-if="this.questionIndex < this.quiz.questions.length">
        <va-button type="button" @click="submit">Check</va-button>
      </div>
      
    </form>
    <p>score: {{ Math.round((score/count)*100 )}}%</p>
  </div>
</template>
<script>
/*
const questions = [
  {
    question: "What is American football called in England?",
    choices: ["American football", "football", "Handball"],
    rightAnswer: "American football",
  },
  {
    question: "What is the largest country in the world?",
    choices: ["Russia", "Canada", "United States"],
    rightAnswer: "Russia",
  },
  {
    question: "What is the 100th digit of Pi?",
    choices: [9, 4, 7],
    rightAnswer: 9,
  },
];
*/
import { API } from "aws-amplify";
import { listQuizzes } from "../graphql/queries";
export default {
  name: "App",
  async created() {
    await this.getQuiz();
  },
  data() {
    return {
      count: 1,
      score: 0,
      questionIndex: 0,
      question: null,
      answer: "",
      quiz: null,
    };
  },
  props: {
      articleID: {
          type: String,
          default: null
      },
  },
  methods: {
    async getQuiz() {
      try {
        const quiz = await API.graphql({
          query: listQuizzes,
          variables: {
          limit: 3,
          filter: {id: {eq: this.articleID}}
          },
        });
        this.quiz = quiz.data.listQuizzes.items[0];
        /*
        for(var i = 0; i < this.quiz.questions.length; i++) {
          console.log(this.quiz.questions[i]);
          console.log(this.quiz.answers[i]);
          console.log(this.quiz.correct_answer[i]);
        }
        console.log(this.quiz.questions.length);
        console.log(this.quiz.questions[this.questionIndex]);
        console.log(this.quiz.answers[this.questionIndex]);
        console.log(this.quiz.answers[this.questionIndex]);
        */
      } catch (e) {
        console.error(e);
      }
    },
    submit() {
      //const { answer, quiz, questionIndex } = this;
      if (this.answer === this.quiz.correct_answer[this.questionIndex]) {
        this.score++;
      }
      if(this.questionIndex != 0) {
        this.count++;
      }
      if (this.questionIndex < this.quiz.questions.length) {
        this.questionIndex++;
      }
    },
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
  align-items: center;
  width: 52rem;
  border: 15px solid white;
  background: #FAFAFA;
  border-radius: 0.5rem;
  padding-top: 5px;
  margin: 20px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
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
