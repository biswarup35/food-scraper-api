import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import type { IComments } from "./utils";
import { uid } from "uid";

const postComments = async (req: Request, res: Response) => {
  try {
    const { parentId, comment } = req.body;
    if (!parentId || !comment) {
      res.status(400).send("Missing parameters");
      throw new Error("Missing parameters");
    }
    const filePath = path.join(process.cwd(), "data", "comments.json");
    const comments: IComments[] = JSON.parse(fs.readFileSync(filePath, "utf8"));
    comments.push({
      id: uid(10),
      parentId,
      content: comment,
    } as IComments);
    fs.writeFileSync(filePath, JSON.stringify(comments));
    res.status(200).send({ message: "Comment added" });
  } catch (e) {
    res.status(500).send(e);
    console.log(e);
  }
};

export default postComments;
