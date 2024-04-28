import { getNewsItem } from "@/lib/news";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: {
    slug: string;
  }
};

export default async function NewsDetails({ params }: Props) {
  const newsItem = await getNewsItem(params.slug);

  if (!newsItem) {
    notFound();
  }

  return (
    <article className="news-article">
      <header>
        <Link href={`/news/${newsItem.slug}/image`}>
          <Image src={`/images/news/${newsItem.image}`} alt={newsItem.title} width={200} height={200} />
        </Link>
        <h1>
          {newsItem.title}
        </h1>
        <time dateTime={newsItem.date}>{newsItem.date}</time>
      </header>
      <p>
        {newsItem.content}
      </p>
    </article>
  );
}