import NewsList from "@/components/news-list";
import { getAllNews } from "@/lib/news";

export default async function News() {
  const news = await getAllNews();

  return (
    <>
      <h1>News</h1>
      <NewsList news={news} />
    </>
  );
}
