<template>
  <div>
    <!-- Recipe Creation Modal -->
    <b-modal id="create-recipe-modal" ref="createRecipeModal" @ok="handleSubmit" :ok-only="false" hide-footer>
      <template #modal-title>
        <div class="modal-title-container">
          <img src="@/assets/images/navbarLOGO.jpg" alt="Logo" class="modal-logo" />
          <span>Create New Recipe</span>
        </div>
      </template>

      <!-- Toggle between Personal and Family Recipe -->
      <div class="d-flex justify-content-center form-group">
        <b-button-group class="w-auto">

          <b-button :variant="recipeType === 'personal' ? 'primary' : 'secondary'" @click="setRecipeType('personal')" class="mr-2">
            Personal Recipe
          </b-button>
          
          <b-button :variant="recipeType === 'family' ? 'primary' : 'secondary'" @click="setRecipeType('family')">
            Family Recipe
          </b-button>
        </b-button-group>
      </div>
      <b-form @submit.stop.prevent="handleSubmit">
        <b-form-group label="Recipe Title" label-for="recipe-title" class="form-group">
          <b-form-input id="recipe-title" v-model="recipe.recipe_name" required
            placeholder="Enter recipe title"></b-form-input>
          <span class="required">*</span>
        </b-form-group>

        <b-form-group label="Image URL" label-for="recipe-image" class="form-group">
          <b-form-input id="recipe-image" v-model="recipe.image_recipe" required
            placeholder="Enter image URL"></b-form-input>
          <span class="required">*</span>
        </b-form-group>

        <b-form-group label="Summary" label-for="recipe-summary" class="form-group">
          <b-form-textarea id="recipe-summary" v-model="recipe.summary" required
            placeholder="Enter a brief summary"></b-form-textarea>
          <span class="required">*</span>
        </b-form-group>

        <b-form-group label="Ready in Minutes" label-for="recipe-ready-in-minutes" class="form-group">
          <b-form-input id="recipe-ready-in-minutes" type="number" v-model="recipe.prepare_time" required
            placeholder="Enter preparation time in minutes"></b-form-input>
          <span class="required">*</span>
        </b-form-group>

        <b-form-group label="Aggregate Likes" label-for="recipe-aggregate-likes" class="form-group">
          <b-form-input id="recipe-aggregate-likes" type="number" v-model="recipe.likes" required
            placeholder="Enter aggregate likes"></b-form-input>
          <span class="required">*</span>
        </b-form-group>

        <b-form-group label="Vegetarian" label-for="recipe-vegetarian" class="form-group">
          <b-form-checkbox id="recipe-vegetarian" v-model="recipe.is_vegeterian">
            <!-- Vegetarian -->
          </b-form-checkbox>
        </b-form-group>

        <b-form-group label="Vegan" label-for="recipe-vegan" class="form-group">
          <b-form-checkbox id="recipe-vegan" v-model="recipe.is_vegan">
            <!-- Vegan -->
          </b-form-checkbox>
        </b-form-group>

        <b-form-group label="Gluten Free" label-for="recipe-gluten-free" class="form-group">
          <b-form-checkbox id="recipe-gluten-free" v-model="recipe.is_glutenFree">
            <!-- Gluten Free -->
          </b-form-checkbox>
        </b-form-group>

        <b-form-group label="Servings" label-for="recipe-servings" class="form-group">
          <b-form-input id="recipe-servings" type="number" v-model="recipe.portions" required
            placeholder="Enter number of servings"></b-form-input>
          <span class="required">*</span>
        </b-form-group>

        <!-- Conditionally Show These Fields for Family Recipe -->
        <b-form-group v-if="recipeType === 'family'" label="Who Made the Recipe?" label-for="who-made"
          class="form-group">
          <b-form-input id="who-made" v-model="recipe.who_made" required
            placeholder="Enter who made the recipe"></b-form-input>
          <span class="required">*</span>
        </b-form-group>

        <b-form-group v-if="recipeType === 'family'" label="When Was it Prepared?" label-for="when-prep"
          class="form-group">
          <b-form-input id="when-prep" v-model="recipe.when_prep" required
            placeholder="Enter when the recipe was prepared"></b-form-input>
          <span class="required">*</span>
        </b-form-group>

        <b-form-group label="Instructions" label-for="recipe-instructions" class="form-group">
          <b-form-textarea id="recipe-instructions" v-model="recipe.RecipesInstructions" required
            placeholder="Format: step1.step2."></b-form-textarea>
          <span class="required">*</span>
        </b-form-group>

        <b-form-group label="Ingredients" class="form-group">
          <div v-for="(ingredient, index) in recipe.RecipesIngredients" :key="index" class="mb-3">
            <b-row>
              <b-col>
                <b-form-input v-model="ingredient.name" placeholder="Enter ingredient name" required></b-form-input>
              </b-col>
              <b-col>
                <b-form-input v-model="ingredient.amount" placeholder="Enter amount" type="number"
                  required></b-form-input>
              </b-col>
              <b-col>
                <b-form-input v-model="ingredient.unitLong" placeholder="Enter unit (e.g., cups, kg)"
                  required></b-form-input>
              </b-col>
              <b-col cols="auto">
                <b-button variant="danger" @click="removeIngredient(index)">
                  Remove
                </b-button>
              </b-col>
            </b-row>
          </div>

          <b-button variant="primary" @click="addIngredient">
            Add Ingredient
          </b-button>
        </b-form-group>

        <b-button type="submit" variant="success" class="submit-button">
          Submit
        </b-button>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import { EventBus } from "../eventBus.js";
export default {
  name: "CreateNewRecipe",
  data() {
    return {
      recipeType: 'personal',  // Default to personal recipe
      recipe: {
        recipe_name: "",
        image_recipe: "",
        summary: "",
        prepare_time: null,
        likes: null,
        is_vegeterian: false,
        is_vegan: false,
        is_glutenFree: false,
        portions: null,
        RecipesInstructions: "",
        RecipesIngredients: [],
        who_made: "", // Required for family recipe
        when_prep: "", // Required for family recipe
        recipe_type: 'personal' // Default to 'personal'

      },
    };
  },

  mounted() {
    EventBus.$on('openCreateRecipeModal', this.showModal); // Ensure this line listens for the event
  },
  beforeDestroy() {
    EventBus.$off('openCreateRecipeModal', this.showModal); // Ensure this line removes the event listener
  },

  methods: {
    addIngredient() {
      this.recipe.RecipesIngredients.push({ name: "", amount: null, unitLong: "" });
    },
    removeIngredient(index) {
      this.recipe.RecipesIngredients.splice(index, 1);
    },
    setRecipeType(type) {
      this.recipeType = type;
      this.recipe.recipe_type = type; // Update the recipe_type field in the recipe object
    },
    showModal() {
      this.$refs.createRecipeModal.show(); // Ensure this line shows the modal
    },
    async handleSubmit() {
      if (this.isFormValid()) {
        try {
          // Convert RecipesInstructions  to arrays
          this.convertFieldsToArrays();

          this.axios.defaults.withCredentials = true;
          let response;

          if (this.recipeType === 'family') {
            response = await this.axios.post(
              this.$root.store.server_domain + "/users/createFamilyRecipe", this.recipe
            );
          } else {
            response = await this.axios.post(
              this.$root.store.server_domain + "/users/createPersonalRecipe", this.recipe
            );
          }

          if (response && response.status === 200) {
            this.$bvModal.hide("create-recipe-modal");
            this.$bvToast.toast('Recipe created successfully!', {
              title: 'Success',
              variant: 'success',
              solid: true
            });
            this.resetForm();
          } else {
            this.$bvToast.toast('Error: Could not add the recipe.', {
              title: 'Error',
              variant: 'danger',
              solid: true
            });
          }
        } catch (error) {
          console.error(error); // Log error for debugging
          this.$bvToast.toast(`Error: ${error.message}`, {
            title: 'Error',
            variant: 'danger',
            solid: true
          });
        }
      } else {
        this.$bvToast.toast('Please fill out all required fields.', {
          title: 'Error',
          variant: 'danger',
          solid: true
        });
      }
    },
    convertFieldsToArrays() {
      // Convert RecipesInstructions to an array
      if (typeof this.recipe.RecipesInstructions === 'string') {
        this.recipe.RecipesInstructions = this.recipe.RecipesInstructions
          .split('.')
          .map(step => step ? step.trim() : '') // Check if step is defined
          .filter(step => step.length > 0); // Remove empty steps
      }

      // Convert RecipesIngredients to an array of objects
      // if (typeof this.recipe.RecipesIngredients === 'string') {
      //   const ingredientsArray = this.recipe.RecipesIngredients.split('.').map(ingredient => ingredient.trim());
      //   this.recipe.RecipesIngredients = [];

      //   // Group every three items into an ingredient obFject
      //   for (let i = 0; i < ingredientsArray.length; i += 3) {
      //     const name = ingredientsArray[i];
      //     const amount = parseFloat(ingredientsArray[i + 1]);
      //     const unitLong = ingredientsArray[i + 2];

      //     if (name && !isNaN(amount) && unitLong) {
      //       this.recipe.RecipesIngredients.push({ name, amount, unitLong });
      //     } else {
      //       console.error('Invalid ingredient format:', { name, amount, unitLong });
      //     }
      //   }
      // }
    },
    isFormValid() {
      const ingredientsValid = this.recipe.RecipesIngredients.every(ingredient =>
        ingredient.name && !isNaN(ingredient.amount) && ingredient.unitLong
      );
      const baseValid = (
        this.recipe.recipe_name &&
        this.recipe.image_recipe &&
        this.recipe.summary &&
        this.recipe.prepare_time !== null &&
        this.recipe.likes !== null &&
        this.recipe.portions !== null &&
        this.recipe.RecipesInstructions.length > 0 &&
        ingredientsValid
      );

      if (this.recipeType === 'family') {
        return baseValid && this.recipe.who_made && this.recipe.when_prep;
      }

      return baseValid;
    },
    resetForm() {
      this.recipe = {
        recipe_name: "",
        image_recipe: "",
        summary: "",
        prepare_time: null,
        likes: null,
        is_vegeterian: false,
        is_vegan: false,
        is_glutenFree: false,
        portions: null,
        RecipesInstructions: "",
        RecipesIngredients: "",
        who_made: "",
        when_prep: ""
      };
      this.recipeType = 'personal';  // Reset to personal recipe
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Herrington&display=swap');
@import url('https://fonts.googleapis.com/css?family=Concert+One:400,700&display=swap');
@import url("https://fonts.googleapis.com/css2?family=Italianno&display=swap");

.create-recipe-button {
  margin-bottom: 20px;
}


.form-group {
  margin-bottom: 10px;
  /* Reduced margin between form groups */
  font-family: 'Concert One', serif;
}

.required {
  color: red;
  margin-left: 5px;
}

.submit-button {
  width: 100%;
  padding: 10px;
  font-family: 'Concert One', serif;
  background-color: rgb(165, 107, 57);
  /* Brown color */
  border-color: rgb(165, 107, 57);
  color: white;
  border-radius: 8px;
}

.modal-title-container {
  display: flex;
  align-items: center;
}

.modal-logo {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}

.b-modal .modal-title {
  text-align: center;
  font-weight: bold;
  font-size: 1.5rem;
  font-family: 'Herrington', cursive;
  color: white;
  background-color: #8b4513;
  /* Brown color */
  padding: 10px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.b-modal .modal-body {
  padding: 30px;
  font-family: 'Concert One', serif;
  background-size: cover;
  background-position: center;
}

.b-modal .modal-footer {
  display: flex;
  justify-content: center;
  background-color: #8b4513;
  /* Brown color */
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}

.b-form-input,
.b-form-textarea {
  border-radius: 8px;
  border: 1px solid #8b4513;
  /* Brown color */
  padding: 8px;
  /* Adjusted padding for inputs */
  font-family: 'Concert One', serif;
}

.b-form-checkbox {
  display: flex;
  align-items: center;
  font-family: 'Concert One', serif;
}
</style>