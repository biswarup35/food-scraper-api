import { Request, Response } from "express";
import { JSDOM } from "jsdom";
import axios from "axios";
const recipes = async (req: Request, res: Response) => {
  const { page = 1 } = req.query;
  const url = `https://food.ndtv.com/recipe/recipe-load-more/type/recipe/page/${page}/query/indian/lang/1`;
  const { data: html } = await axios.get(url, {
    headers: {
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      Host: "food.ndtv.com",
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:88.0) Gecko/20100101 Firefox/88.0",
      Pragma: "no-cache",
      TE: "Trailers",
      "Upgrade-Insecure-Requests": 1,
    },
  });
  const {
    window: { document },
  } = new JSDOM(html);
  const recipeItems = document.querySelectorAll(".SrcCrd-Rec");
  const recipes = Array.from(recipeItems).map((recipe) => {
    const title = recipe.querySelector("a.crd_ttl")?.textContent ?? "N/A";
    const time_to_prepare =
      recipe.querySelector("span.SrcCrd-ph_im-ft-nu")?.textContent ?? "N/A";

    const recipe_id =
      recipe
        .querySelector("a.crd_ttl")
        ?.getAttribute("href")
        .split("-")
        .pop() ?? "N/A";

    const image = {
      url: recipe.querySelector("img.lz_img")?.getAttribute("content") ?? "N/A",
      alt: recipe.querySelector("img.lz_img")?.getAttribute("alt") ?? "N/A",
      title: recipe.querySelector("img.lz_img")?.getAttribute("title") ?? "N/A",
    };

    return { recipe_id, title, time_to_prepare, image };
  });

  res.send(recipes);
};
export default recipes;
