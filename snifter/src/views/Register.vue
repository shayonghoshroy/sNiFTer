<template>
  <div class="max-w-md mx-auto pt-6 is-white">
    <div>
      <h1 class="mb-3 is-white">Register</h1>
      <div>
        <!-- Register -->
        <form v-if="step === steps.register" @submit.prevent="register">
          <input
            v-model="registerForm.username"
            type="text"
            placeholder="Username"
            class="form-control"
          />
          <input
            v-model="registerForm.email"
            type="email"
            placeholder="Email"
            class="form-control"
          />
          <input
            v-model="registerForm.password"
            type="password"
            placeholder="Password"
            class="form-control"
          />
          <button type="submit" @click="register()" class="button--green">
            Register
          </button>
        </form>

        <!-- Confirm Registration -->
        <form v-else @submit.prevent="confirm">
          <input
            v-model="registerForm.username"
            type="text"
            placeholder="Username"
            class="form-control"
          />
          <input
            v-model="confirmForm.email"
            type="email"
            placeholder="Email"
            class="form-control"
          />
          <input
            v-model="confirmForm.code"
            placeholder="Code"
            class="form-control"
          />
          <button type="submit" class="button--green">Confirm</button>
        </form>
        <router-link to="/user" class="button is-purple"
          >Have an account? Login</router-link
        >
      </div>

      <div>You're logged in - go you!</div>
    </div>
  </div>
</template>

<script>
const steps = {
  register: "REGISTER",
  confirm: "CONFIRM",
};
export default {
  data: () => ({
    steps: { ...steps },
    step: steps.register,
    registerForm: {
      username: "",
      email: "",
      password: "",
    },
    confirmForm: {
      username: "",
      email: "",
      code: "",
    },
  }),
  methods: {
    async register() {
      try {
        await this.$store.dispatch("auth/register", this.registerForm);
        this.confirmForm.username = this.registerForm.username;
        this.confirmForm.email = this.registerForm.email;
        this.step = this.steps.confirm;
      } catch (error) {
        console.log({ error });
      }
    },
    async confirm() {
      try {
        await this.$store.dispatch(
          "auth/confirmRegistration",
          this.confirmForm
        );
        await this.$store.dispatch("auth/login", this.registerForm);
        this.$router.push("/");
      } catch (error) {
        console.log({ error });
      }
    },
  },
};
</script>

<style lang="css"></style>
