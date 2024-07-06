<template>
  <div id="app" class="background">
    <Navbar />
    <router-view />
  </div>
</template>

<script>

// import Navbar
import Navbar from "./components/Nvabar.vue";

export default {
  name: "App",
  components: {
    Navbar
  },
  methods: {
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");

      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

.background {
  background-image: url('/src/assets/images/background.jpg');
  background-size: cover;
  background-position: center;
  min-height: 100vh; /* Ensure full viewport height coverage */
  font-family: "Montserrat", sans-serif;
  color: black;
}

#app {
  font-family:  "Montserrat", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
