"use client";

import { DUMMY_NEWS } from "@/dummy-data";
import Image from "next/image";
import { notFound, useRouter } from "next/navigation";

type Props = {
  params: {
    slug: string;
  }
};

export default function ImagePage(props: Props) {
  const router = useRouter();
  const { params } = props;
  const newsItem = DUMMY_NEWS.find(news => news.slug === params.slug);

  if (!newsItem) {
    notFound();
  }

  return (
    <>
      <div className="modal-backdrop" onClick={router.back} />
      <dialog className="modal" open>
        <div className="fullscreen-image">
          <Image src={`/images/news/${newsItem.image}`} alt={newsItem.title} width={200} height={200} />
        </div>
      </dialog>
    </>
  );
}