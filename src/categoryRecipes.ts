import { Request, Response } from "express";
import fs from "fs";
import path from "path";

const categoryRecipes = async (_req: Request, res: Response) => {
  try {
    const category = _req.params.category;
    const filePath = path.join(process.cwd(), "data", "recipes.json");
    const data = fs.readFileSync(filePath, "utf8");
    const recipes = JSON.parse(data);
    const recipesData = recipes.filter(
      (recipe) => recipe.category === category
    );
    res.status(200).send(recipesData);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};

export default categoryRecipes;
