import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("./pages/AboutPage"),
  },
  {

    path: "/favorites",
    name: "favorites",
    component: () => import("./pages/FavoritesPage"),
    meta: {
      authProtected: true
    }
  },
  {

    path: "/family-recipes",
    name: "family-recipes",
    component: () => import("./pages/FamilyPage"),
    meta: {
      authProtected: true
    }
  },
  {

    path: "/my-recipes",
    name: "my-recipes",
    component: () => import("./pages/MyRecipes"),
    meta: {
      authProtected: true
    }
  },

  {
    // Add route for recipe page with id and recipe_type parameters
    path: "/recipe/:id/:recipe_type",
    name: "recipe",
    component: () => import("./pages/RecipeViewPage"),
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
];

export default routes;
