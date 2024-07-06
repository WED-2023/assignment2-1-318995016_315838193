<template>
  <div class="recipe-container" v-if="recipe">
    <div class="recipe-header">
      <h1 class="recipe-title">{{ recipe.title }}</h1>
      <img :src="recipe.image" alt="Recipe Image" class="recipe-image" />
      <div class="recipe-tags">
        <span v-if="recipe.vegan">🌱 Vegan</span>
        <span v-if="recipe.vegetarian">🥗 Vegetarian</span>
        <span v-if="recipe.glutenFree">🌾 Gluten-Free</span>
      </div>
      <div class="recipe-meta">
        <p>⏱{{ recipe.readyInMinutes }} minutes</p>
        <p>
          <b-icon :icon="'heart'" aria-hidden="true"></b-icon>
          {{ recipe.aggregateLikes }} likes
        </p>
        <p>🍽{{ recipe.portions }} Serves</p>
      </div>
    </div>
    <div class="recipe-body">
      <h2>Ingredients</h2>
      <ul class="ingredient-list">
        <li v-for="ingredient in recipe.extendedIngredients" :key="ingredient.id">
          {{ ingredient.original }}
        </li>
      </ul>
      <h2>Instructions</h2>
      <ul class="instruction-list">
        <li v-for="(step, index) in splitInstructions" :key="index">
          {{ step }}
        </li>
      </ul>
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
      completedSteps: [],
    };
  },
  computed: {
    splitInstructions() {
      if (!this.recipe || !this.recipe.instructions) return [];
      return this.recipe.instructions.split('\n\n<br>').map(step => step.replace(/\n\n/g, ''));
    }
  },
  mounted() {
    this.fetchRecipe();
  },
  methods: {
    async fetchRecipe() {
      try {
        const recipeId = this.$route.params.id;
        const { status, data } = mockGetRecipeFullDetails(recipeId);
        if (status !== 200) {
          this.$router.replace("/NotFound");
          return;
        }

        this.recipe = data.recipe;
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
  align-items: center; /* Align items vertically center */
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
.instruction-list {
  list-style: none;
  padding: 0;
}

.ingredient-list li,
.instruction-list li {
  background-color: #f9f9f9;
  margin: 5px 0;
  padding: 10px 15px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  transition: background-color 0.3s ease;
}

.ingredient-list li:hover,
.instruction-list li:hover {
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
