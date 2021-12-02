<template>
  <div class="main" :style="main">
    <form @submit.prevent="register">
      <h1 class="white">Welcome</h1>
      <input
        type="text"
        name="username"
        id="username"
        placeholder="User Name"
        :style="input"
      />
      <br />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        :style="input"
      />
      <br />
      <input
        type="phonenumber"
        name="phonenumber"
        id="phonenumber"
        placeholder="Phone Number"
        :style="input"
      />
      <br />
      <input
        type="button"
        value="Register"
        class="button"
        id="register"
        :style="input"
      />
      <br />
      <img src="../assets/google.svg" alt="Login using Google" />
      <img src="../assets/facebook.svg" alt="Login using Facebook" />
    </form>
  </div>
</template>

<script>
import { Auth } from "aws-amplify";
export default {
  data() {
    return {
      username: "",
      password: "",
      phonenumber: "",
    };
  },
  async register() {
    try {
      await Auth.signUp({
        username: this.username,
        password: this.password,
      });
      alert("User successfully registered. Please login");
    } catch (error) {
      alert(error.message);
    }
  },
  name: "SignIn",
  props: {
    main: String,
    input: String,
  },
};
</script>

data() { return { email: '', password: '', }; },

<style>
.main {
  background: #6f36bc;
  position: absolute;
  top: 20%;
  left: 30%;
  width: 40%;
  text-align: center;
  padding: 5px;
  border-radius: 3rem;
  box-shadow: 0px 0px 10px 0px;
  padding-top: 3%;
  padding-bottom: 5%;
}

h1 {
  cursor: default;
  user-select: none;
}

input {
  border-radius: 3rem;
  border: none;
  padding: 10px;
  text-align: center;
  outline: none;
  margin: 10px;
  width: 30%;
  box-sizing: border-box;
  font-weight: 400;
}

input:hover {
  box-shadow: 0px 0px 5px 0px;
}

input:active {
  box-shadow: 0px 0px 5px 0px;
}

#register {
  background: #ff4778;
}

.button {
  cursor: pointer;
  user-select: none;
  color: white;
}

.white {
  color: white;
}

img {
  height: 2.2rem;
  margin: 10px;
  user-select: none;
}

img:hover {
  box-shadow: 0px 0px 5px 0px;
  cursor: pointer;
  border-radius: 200rem;
}
</style>
