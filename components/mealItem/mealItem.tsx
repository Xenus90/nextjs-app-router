import Link from 'next/link';
import Image from 'next/image';
import { Meal } from '@/types';
import style from './style.module.css';

export default function MealItem({ title, slug, image, summary, creator }: Meal) {
  return (
    <article className={style.meal}>
      <header>
        <div className={style.image}>
          <Image src={image} alt={title} fill />
        </div>
        <div className={style.headerText}>
          <h2>{title}</h2>
          <p>by {creator}</p>
        </div>
      </header>
      <div className={style.content}>
        <p className={style.summary}>{summary}</p>
        <div className={style.actions}>
          <Link href={`/meals/${slug}`}>View Details</Link>
        </div>
      </div>
    </article>
  );
}