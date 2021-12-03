<template>
  <div class="home">
    <section class="hero is-dark">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Welcome to sNiFTer</h1>
          <h2 class="subtitle">First rounds on us</h2>
          <div class="button-block">
            <button class="button is-xl is-pink">
              <router-link to="/register">Register Now</router-link>
            </button>
          </div>
        </div>
      </div>
    </section>
    <div class="row div">
      <div class="flex md6 lg4">
        <va-card color="#4b4b4a" gradient>
          <va-card-title class="is-white">Title</va-card-title>
          <va-card-content class="is-white"
            >Lorem ipsum dolor sit amet, consectetur adipiscing
            elit.</va-card-content
          >
        </va-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
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
  text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.6);
  padding: 40px 0 20px 0;
  font-size: 60px;
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
.is-pink {
  background-color: #ff4778;
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
