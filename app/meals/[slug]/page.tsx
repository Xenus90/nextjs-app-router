import Image from "next/image";
import style from "./page.module.css";
import { getMeal } from "@/lib/meals";
import { notFound } from "next/navigation";

type Props = {
  params: {
    slug: string;
  },
};

export const generateMetadata = async ({ params }: Props) => {
  const meal = getMeal(params.slug);
  !meal && notFound();
  return {
    title: meal.title,
    description: meal.summary,
  };
};

export default function Meal({ params }: Props) {
  const meal = getMeal(params.slug);
  meal
    ? meal.instructions = meal.instructions.replace(/\n/g, "<br />")
    : notFound();

  return (
    <>
      <header className={style.header}>
        <div className={style.image}>
          <Image fill src={meal.image} alt="" />
        </div>
        <div className={style.headerText}>
          <h1>
            {meal.title}
          </h1>
          <p className={style.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={style.summary}>
            {meal.summary}
          </p>
        </div>
      </header>
      <main>
        <p className={style.instructions} dangerouslySetInnerHTML={{ __html: meal.instructions }}></p>
      </main>
    </>
  );
}