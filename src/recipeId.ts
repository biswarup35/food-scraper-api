import { Request, Response } from "express";
import { JSDOM } from "jsdom";
import axios from "axios";
const recipeId = async (req: Request, res: Response) => {
  try {
    const { recipe_id } = req.params;
    const url = `https://food.ndtv.com/recipe-${recipe_id}`;
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

    const recipeContainer = document.querySelector("article");
    const ingredientsContainer =
      recipeContainer.querySelector("div#ingredients");

    const metaContainer = recipeContainer.querySelector("ul#cooktime");

    const title =
      recipeContainer.querySelector("h1.sp-ttl")?.textContent ?? "N/A";
    const image = {
      url:
        recipeContainer
          .querySelector("img#story_image_main")
          ?.getAttribute("src") ?? "N/A",
      alt:
        recipeContainer
          .querySelector("img#story_image_main")
          ?.getAttribute("alt") ?? "N/A",
    };
    const description =
      recipeContainer.querySelector("p#overview")?.textContent.trim() ?? "N/A";
    const ingredientItems = ingredientsContainer.querySelectorAll("li");
    const ingredients = Array.from(ingredientItems).map((ingredient) => {
      return ingredient.textContent.trim();
    });

    const stepItems = recipeContainer.querySelectorAll("div.RcHTM_li");
    const steps = Array.from(stepItems).map((step) => {
      return {
        step: step.childNodes[0].textContent.replace(".", ""),
        to_do: step.childNodes[1].childNodes[0].textContent,
      };
    });

    const metaList = metaContainer.querySelectorAll("div.RcpInf_crd");
    const meta = Array.from(metaList)
      .slice(0, -1)
      .map((item) => {
        return {
          label: item.childNodes[1]?.textContent.trim() ?? "N/A",
          value: item.childNodes[2]?.textContent.trim() ?? "N/A",
        };
      });

    res.status(200).send({
      status: "success",
      data: { recipe_id, title, image, description, meta, ingredients, steps },
    });
  } catch (error) {
    console.log(error);

    res.send({ status: "Something went wrong" });
  }
};

export default recipeId;
