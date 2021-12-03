<template>
  <div class="home">
    <section class="hero is-dark">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Welcome to sNiFTer</h1>
          <h2 class="subtitle">First rounds on us</h2>
          <div class="button-block">
            <button class="button is-xl is-purple">
              <router-link to="/register">Register Now</router-link>
            </button>
          </div>
        </div>
      </div>
    </section>
    <div>
      <Popup>
        <div class="row div">
          <div class="flex md6 lg4">
            <va-card style="height: 450px; width: 250px">
              <va-image
                src="https://lh3.googleusercontent.com/mBR3nwH1YONmC-Y5YOaDwSYa9Uo6hNFfXlRTdxDmHJ9Z1eOTCmteSA-ifqsYLechzztVGD6nC0EEomxZJjhpYl0pmSQx_uOqME8n=w600"
                style="height: 300px"
              />
              <va-card-title>Tenkara</va-card-title>
              <va-card-content
                >Created by VictorMosquera Deriving inspiration from Japanese
                and South American traditional fishing practices.
              </va-card-content>
            </va-card>
          </div>
        </div>
      </Popup>
    </div>
  </div>
</template>

<script>
import Popup from "../components/Popup.vue";

export default {
  name: "Home",
  setup() {
    return {
      Popup,
    };
  },
};
</script>

<style lang="css" scoped>
.hero {
  text-align: center;
  background-image: url("https://leumiusa.com/wp-content/uploads/2015/10/banner-industry-tech.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 400px;
}
.hero-body .title {
  text-shadow: 3px 3px 3px rgba(0, 0, 0, 0.6);
  padding: 40px 0 20px 0;
  font-size: 60px;
  text-transform: none;
}
.subtitle {
  text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.7);
  font-size: 30px;
}
.button-block {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  position: absolute;
  bottom: -150px;
  .button {
  }
  .welcome {
    width: 400px;
    padding: 10px;
    margin-left: auto;
    margin-right: auto;
  }
}
.is-xl {
  font-size: 1.3rem;
  height: 100%;
  color: #ffffff;
}
.is-purple {
  background-color: #6f36bc;
}
.is-white {
  color: #ffffff;
}
.div {
  padding-top: 50px;
  padding-right: 50px;
  padding-bottom: 50px;
  padding-left: 50px;
}
</style>
