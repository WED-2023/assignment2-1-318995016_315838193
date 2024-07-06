<template>
  <b-container class="recipe-preview-list">
    <div class="section-header">
      <h3 class="list-title">
        {{ title }}
        <slot></slot>
      </h3>
      <slot name="after-title"></slot>
    </div>

    <div class="button-wrapper">
      <button
          v-if="externalButtonAction && externalButtonLabel"
          class="action-button"
          @click="externalButtonAction()"
      >
        {{ externalButtonLabel }}
      </button>
      <button
          v-else-if="random"
          class="action-button"
          @click="updateRecipes(true)"
      >
        Randomize
      </button>
      <div v-else class="button-placeholder"></div>
    </div>

    <b-row class="recipe-row">
      <b-col v-for="r in recipes" :key="r.id" class="recipe-col">
        <div class="recipe-wrapper" :class="{ 'blurred': blurRecipes }">
          <div v-if="page_type === 'family'" class="whomade-andwhen">
            <span>{{ r.whomade_andwhen }}</span>
          </div>
          <div v-else class="whomade-placeholder"></div>
          <RecipePreview class="recipe-preview" :recipe="r" />
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
import { mockGetRecipesPreview } from "../services/recipes.js";

export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview
  },
  props: {
    title: {
      type: String,
      required: true
    },
    externalButtonLabel: {
      type: String,
    },
    externalButtonAction: {
      type: Function,
    },
    random: {
      type: Boolean,
      default: false
    },
    page_type: {
      type: String,
      required: true,
      default: 'main'
    },
    blurRecipes: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      recipes: []
    };
  },
  mounted() {
    this.updateRecipes();
  },
  methods: {
    async updateRecipes(random = false) {
      try {
        const amountToFetch = 3; // Set this to how many recipes you want to fetch
        const response = mockGetRecipesPreview(this.page_type, amountToFetch, random);
        console.log('response:', response);
        const recipes = response.data.recipes;
        this.recipes = [];
        this.recipes.push(...recipes);
        console.log('recipes:', this.recipes);
      } catch (error) {
        console.log('Error fetching recipes:', error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.recipe-preview-list {
  padding: 20px;
}

.section-header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
}

.list-title {
  font-size: 2.5em;
  color: white;
  font-weight: bold;
  text-align: center;
  padding-top: 20px;
  font-family: 'Pacifico', cursive;
  letter-spacing: 0.14em; /* Adjust the spacing between characters */


}

.button-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  height: 40px;
}

.action-button,
.button-placeholder {
  width: 300px;
  height: 40px;
}

.action-button {
  background-color: rgb(165, 107, 57);
  border: none;
  outline: none;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #543b14;
  }
}

.recipe-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 25px;
}

.recipe-col {
  display: flex;
  justify-content: center;
}

.recipe-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 390px;
  height: 440px;
  transition: filter 0.3s ease;

  &.blurred {
    filter: blur(5px);
    pointer-events: none;
  }
}

.whomade-andwhen,
.whomade-placeholder {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.whomade-andwhen {
  font-size: 1.2em;
  font-style: italic;
  color: white;
  background-color: rgb(165, 107, 57);
  border-radius: 8px;
  padding: 5px 10px;

  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.recipe-preview {
  width: 100%;
}
</style>
