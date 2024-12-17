<script>
import { addUser, getUsers } from "../api/usersData";
import Loader from "./loader/Loader.vue";

export default {
  components: {
    Loader,
  },
  name: "NeedToRegister",
  data() {
    return {
      email: this.$route.query.email || "",
      name: this.$route.query.name || "",
      error: "",
      isLoading: false,
      loaderStyle: { right: "25px", top: "50%" },
      users: [],
    };
  },
  methods: {
    handleSubmit() {
      if (!this.name.trim()) {
        this.error = "Name is required.";
        return;
      }

      if (this.name.length <= 3) {
        this.error = "Minimum allowed number of characters is 4.";
        return;
      }

      this.error = "";
      this.isLoading = true;

      setTimeout(() => {
        this.isLoading = false;

        const newUser = { email: this.email, name: this.name };

        addUser(newUser);

        this.$router.push({
          path: "header",
          query: { email: newUser.email, name: newUser.name },
        });
      }, 500);
    },
  },
  mounted() {
    this.users = getUsers();
  },
};
</script>

<template>
  <div class="container is-flex is-justify-content-center">
    <form @submit.prevent="handleSubmit" class="box mt-5" novalidate>
      <h1 class="title is-3">You need to register</h1>

      <div class="field">
        <label class="label" for="user-email"> Email </label>
        <div class="control has-icons-left">
          <div class="input-container">
            <input
              v-model="email"
              type="email"
              id="user-email"
              name="email"
              class="input"
              placeholder="Enter your email"
              required
              disabled
            />
            <Loader
              v-if="isLoading"
              class="loader"
              :style="loaderStyle"
            ></Loader>
          </div>
          <span class="icon is-small is-left">
            <i class="fas fa-envelope" />
          </span>
        </div>

        <label class="label mt-5" for="user-name"> Your Name </label>
        <div class="control has-icons-left">
          <div class="input-container">
            <input
              v-model="name"
              type="text"
              id="user-name"
              name="name"
              class="input"
              placeholder="Enter your name"
              required
              minlength="4"
            />
            <Loader
              v-if="isLoading"
              class="loader"
              :style="loaderStyle"
            ></Loader>
          </div>
          <span class="icon is-small is-left">
            <i class="fas fa-user" />
          </span>
        </div>

        <p class="help is-danger">{{ error }}</p>
      </div>

      <div class="field">
        <button
          type="submit"
          class="button is-primary login-button"
          :disabled="isLoading"
        >
          <span v-if="isLoading" class="button-content">
            <Loader class="loader loader-button" :style="loaderStyle" />
          </span>
          <span v-else class="button-content">Register</span>
        </button>
      </div>
    </form>
  </div>
</template>

<style>
.loader-button {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(-50%, -50%);
}
</style>