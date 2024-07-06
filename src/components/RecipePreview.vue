<template>
  <router-link
      :to="{ name: 'recipe', params: { id: recipe.id } }"
      class="recipe-preview"
  >
    <div class="recipe-body">
      <img :src="recipe.image" class="recipe-image" alt="Recipe image" />
    </div>
    <div class="recipe-footer">
      <div :title="recipe.title" class="recipe-title">
        {{ recipe.title }}
      </div>
      <div class="recipe-overview">
        <div class="recipe-properties">
          <div class="diet-type">
            <span v-if="recipe.vegan">🌱 Vegan</span>
            <span v-else-if="recipe.vegetarian">🥗 Vegetarian</span>
          </div>
          <div class="gluten-free">
            <span v-if="recipe.glutenFree">🌾 Gluten-Free</span>
            <span v-else>&nbsp;</span>
          </div>
        </div>

        <div class="recipe-actions">
          <div class="prep-time">⏱ {{ recipe.readyInMinutes }} minutes</div>
          <b-button @click.prevent="likeClicked" variant="outline" class="like-button">
            <span class="like-text">
              <b-icon
                  :icon="like_clicked ? 'heart-fill' : 'heart'"
                  aria-hidden="true"
              ></b-icon>
              {{ likeCount }} likes
            </span>
          </b-button>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "RecipePreview",
  props: {
    recipe: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      like_clicked: false,
    };
  },
  computed: {
    likeCount() {
      return this.like_clicked ? this.recipe.aggregateLikes + 1 : this.recipe.aggregateLikes;
    },
  },
  methods: {
    likeClicked() {
      this.like_clicked = !this.like_clicked;
    },
  },
};
</script>

<style scoped>
.recipe-preview {
  display: inline-block;
  position: relative;
  width: 100%;
  height: 100%;
  margin: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background-color: #fafafa;
  text-decoration: none;
  color: inherit;
}

.recipe-preview:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.recipe-body {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.recipe-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.recipe-footer {
  padding: 16px;
  height: 100%;
  background-color: #fff;
}

.recipe-title {
  font-size: 1.25em;
  font-weight: bold;
  color: #333;
  margin-top: 8px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  text-align: center;
  
}

.recipe-overview {
  font-size: 0.9em;
  color: #666;
  margin: 0;
  padding: 0;
  list-style: none;
  height: 100px;
  .recipe-properties {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    div {
      margin-left: 15px;
    }
  }
}
.recipe-properties{
  margin-top: 15px;
}
.recipe-actions {
  margin-top: -18px;
  text-align: center;
  display: flex;
  height: 100px;
  align-items: center;
  justify-content: center;
  span {
    font-size: 0.9rem;
  }
}
</style>
