import express from "express";
import cors from "cors";
import recipes from "./src/recipes";
import recipeId from "./src/recipeId";
import categoryRecipes from "./src/categoryRecipes";

const app = express();
const PORT = process.env.PORT ?? 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/recipes", recipes);
app.get("/recipes/:recipe_id", recipeId);
app.get("/recipes/category/:category", categoryRecipes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
