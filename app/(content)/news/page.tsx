import { DUMMY_NEWS } from "@/dummy-data";
import NewsList from "@/components/news-list";

export default function News() {
  return (
    <>
      <h1>NEWS</h1>
      <NewsList news={DUMMY_NEWS} />
    </>
  );
}