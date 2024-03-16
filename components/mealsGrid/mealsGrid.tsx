import { Meal } from "@/types";
import style from "./style.module.css";
import MealItem from "../mealItem/mealItem";

type Props = {
  meals: Meal[];
};

export default function MealsGrid(props: Props) {
  const { meals } = props;

  return (
    <ul className={style.meals}>
      {meals.map(meal => (
        <li key={meal.id}>
          <MealItem {...meal} />
        </li>
      ))}
    </ul>
  );
}