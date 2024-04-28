import NewsList from "@/components/news-list";
import { getAvailableNewsMonths, getAvailableNewsYears, getNewsForYear, getNewsForYearAndMonth } from "@/lib/news";
import Link from "next/link";
import { Suspense } from "react";

type Props = {
  params: {
    filter: string[];
  },
};

export default async function FilteredNewsPage(props: Props) {
  const selectedYear = props.params.filter?.[0];
  const selectedMonth = props.params.filter?.[1];

  return (
    <>
      <Suspense fallback={<p>Loading news</p>}>
        <FilterHeader year={selectedYear} month={selectedMonth} />
      </Suspense>
      <Suspense fallback={<p>Loading news</p>}>
        <FilteredNews year={selectedYear} month={selectedMonth} />
      </Suspense>
    </>
  );
};

async function FilterHeader({ year, month }: { year: string | undefined, month: string | undefined }) {
  const links = year
    ? month
      ? []
      : getAvailableNewsMonths(year)
    : await getAvailableNewsYears();

  if (
    year && !(await getAvailableNewsYears()).includes(year)
    || year && month && !(getAvailableNewsMonths(year)).includes(month)
  ) {
    throw new Error('Invalid filter');
  }

  return (
    <header id="archive-header">
      <nav>
        <ul>
          {links.map(link => {
            const href = year
              ? `/archive/${year}/${link}`
              : `/archive/${link}`;
            return (
              <li key={link}>
                <Link href={href}>
                  {link}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}

async function FilteredNews({ year, month }: { year: string | undefined, month: string | undefined }) {
  let news;

  if (year && !month) {
    news = await getNewsForYear(year);
  } else if (year && month) {
    news = await getNewsForYearAndMonth(+year, +month);
  }

  let newsContent = <p>No news found for the selected period.</p>;

  if (news && news.length) {
    newsContent = <NewsList news={news} />
  }

  return newsContent;
}
