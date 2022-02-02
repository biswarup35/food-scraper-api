import express from "express";
import recipes from "./src/recipes";

const app = express();
const PORT = process.env.PORT ?? 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/recipes", recipes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
