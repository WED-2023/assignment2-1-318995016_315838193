<template>
  <div class="container">
    <RecipePreviewList page_type="personal" title="My Recipes"/>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
export default {
  components: {
    RecipePreviewList,
  },
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Concert+One:400,700&display=swap');


</style>
