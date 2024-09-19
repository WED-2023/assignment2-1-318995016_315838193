<template>
  <div class="recipe-container" v-if="recipe">
    <div class="recipe-header">
      <h1 class="recipe-title">{{ recipe.recipe_name }}</h1>
      <img :src="recipe.image_recipe" alt="Recipe Image" class="recipe-image" />
      <div class="recipe-tags">
        <span v-if="recipe.is_vegan">🌱 Vegan</span>
        <span v-if="recipe.is_vegeterian">🥗 Vegetarian</span>
        <span v-if="recipe.is_glutenFree">🌾 Gluten-Free</span>
      </div>
      <div class="recipe-meta">
        <p>⏱ {{ recipe.prepare_time }} minutes</p>
        <p>
          <b-icon :icon="'heart'" aria-hidden="true"></b-icon>
          {{ recipe.likes }} likes
        </p>
        <p>🍽 {{ recipe.portions }} Serves</p>
      </div>
    </div>
    <div class="recipe-body">
      <h2>Summary</h2>
      <ul class="summary">
        <li>
          {{ recipe.summary }}
        </li>
      </ul>
      <h2>Ingredients</h2>
      <ul class="ingredient-list">
        <li v-for="ingredient in recipe.recipe_ingredient" :key="ingredient.name">
          {{ ingredient.amount }} {{ ingredient.unitLong }} {{ ingredient.name }}
        </li>
      </ul>
      <h2>Instructions</h2>
      <ul class="instruction-list"
        v-if="recipe.recipe_instruction && recipe.recipe_instruction[0] && recipe.recipe_instruction[0].steps && recipe.recipe_instruction[0].steps.length">
        <li v-for="step in recipe.recipe_instruction[0].steps" :key="step">
          {{ step }}
        </li>
      </ul>
      <p v-else>No instructions available</p>
    </div>
  </div>
  <div v-else class="loading">Loading...</div>
</template>

<script>
import axios from "axios";
import { mockGetRecipeFullDetails } from "../services/recipes";
import { BIcon } from 'bootstrap-vue';

export default {
  components: {
    BIcon
  },
  data() {
    return {
      recipe: null,
    };
  },
  mounted() {
    this.fetchRecipe();
  },
  methods: {
    async addToView(recipe_type) {
      if (this.$root.store.username) {
        console.log("add to viewed list");
        try {
          this.axios.defaults.withCredentials = true;
          // Make a PUT request to the server to add the recipe to the user's viewed list
          const response = await axios.put(
            `${this.$root.store.server_domain}/users/lastViewedRecipes/${this.recipe.recipe_id}/${recipe_type}`
          );

        } catch (error) {
          console.error(error);
        }
      }
    },
    async fetchRecipe() {
      try {
        const { id, recipe_type } = this.$route.params;

        this.axios.defaults.withCredentials = true;

        let response;
        if (recipe_type === "family") {
          response = await axios.get(
            this.$root.store.server_domain + `/users/familyRecipes/${id}`
          );
        } else if (recipe_type === "favorite") {
          response = await axios.get(
            this.$root.store.server_domain + `/users/favoriteRecipes/${id}/${recipe_type}`
          );
        } else if (recipe_type === "personal") {
          response = await axios.get(
            this.$root.store.server_domain + `/users/personalRecipes/${id}`
          );
        } else if (recipe_type === "last_viewed") {
          response = await axios.get(
            this.$root.store.server_domain + `/users/lastViewedRecipes/${id}`
          );
        } else {
          response = await axios.get(
            this.$root.store.server_domain + `/recipes/${id}`
          );
        }
        // else {
        //   this.$router.replace("/NotFound");
        //   return;
        // }


        if (!response || response.status !== 200 || !response.data) {
          this.$router.replace("/NotFound");
          return;
        }

        this.recipe = response.data.recipe;

        // After successfully fetching the recipe, add it to the viewed list
        this.addToView(recipe_type);
      } catch (error) {
        console.log("error.response.status", error.data.status);
        this.$router.replace("/NotFound");
        return;
      }
    },
  },
};
</script>

<style scoped>
.recipe-container {
  max-width: 900px;
  margin: 20px auto;
  padding: 25px 40px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.recipe-header {
  text-align: center;
}

.recipe-title {
  font-size: 2.5em;
  margin-bottom: 20px;
  color: #333;
}

.recipe-image {
  width: 100%;
  height: auto;
  max-height: 500px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 20px;
}

.recipe-tags {
  margin: 10px 0;
  font-size: 1.2em;
  display: flex;
  justify-content: center;
  gap: 15px;
}

.recipe-tags span {
  background-color: #ffeeba;
  padding: 5px 10px;
  border-radius: 20px;
}

.recipe-meta {
  font-size: 1em;
  color: #666;
  display: flex;
  justify-content: center;
  gap: 20px;
  align-items: center;
  /* Align items vertically center */
}

.recipe-body {
  margin-top: 20px;
}

.recipe-body h2 {
  font-size: 1.8em;
  margin-bottom: 15px;
  color: #333;
  border-bottom: 2px solid #ff6347;
  display: inline-block;
  padding-bottom: 5px;
}

.ingredient-list,
.instruction-list,
.summary {
  list-style: none;
  padding: 0;
}

.ingredient-list li,
.instruction-list li,
.summary li {
  background-color: #f9f9f9;
  margin: 5px 0;
  padding: 10px 15px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  transition: background-color 0.3s ease;
}

.ingredient-list li:hover,
.instruction-list li:hover,
.summary li:hover {
  background-color: #ffeeba;
}

.instruction-list li input {
  margin-right: 10px;
}

.loading {
  text-align: center;
  font-size: 1.5em;
  color: #666;
}

.heart-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2em;
  margin-left: 8px;
  color: red;
  transition: transform 0.2s ease;
}

.heart-button:hover {
  transform: scale(1.2);
}
</style>
