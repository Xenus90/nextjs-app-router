import { ModalBackdrop } from "@/components/modal-backdrop";
import { getNewsItem } from "@/lib/news";
import Image from "next/image";
import { notFound } from "next/navigation";

type Props = {
  params: {
    slug: string;
  }
};

export default async function ImagePage(props: Props) {
  const newsItem = await getNewsItem(props.params.slug);

  if (!newsItem) {
    notFound();
  }

  return (
    <>
      <ModalBackdrop />
      <dialog className="modal" open>
        <div className="fullscreen-image">
          <Image src={`/images/news/${newsItem.image}`} alt={newsItem.title} width={200} height={200} />
        </div>
      </dialog>
    </>
  );
}