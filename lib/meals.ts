import { Meal, ShareMeal } from "@/types";
import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs";

const db = sql("meals.db");

export const getMeals = async (): Promise<Meal[]> => {
  await new Promise(res => setTimeout(res, 2000));
  // throw new Error("Loading meals failed");
  return db.prepare("SELECT * FROM meals").all() as Meal[];
};

export const getMeal = (slug: string): Meal => {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug) as Meal;
};

export const saveMeal = async (meal: ShareMeal) => {
  const newMeal: Omit<Meal, "id"> = {
    title: meal.title,
    slug: "",
    summary: meal.summary,
    creator: meal.name,
    creator_email: meal.email,
    instructions: meal.instructions,
    image: "",
  };

  newMeal.slug = slugify(meal.title, { lower: true });
  newMeal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split(".").pop();
  const fileName = `${newMeal.slug}.${extension}`;
  newMeal.image = `/images/${fileName}`;

  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();
  stream.write(Buffer.from(bufferedImage), error => {
    if (error) {
      throw new Error("Saving image failed");
    }
  });


  db.prepare(`
    INSERT INTO meals
      (title, summary, instructions, creator, creator_email, image, slug)
    VALUES
      (@title, @summary, @instructions, @creator, @creator_email, @image, @slug)
  `).run(newMeal);
};
