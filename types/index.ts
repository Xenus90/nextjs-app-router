export type Meal = {
  id: string;
  title: string;
  slug: string;
  image: string;
  summary: string;
  creator: string;
  creator_email: string;
  instructions: string;
};

export type ShareMeal = {
  name: string;
  email: string;
  title: string;
  summary: string;
  instructions: string;
  image: File;
};