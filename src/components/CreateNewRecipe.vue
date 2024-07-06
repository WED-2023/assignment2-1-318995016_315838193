<template>
  <div>
    <!-- Recipe Creation Modal -->
    <b-modal
      id="create-recipe-modal"
      ref="createRecipeModal"
      @ok="handleSubmit"
      :ok-only="false"
      hide-footer
    >
      <template #modal-title>
        <div class="modal-title-container">
          <img src="@/assets/images/navbarLOGO.jpg" alt="Logo" class="modal-logo"/>
          <span>Create New Recipe</span>
        </div>
      </template>

      <b-form @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Recipe Title"
          label-for="recipe-title"
          class="form-group"
        >
          <b-form-input
            id="recipe-title"
            v-model="recipe.title"
            required
            placeholder="Enter recipe title"
          ></b-form-input>
          <span class="required">*</span>
        </b-form-group>

        <b-form-group
          label="Image URL"
          label-for="recipe-image"
          class="form-group"
        >
          <b-form-input
            id="recipe-image"
            v-model="recipe.image"
            required
            placeholder="Enter image URL"
          ></b-form-input>
          <span class="required">*</span>
        </b-form-group>

        <b-form-group
          label="Summary"
          label-for="recipe-summary"
          class="form-group"
        >
          <b-form-textarea
            id="recipe-summary"
            v-model="recipe.summary"
            required
            placeholder="Enter a brief summary"
          ></b-form-textarea>
          <span class="required">*</span>
        </b-form-group>

        <b-form-group
          label="Ready in Minutes"
          label-for="recipe-ready-in-minutes"
          class="form-group"
        >
          <b-form-input
            id="recipe-ready-in-minutes"
            type="number"
            v-model="recipe.readyInMinutes"
            required
            placeholder="Enter preparation time in minutes"
          ></b-form-input>
          <span class="required">*</span>
        </b-form-group>

        <b-form-group
          label="Aggregate Likes"
          label-for="recipe-aggregate-likes"
          class="form-group"
        >
          <b-form-input
            id="recipe-aggregate-likes"
            type="number"
            v-model="recipe.aggregateLikes"
            required
            placeholder="Enter aggregate likes"
          ></b-form-input>
          <span class="required">*</span>
        </b-form-group>

        <b-form-group
          label="Vegetarian"
          label-for="recipe-vegetarian"
          class="form-group"
        >
          <b-form-checkbox
            id="recipe-vegetarian"
            v-model="recipe.vegetarian"
          >
            <!-- Vegetarian -->
          </b-form-checkbox>
        </b-form-group>

        <b-form-group
          label="Vegan"
          label-for="recipe-vegan"
          class="form-group"
        >
          <b-form-checkbox id="recipe-vegan" v-model="recipe.vegan">
            <!-- Vegan -->
          </b-form-checkbox>
        </b-form-group>

        <b-form-group
          label="Gluten Free"
          label-for="recipe-gluten-free"
          class="form-group"
        >
          <b-form-checkbox
            id="recipe-gluten-free"
            v-model="recipe.glutenFree"
          >
            <!-- Gluten Free -->
          </b-form-checkbox>
        </b-form-group>

        <b-form-group
          label="Servings"
          label-for="recipe-servings"
          class="form-group"
        >
          <b-form-input
            id="recipe-servings"
            type="number"
            v-model="recipe.servings"
            required
            placeholder="Enter number of servings"
          ></b-form-input>
          <span class="required">*</span>
        </b-form-group>

        <b-form-group
          label="Instructions"
          label-for="recipe-instructions"
          class="form-group"
        >
          <b-form-textarea
            id="recipe-instructions"
            v-model="recipe.instructions"
            required
            placeholder="Enter cooking instructions"
          ></b-form-textarea>
          <span class="required">*</span>
        </b-form-group>

        <b-form-group
          label="Ingredients"
          label-for="recipe-ingredients"
          class="form-group"
        >
          <b-form-textarea
            id="recipe-ingredients"
            v-model="recipe.ingredients"
            required
            placeholder="Format: name, amount, unit"
          ></b-form-textarea>
          <span class="required">*</span>
        </b-form-group>

        <b-button
          type="submit"
          variant="success"
          class="submit-button"
        >
          Submit
        </b-button>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import { mockAddUserRecipe } from "../services/user.js";
import { EventBus } from "../eventBus.js";
export default {
  name: "CreateNewRecipe",
  data() {
    return {
      recipe: {
        title: "",
        image: "",
        summary: "",
        readyInMinutes: null,
        aggregateLikes: null,
        vegetarian: false,
        vegan: false,
        glutenFree: false,
        servings: null,
        instructions: "",
        ingredients: "",
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
    showModal() {
      this.$refs.createRecipeModal.show(); // Ensure this line shows the modal
    },
    async handleSubmit() {
      if (this.isFormValid()) {
        try {
          const response = await mockAddUserRecipe(this.recipe);
          if (response && response.status === 200 && response.response && response.response.data && response.response.data.success) {
            this.$bvModal.hide("create-recipe-modal");
            this.addRecipeToMyRecipes();
          } else {
            alert("Error: Could not add the recipe.");
          }
        } catch (error) {
          alert("Error: " + error.message);
        }
      } else {
        alert("Please fill out all required fields.");
      }
    },
    isFormValid() {
      return (
        this.recipe.title &&
        this.recipe.image &&
        this.recipe.summary &&
        this.recipe.readyInMinutes !== null &&
        this.recipe.aggregateLikes !== null &&
        this.recipe.servings !== null &&
        this.recipe.instructions &&
        this.recipe.ingredients
      );
    },
    addRecipeToMyRecipes() {
      this.$emit("add-recipe", { ...this.recipe });
      this.resetForm();
    },
    resetForm() {
      this.recipe = {
        title: "",
        image: "",
        summary: "",
        readyInMinutes: null,
        aggregateLikes: null,
        vegetarian: false,
        vegan: false,
        glutenFree: false,
        servings: null,
        instructions: "",
        ingredients: "",
      };
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
