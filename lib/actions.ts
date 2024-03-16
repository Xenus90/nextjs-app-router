"use server";

import { ShareMeal } from "@/types";
import { saveMeal } from "./meals";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const isInvalidText = (value: string) => !value || value.trim() === "";

export const shareMeal = async (_prevState: any, formData: FormData) => {
  const meal = Object.fromEntries(formData) as ShareMeal;

  if  (
    isInvalidText(meal.title)
    || isInvalidText(meal.summary)
    || isInvalidText(meal.instructions)
    || isInvalidText(meal.name)
    || isInvalidText(meal.email)
    || !meal.email.includes("@")
    || !meal.image
    || meal.image.size === 0
  ) {
    return { message: "Invalid input" };
  }

  await saveMeal(meal);
  revalidatePath("/meals");
  redirect("/meals");
};