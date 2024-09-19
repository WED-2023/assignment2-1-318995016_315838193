import recipe_full_view from "../assets/mocks/recipe_full_view.json";
import recipe_preview from "../assets/mocks/recipe_preview.json";
import favorite_recipe from "../assets/mocks/recipe_preview.json";
import family_recipe from "../assets/mocks/family_recipe.json";
import personal_recipe from "../assets/mocks/family_recipe.json";

const recipeData = {
  main: recipe_preview,
  favorite: favorite_recipe,
  family: family_recipe,
  personal: personal_recipe,
};

export function mockGetRecipesPreview(type, amount = 1, random = false) {
  let recipe_preview_json = recipeData[type];
  let recipes = [];
  const length = amount > recipe_preview_json.length ? recipe_preview_json.length : amount;

  for (let i = 0; i < length; i++) {
    let index = i;
    if (random) {
      while (recipes.includes(recipe_preview_json[index]) || index === i) {
        index = Math.floor(Math.random() * recipe_preview_json.length);
      }
    }
    recipes.push(recipe_preview_json[index]);
  }

  return { data: { recipes: recipes } };
}

export function mockGetRecipeFullDetails(recipeId) {
  const recipe = recipe_full_view.find(r => r.id === parseInt(recipeId, 10));
  if (recipe) {
    return { status: 200, data: { recipe } };
  } else {
    return { status: 200, data: { message: "Recipe not found" } };
  }
}

export function mockGetSearchRecipesPreview({ query = '', cuisine = '', diet = '', intolerance = '', number = 5, sort = 'popularity' }) {
  let filteredRecipes = recipe_full_view.filter(recipe => {
    const matchesQuery = query ? recipe.title.toLowerCase().includes(query.toLowerCase()) : true;
    const matchesCuisine = cuisine && cuisine !== 'All' ? recipe.cuisines && recipe.cuisines.includes(cuisine) : true;
    const matchesDiet = intolerance && intolerance !== 'All' ? recipe.dishTypes && recipe.dishTypes.includes(diet) : true;
    
    // Check intolerance
    let matchesdiets = true;
    if (diet && diet !== 'All') {
      switch (diet.toLowerCase()) {
        case 'vegetarian':
          matchesdiets = recipe.vegetarian;
          break;
        case 'vegan':
          matchesdiets = recipe.vegan;
          break;
        case 'glutenfree':
          matchesdiets = recipe.glutenFree;
          break;
        default:
          matchesdiets = true; // If the intolerance doesn't match any known type, ignore it
      }
    }

    return matchesQuery && matchesCuisine && matchesDiet && matchesdiets;
  });

  // Sort the filtered recipes
  if (sort === 'popularity') {
    filteredRecipes.sort((a, b) => b.aggregateLikes - a.aggregateLikes);
  } else if (sort === 'time') {
    filteredRecipes.sort((a, b) => a.readyInMinutes - b.readyInMinutes);
  }

  return filteredRecipes.slice(0, number);
}
