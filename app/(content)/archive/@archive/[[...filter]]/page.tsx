import NewsList from "@/components/news-list";
import { getAvailableNewsMonths, getAvailableNewsYears, getNewsForYear, getNewsForYearAndMonth } from "@/lib/news";
import Link from "next/link";

type Props = {
  params: {
    filter: string[];
  },
};

export default function FilteredNewsPage(props: Props) {
  const selectedYear = props.params.filter?.[0];
  const selectedMonth = props.params.filter?.[1];
  const noNews = <p>No news found for the selected period.</p>;
  const links = selectedYear
    ? selectedMonth
      ? []
      : getAvailableNewsMonths(+selectedYear)
    : getAvailableNewsYears();
  const news = selectedYear
    ? selectedMonth
      ? getNewsForYearAndMonth(+selectedYear, +selectedMonth)
      : getNewsForYear(+selectedYear)
    : undefined;

  if (
    selectedYear && !getAvailableNewsYears().includes(+selectedYear)
    || selectedMonth && !getAvailableNewsMonths(+selectedYear).includes(+selectedMonth)
  ) {
    throw new Error('Invalid filter');
  }

  return (
    <>
      <header id="archive-header">
        <nav>
          <ul>
            {links.map(link => {
              const href = selectedYear
                ? `/archive/${selectedYear}/${link}`
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
      {news ? <NewsList news={news} /> : noNews}
    </>
  );
};
