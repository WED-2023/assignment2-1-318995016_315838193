<template>
  <div class="container">
    <div>
      <div class="title">Search Page</div>

      <!-- Search Form -->
      <div class="formd mx-auto">
        <b-form @submit.prevent="onSearch" @reset.prevent="onReset">
          <b-form-group
            id="input-group-name"
            label-cols-sm="3"
            label="Recipe name:"
            label-for="recipe_name"
          >
            <!-- Recipe Name Input -->
            <b-form-input
              id="recipe_name"
              v-model="form.recipe_name"
              type="text"
              placeholder="Enter Recipe name"
              required
            ></b-form-input>
          </b-form-group>

          <!-- Amount Select -->
          <b-form-group
            id="input-group-amount"
            label-cols-sm="3"
            label="Amount:"
            label-for="amount"
          >
            <b-form-select
              id="amount"
              v-model="form.amount"
              :options="amount_options"
              required
            ></b-form-select>
          </b-form-group>

          <!-- Sort By Select -->
          <b-form-group
            id="input-group-sort"
            label-cols-sm="3"
            label="Sort by:"
            label-for="sort"
          >
            <b-form-select
              id="sort"
              v-model="form.sort"
              :options="sort_options"
              required
            ></b-form-select>
          </b-form-group>

          <!-- Cuisine Select -->
          <b-form-group
            id="input-group-cuisine"
            label-cols-sm="3"
            label="Cuisine:"
            label-for="cuisine"
          >
            <b-form-select
              id="cuisine"
              v-model="form.cuisine"
              :options="cuisines"
              required
            ></b-form-select>
          </b-form-group>

          <!-- Diet Select -->
          <b-form-group
            id="input-group-diet"
            label-cols-sm="3"
            label="Diet:"
            label-for="diet"
          >
            <b-form-select
              id="diet"
              v-model="form.diet"
              :options="diets"
              required
            ></b-form-select>
          </b-form-group>

          <!-- Intolerance Select -->
          <b-form-group
            id="input-group-intolerance"
            label-cols-sm="3"
            label="Intolerance:"
            label-for="intolerance"
          >
            <b-form-select
              id="intolerance"
              v-model="form.intolerance"
              :options="intolerances"
              required
            ></b-form-select>
          </b-form-group>

          <!-- Reset and Search Buttons -->
          <b-form-group class="text-center">
            <b-button type="reset" class="w-15 buttons">Reset</b-button>
            <b-button type="submit" class="w-20 buttons">Search</b-button>
          </b-form-group>
        </b-form>
      </div>

      <!-- Search Error Alert -->
      <b-alert
        class="mt-2"
        v-if="form.submitError"
        variant="warning"
        dismissible
        show
      >
        Search failed: {{ form.submitError }}
      </b-alert>

      <!-- No Results Found Alert -->
      <b-alert
        class="mt-2"
        v-if="noResultsFound"
        variant="warning"
        dismissible
        show
      >
        No results found for your search criteria. Please try again with different parameters.
      </b-alert>

      <!-- Search Results Display -->
      <div class="results mx-auto" v-if="searchResults.length">
        <div class="text-center mb-3">
          <span>Search Results for: {{ form.recipe_name }}, Amount: {{ form.amount }}, Order by: {{ form.sort }}</span>
          <p>
            <span v-if="form.cuisine">Cuisine: {{ form.cuisine }}, </span>
            <span v-if="form.diet">Diet: {{ form.diet }}, </span>
            <span v-if="form.intolerance">Intolerance: {{ form.intolerance }}</span>
          </p>
        </div>
        
        <div class="results-container">
          <RecipePreview v-for="recipe in searchResults" :key="recipe.id" :recipe="recipe" class="recipe-preview" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import RecipePreview from "../components/RecipePreview";
import { mockGetSearchRecipesPreview } from "../services/recipes";

export default {
  name: "Search",
  components: {
    RecipePreview,
  },
  data() {
    return {
      // Form Data 
      form: {
        recipe_name: "",
        amount: "5",
        sort: "popularity",
        cuisine: "",
        diet: "",
        intolerance: "",
        submitError: undefined,
      },
      // Available Sort, Amount, Cuisines Options
      sort_options: ["popularity", "time"],
      amount_options: ["5", "10", "15"],
      cuisines: ['All', 'African', 'Asian', 'American', 'British', 'Cajun', 'Caribbean', 'Chinese', 'Eastern European', 'European', 'French', 'German', 'Greek', 'Indian', 'Irish', 'Italian', 'Japanese', 'Jewish', 'Korean', 'Latin American', 'Mediterranean', 'Mexican', 'Middle Eastern', 'Nordic', 'Southern', 'Spanish', 'Thai', 'Vietnamese'],
      diets: ['All', 'vegetarian', 'vegan', 'glutenFree', 'Ketogenic', 'Lacto-Vegetarian', 'Ovo-Vegetarian', 'Pescetarian', 'Paleo', 'Primal', 'Low FODMAP', 'Whole30'],
      intolerances: ['All','Dairy', 'Egg', 'Gluten', 'Grain', 'Peanut', 'Seafood', 'Sesame', 'Shellfish', 'Soy', 'Sulfite', 'Tree Nut'],

      // Last Search Data 
      lastSearch: JSON.parse(localStorage.getItem("lastSearch")) || null,

      // Search Results
      searchResults: [],
      noResultsFound: false,
    };
  },
  methods: {
  // Perform Search
  async onSearch() {
    try {
      const { recipe_name, amount, sort, cuisine, diet, intolerance } = this.form;
      
      // Correcting the axios import
      this.axios.defaults.withCredentials = true;
      const response = await axios.get(
        `${this.$root.store.server_domain}/recipes/searchRecipes/${recipe_name}/${amount}/${sort}/${cuisine}/${diet}/${intolerance}`
      );
      
      const results = response.data.recipes;

      this.searchResults = results;
      this.noResultsFound = results.length === 0;

      this.lastSearch = {
        recipe_name: this.form.recipe_name,
        amount: this.form.amount,
        sort: this.form.sort,
        cuisine: this.form.cuisine,
        diet: this.form.diet,
        intolerance: this.form.intolerance,
        submitError: this.form.submitError,
      };
      localStorage.setItem("lastSearch", JSON.stringify(this.lastSearch));
    } catch (err) {
      console.log(err);
      this.form.submitError = "Something went wrong, please try again.";
    }
  },
  // Reset Search Form
  onReset() {
    this.form = {
      recipe_name: "",
      amount: "5",
      sort: "popularity",
      cuisine: "",
      diet: "",
      intolerance: "",
    };
    this.searchResults = [];
    this.noResultsFound = false;
  },
},
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Concert+One:400,700&display=swap");
@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');

.buttons {
  align-items: center;
  padding: 8px;
  border-radius: 10px;
  font-family: "Concert One", serif;
  font-size: 16px;
  font-weight: 400;
  color: #000000;
  background-color: rgba(255, 255, 255, 0.8);
  width: 20%;
  margin-right: 20px;
}
.buttons:hover {
  color: black;
  background-color: rgb(245, 230, 220);
}
.results {
  border-radius: 10px;
  width: 100%;
  color: black;
  margin-top: 20px;
  padding: 10px;
  text-align: center;
}
.container {
  font-family: "Concert One", serif;
  font-size: 20px;
  color: black;
}
.formd {
  max-width: 600px;
  margin: 0 auto; /* Center the form horizontally */
}
.title {
  font-family: 'Pacifico', cursive;
  font-size: 4em;
  margin-bottom: 20px;
  color: black;
  text-align: center;
  letter-spacing: 0.1em; /* Adjust the spacing between characters */
}

.w-15.buttons,
.w-20.buttons {
  background-color: rgb(165, 107, 57);
  border: none; /* Remove border */
  outline: none; /* Remove outline */
  color: white; /* Text color */
  padding: 10px 20px; /* Adjust padding for button size */
  border-radius: 8px; /* Optional: Add border radius for rounded corners */
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s; /* Smooth transition */
}

.w-15.buttons:hover,
.w-20.buttons:hover {
  background-color: #543B14; /* Darker brown color on hover */
}

/* Add these styles */
.results-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.recipe-preview {
  flex: 0 1 45%; /* Adjust the width to roughly half the container */
  margin: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
}

.no-results {
  font-size: 1.2em;
  color: #666;
  text-align: center;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .recipe-preview {
    flex: 0 1 70%; /* Adjust for smaller screens */
  }
}

@media (max-width: 480px) {
  .recipe-preview {
    flex: 0 1 90%; /* Adjust for very small screens */
  }
}
</style>
