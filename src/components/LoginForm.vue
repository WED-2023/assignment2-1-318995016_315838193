<template>
  <div class="login-form">
    <h1 class="title">Login</h1>
    <b-form @submit.prevent="onLogin">
      <b-form-group
        id="input-group-Username"
        label-cols-sm="3"
        label="Username:"
        label-for="Username"
      >
        <b-form-input
          id="Username"
          v-model="$v.form.username.$model"
          type="text"
          :state="validateState('username')"
        ></b-form-input>
        <b-form-invalid-feedback>
          Username is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-Password"
        label-cols-sm="3"
        label="Password:"
        label-for="Password"
      >
        <b-form-input
          id="Password"
          type="password"
          v-model="$v.form.password.$model"
          :state="validateState('password')"
        ></b-form-input>
        <b-form-invalid-feedback>
          Password is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-button
        type="submit"
        variant="primary"
        class="login-button"
      >Login</b-button>
      <div class="mt-2">
        Do not have an account yet?
        <router-link to="register"> Register here</router-link>
      </div>
    </b-form>
    <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
    >
      Login failed: {{ form.submitError }}
    </b-alert>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import {mockLogin} from "../services/auth.js"

export default {
  name: "LoginForm",
  data() {
    return {
      form: {
        username: "",
        password: "",
        submitError: undefined
      }
    };
  },
  validations: {
    form: {
      username: {
        required
      },
      password: {
        required
      }
    }
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Login() {
      try {
        this.axios.defaults.withCredentials = true;
        const response = await this.axios.post(
          this.$root.store.server_domain +"/Login",


          {
            username: this.form.username,
            password: this.form.password
          }
        );
        const success = true; // modify this to test the error handling
        // const response = mockLogin(this.form.username, this.form.password, success);

        this.$root.store.login(this.form.username);
        this.$router.push("/");
      } catch (err) {
        // console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },
    onLogin() {
      this.form.submitError = undefined;
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.Login();
    }
  }
};
</script>

<style lang="scss" scoped>
.login-form {
  position:center;
  font-size: 20px;
  color: black;
  max-width: 600px;
  margin-top: 50px;
  background-color: rgba(255, 255, 255, 0.8);
  border: 2px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 15px;
  margin-left: 255px;
}

.title {
  font-family: 'Pacifico', cursive;
  font-size: 4em;
  margin-bottom: 20px;
  color: black;
  text-align: center;
}

.login-button {
  width: 420px;
  margin-left: 145px;
  background-color: rgb(165, 107, 57);
  border: none; /* Remove border */
  outline: none; /* Remove outline */
  color: white; /* Text color (assuming you want white text) */
  padding: 10px 20px; /* Adjust padding for button size */
  border-radius: 8px; /* Optional: Add border radius for rounded corners */
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s; /* Smooth transition */
}

.login-button:hover {
  background-color: #543B14; /* Darker brown color on hover */
}
</style>
