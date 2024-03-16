import Link from "next/link";
import style from "./page.module.css";
import MealsGrid from "@/components/mealsGrid/mealsGrid";
import { getMeals } from "@/lib/meals";
import { Suspense } from "react";

export const metadata = {
  title: 'All Meals',
  description: 'Browse the delicious meals shared by a food-loving community.',
};

export default function Meals() {
  return (
    <>
      <header className={style.header}>
        <h1>
          Delicious meals, created <span className={style.highlight}>by you</span>
        </h1>
        <p>
          Choose your favorite recipe and cook it yourself. It is easy and fun!
        </p>
        <p className={style.cta}>
          <Link href="/meals/share">
            Share Your Favorite Recipe
          </Link>
        </p>
      </header>
      <main className={style.main}>
        <Suspense fallback={<p className={style.loading}>Fetching meals...</p>}>
          <MealsFetcher />
        </Suspense>
      </main>
    </>
  );
}

const MealsFetcher = async () => {
  const meals = await getMeals();
  return <MealsGrid meals={meals} />;
};