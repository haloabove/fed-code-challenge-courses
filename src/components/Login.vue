<template>
  <b-modal ref="login-modal" id="login-modal" hide-footer>
    <template #modal-title> Log In </template>
    <div class="d-block text-center">
      <form @submit.prevent="onSubmit">
        <div class="input">
          <label for="usernname">Username:</label>
          <input
            type="text"
            id="username"
            placeholder="Enter Username"
            required
            v-model="username"
          />
        </div>
        <div class="input">
          <label for="password">Password:</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Enter Password"
            required
          />
        </div>
        <messages :errors="errors" :success="success"></messages>

        <div class="submit">
          <button type="submit" id="submit">
            Log in
            <i class="arrow right"></i>
          </button>
        </div>
      </form>
    </div>
  </b-modal>
</template>

<script>
import Messages from "./Messages";
import { mapGetters } from "vuex";

export default {
  name: "Login",
  components: {
    Messages,
  },
  data() {
    return {
      username: "",
      password: "",
      errors: [],
      success: [],
      response: null,
    };
  },
  computed: {
    ...mapGetters({
      loggedIn: "getLoggedIn",
    }),
  },
  methods: {
    onSubmit(e) {
      const formData = {
        username: this.username,
        password: this.password,
      };

      this.validateForm(e, formData);

      if (this.errors.length == 0) {
        //The Way forward
        // fetch("https://reqres.in/api/login", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify(formData),
        // })
        //   .then((response) => {
        //     if (!response.ok) {
        //       throw response;
        //     }
        //     return response.json();
        //   })
        //   .then((json) => {
        //     let key = json.token;
        //     localStorage.setItem(key, "Login");
        //     this.success.push("Login successful!");
        //   })
        //   .catch((err) => {
        //     err.json().then((errorMessage) => {
        //       this.errors.push(errorMessage.error);
        //     });
        //   });

        //Temporary solution
        this.$store.dispatch("checkUsernameAndPass", formData);
        if (this.loggedIn) {
          this.success.push("Login successful!");
        } else {
          this.errors.push("Wrong Username or Password");
        }
      }
    },
    setPassword(val) {
      this.password = val;
    },
    validateForm(e, data) {
      e.preventDefault();
      this.errors = [];
      this.success = [];
      if (!data.username.length) {
        this.errors.push("Username field is required");
      }
      if (!data.password.length) {
        this.errors.push("Password field is required");
      }
    },
  },
};
</script>