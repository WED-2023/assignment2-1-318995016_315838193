<template>
  <div class="register-form">
    <h1 class="title">Register</h1>
    <b-form @submit.prevent="onRegister" @reset.prevent="onReset">
      <!-- Username Field -->
      <b-form-group
        id="input-group-username"
        label-cols-sm="3"
        label="Username:"
        label-for="username"
      >
        <b-form-input
          id="username"
          v-model="$v.form.username.$model"
          type="text"
          :state="validateState('username')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.username.required">
          Username is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-else-if="!$v.form.username.length">
          Username length should be between 3-8 characters long
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.username.alpha">
          Username must contain only letters
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="usernameExists">
          Username already exists
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- First Name Field -->
      <b-form-group
        id="input-group-firstName"
        label-cols-sm="3"
        label="First Name:"
        label-for="firstName"
      >
        <b-form-input
          id="firstName"
          v-model="$v.form.firstname.$model"
          type="text"
          :state="validateState('firstname')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.firstname.required">
          First name is required
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- Last Name Field -->
      <b-form-group
        id="input-group-lastName"
        label-cols-sm="3"
        label="Last Name:"
        label-for="lastName"
      >
        <b-form-input
          id="lastName"
          v-model="$v.form.lastname.$model"
          type="text"
          :state="validateState('lastname')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.lastname.required">
          Last name is required
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- Country Field -->
      <b-form-group
        id="input-group-country"
        label-cols-sm="3"
        label="Country:"
        label-for="country"
      >
        <b-form-select
          id="country"
          v-model="$v.form.country.$model"
          :options="countries"
          :state="validateState('country')"
        ></b-form-select>
        <b-form-invalid-feedback>
          Country is required
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- Email Field -->
      <b-form-group
        id="input-group-email"
        label-cols-sm="3"
        label="Email:"
        label-for="email"
      >
        <b-form-input
          id="email"
          v-model="$v.form.email.$model"
          type="email"
          :state="validateState('email')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.email.required">
          Email is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.email.email">
          Must be a valid email
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- Password Field -->
      <b-form-group
        id="input-group-password"
        label-cols-sm="3"
        label="Password:"
        label-for="password"
      >
        <b-form-input
          id="password"
          type="password"
          v-model="$v.form.password.$model"
          :state="validateState('password')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.password.required">
          Password is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.password.length">
          Password must be between 5-10 characters long
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.password.containsNumber">
          Password must contain at least one number
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.password.containsSpecialChar">
          Password must contain at least one special character
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- Confirm Password Field -->
      <b-form-group
        id="input-group-confirmedPassword"
        label-cols-sm="3"
        label="Confirm Password:"
        label-for="confirmedPassword"
      >
        <b-form-input
          id="confirmedPassword"
          type="password"
          v-model="$v.form.confirmedPassword.$model"
          :state="validateState('confirmedPassword')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.confirmedPassword.required">
          Password confirmation is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback
          v-else-if="!$v.form.confirmedPassword.sameAsPassword"
        >
          The confirmed password is not equal to the original password
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- Form Buttons -->
      <b-form-group class="text-center">
        <b-button type="reset" class="buttons">Reset</b-button>
        <b-button type="submit" class="buttons">Register</b-button>
      </b-form-group>
      <div class="mt-2 text-center">
        You have an account already?
        <router-link to="login"> Log in here</router-link>
      </div>
    </b-form>
    <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
    >
      Register failed: {{ form.submitError }}
    </b-alert>
  </div>
</template>


<script>
import { required, minLength, maxLength, alpha, sameAs, email } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";

export default {
  name: "Register",
  mixins: [validationMixin],
  data() {
    return {
      form: {
        username: "",
        firstname: "",
        lastname: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: "",
        submitError: undefined
      },
      countries: [],
      usernameExists: false,
    };
  },
  validations: {
    form: {
      username: {
        required,
        length: (u) => minLength(3)(u) && maxLength(8)(u),
        alpha
      },
      firstname: { required },
      lastname: { required },
      country: { required },
      email: { required, email },
      password: {
        required,
        length: (p) => minLength(5)(p) && maxLength(10)(p),
        containsNumber: (value) => /\d/.test(value),
        containsSpecialChar: (value) => /[!@#$%^&*(),.?":{}|<>]/.test(value),
      },
      confirmedPassword: {
        required,
        sameAsPassword: sameAs("password")
      }
    }
  },
  async mounted() {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const countries = await response.json();
      this.countries = countries.map(country => ({
        value: country.name.common,
        text: country.name.common
      }));
    } catch (error) {
      console.error("Failed to fetch countries:", error);
    }
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Register() {
      try {
        const userDetails = {
          username: this.form.username,
          firstname: this.form.firstname,
          lastname: this.form.lastname,
          country: this.form.country,
          email: this.form.email,
          password: this.form.password
        };
        console.log(userDetails);
        const url = this.$root.store.server_domain  + "/Register";
        this.axios.defaults.withCredentials = true;
        const response = await this.axios.post(
        url,
          userDetails
        );
        this.$router.push("/login");
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },
    onRegister() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.Register();
    },
    onReset() {
      this.form = {
        username: "",
        firstname: "",
        lastname: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: "",
      };
      this.$nextTick(() => {
        this.$v.$reset();
      });
    }
  }
};

</script>

<style lang="scss" scoped>
.register-form {
  font-size: 20px;
  color: black;
  max-width: 600px;
  margin: 50px auto;
  background-color: rgba(255, 255, 255, 0.8);
  border: 2px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 15px;
}

.title {
  font-family: 'Pacifico', cursive;
  font-size: 4em;
  margin-bottom: 20px;
  color: black;
  text-align: center;
}

.buttons {
  width: 100px; /* Minimized button width */
  margin: 0 10px;
  background-color: rgb(165, 107, 57);
  border: none; /* Remove border */
  outline: none; /* Remove outline */
  color: white; /* Text color */
  padding: 10px 20px; /* Adjust padding for button size */
  border-radius: 8px; /* Optional: Add border radius for rounded corners */
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s; /* Smooth transition */
}

.buttons:hover {
  background-color: #543B14; /* Darker brown color on hover */
}
</style>
