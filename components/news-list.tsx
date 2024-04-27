import Link from "next/link";
import Image from "next/image";

type Props = {
  news: {
    id: string;
    slug: string;
    title: string;
    image: string;
    date: string;
    content: string;
  }[];
};

export default function NewsList(props: Props) {
  return (
    <ul className="news-list">
      {props.news.map(news => (
        <li key={news.id}>
          <Link href={`/news/${news.slug}`}>
            <Image src={`/images/news/${news.image}`} alt={news.title} width={200} height={200} />
            <span>{news.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  )
};
