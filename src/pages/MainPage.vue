<template>
  <div class="container">
    <h1 class="title">Main Page</h1>
    <div class="content">
      <div class="left">
        <RecipePreviewList page_type="random" title="Explore this recipes" class="RandomRecipes" random/>
      </div>
      <div class="right" >
        <RecipePreviewList
            page_type="last_viewed"
            :blur-recipes="shouldBlurRecipes"
            title="Last Watches Recipes"
            class="LastViewedRecipes"
            :externalButtonLabel="computedButtonLabel"
            :externalButtonAction="computedButtonAction"
        />
      </div>
    </div>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";

export default {
  components: {
    RecipePreviewList
  },
  computed: {
    computedButtonLabel() {
      return this.$root.store.username ? ' ' : 'Login';
    },
    computedButtonAction() {
      return this.$root.store.username ? null : this.goToLoginPage;
    },
    shouldBlurRecipes() {
      return !!(!this.$root.store.username);
    }
  },
  methods: {
    goToLoginPage() {
      this.$router.push({name: 'login'});
    }
  },
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px;
}

.title {
  font-family: 'Pacifico', cursive;
  font-size: 4em;
  margin-bottom: 6px;
  color: black;
  text-align: center;
  margin-top: 10px;
}

.content {
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 20px;
  max-width: 1200px;
  margin-top: 8x; // Reduced top margin to bring content higher

}

.left, .right {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 48%;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.section-title {
  font-size: 1.5em;
  color: #333;
}

.login-wrapper {
  display: flex;
  align-items: center;
}

.login-button {
  width: 420px;
  height: 40px;
  background-color: rgb(165, 107, 57);
  border: none;
  outline: none;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.login-button:hover {
  background-color: #543B14;
}

.last-viewed-recipes {
  margin-top: -50px;
}

.RandomRecipes {
  margin-top: 5px;
}

.blur {
  -webkit-filter: blur(5px);
  filter: blur(5px);
}

::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
</style>
