<template>
  <b-navbar
    class="navbar"
    style="background-color: #121212 !important"
    toggleable="lg"
    type="dark"
    variant="info"
  >
    <b-collapse id="nav-collapse" is-nav>
      <div class="navbar-content">
        <b-navbar-brand href="#" class="logo">
          <img src="@/assets/images/navbarLOGO.jpg" height="40" width="150" alt="LiRe" />
        </b-navbar-brand>

        <div class="nav-links">
          <router-link to="/" class="nav-link" exact>
            <span class="item">
              <i class="fas fa-utensils"></i> Recipes
            </span>
          </router-link>

          <router-link to="/search" class="nav-link" exact>
            <span class="item">
              <i class="fas fa-search"></i> Search
            </span>
          </router-link>

          <router-link to="/about" class="nav-link" exact>
            <span class="item">
              <i class="fas fa-info-circle"></i> About
            </span>
          </router-link>

          <b-link
            v-if="$root.store.username"
            @click="openCreateRecipeModal"
            class="nav-link"
          >
            <span class="item">
              <i class="fas fa-plus-circle"></i> Create New Recipe
            </span>
          </b-link>

          <b-dropdown
            v-if="$root.store.username"
            right
            variant="link"
            class="nav-link custom-white-button"
          >
            <template #button-content>
              <span class="item">
                <i class="fas fa-user"></i> Personal Area
              </span>
            </template>

            <b-dropdown-item class="nav-link" exact>
              <router-link to="/family-recipes" class="item2" exact>
                <i class="fas fa-heart"></i> My Family Recipes
              </router-link>
            </b-dropdown-item>

            <b-dropdown-item class="nav-link" exact>
              <router-link to="/my-recipes" class="item2" exact>
                <i class="fas fa-book"></i> My Recipes
              </router-link>
            </b-dropdown-item>

            <b-dropdown-item class="nav-link" exact>
              <router-link to="/favorites" class="item2" exact>
                <i class="fas fa-star"></i> My Favorite Recipes
              </router-link>
            </b-dropdown-item>

            <b-dropdown-item @click="Logout" class="nav-link">
              <span class="item2">
                <i class="fas fa-sign-out-alt"></i> Log Out
              </span>
            </b-dropdown-item>
          </b-dropdown>
        </div>

        <div class="auth-links" v-if="!$root.store.username">
          <router-link to="/register" class="nav-link" exact>
            <span class="item">
              <i class="fas fa-user-plus"></i> Register
            </span>
          </router-link>

          <router-link to="/login" class="nav-link" exact>
            <span class="item">
              <i class="fas fa-sign-in-alt"></i> Login
            </span>
          </router-link>

          <span class="guest">
            <i class="fas fa-user"></i> Hello Guest
          </span>
        </div>

        <div class="user-links" v-else>
          <span class="hello-user">
            <i class="fas fa-user"></i> Hello {{ $root.store.username }}
          </span>
        </div>
      </div>
    </b-collapse>
      <CreateNewRecipe/>
  </b-navbar>
</template>

<script>
import CreateNewRecipe from "./CreateNewRecipe.vue";

import { EventBus } from "../eventBus.js";
export default {
  name: "Navbar",
  components: {
    CreateNewRecipe
  },
  methods: {
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");

      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    },
    openCreateRecipeModal() {
      EventBus.$emit("openCreateRecipeModal");
    },
  },
};
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

.navbar-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.nav-links,
.auth-links,
.user-links {
  display: flex;
  align-items: center;
}

.nav-links .nav-link,
.auth-links .nav-link,
.user-links .nav-link {
  margin-left: 20px;
}

.logo {
  margin-left: 20px; /* Adjust this value to move the logo to the right */
}

.item {
  padding: 5px;
  font-family: "proximanova", Arial, Helvetica, Geneva, sans-serif;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  line-height: 1.2;
  color: white;
  text-decoration: none;
  border-bottom: 3px solid transparent;
  margin-right: 30px; /* Add space between the items */
}

.item2 {
  padding: 5px;
  font-family: "proximanova", Arial, Helvetica, Geneva, sans-serif;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  line-height: 1.2;
  color: black;
  text-decoration: none;
  border-bottom: 3px solid transparent;
  margin-right: 30px; /* Add space between the items */
}

.item i, .guest .fas.fa-user, .hello-user .fas.fa-user {
  font-size: 24px; /* Increase the font size for the icons */
  margin-right: 10px; /* Add space between the icon and the text */
}

.item:hover {
  color: rgb(165, 107, 57);
  text-shadow: 0.1px 1px black;
  cursor: pointer;
  border-bottom: 3px rgb(165, 107, 57);
}

.guest {
  font-family: "proximanova", Arial, Helvetica, Geneva, sans-serif;
  font-size: 12px;
  font-weight: 700;
  color: white;
  margin-left: 20px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 0; /* Remove padding to make it look less like a button */
}

.hello-user {
  margin-left: 20px;
  font-family: "proximanova", Arial, Helvetica, Geneva, sans-serif;
  font-size: 12px;
  font-weight: 700;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.b-dropdown-item {
  padding: 0;
}

.b-dropdown-item:hover {
  background-color: black !important;
  color: rgb(165, 107, 57) !important;
}
</style>
