import StarDisplay from "@/components/review/starDisplay";
import { formatDate } from "@/helpers/formatDate";
import { getEventDetail } from "@/libs/event";
import { getReviews } from "@/libs/review";
import { IReview } from "@/types/review";
import Image from "next/image";
import { SlCalender } from "react-icons/sl";
import FormReview from "@/components/review/formReview";

export default async function ReviewPage({
  params,
}: {
  params: { event_id: string };
}) {
  // Fetch event details
  const event = await getEventDetail(params.event_id);

  // Check if event data exists
  if (!event) {
    return <div>Error: Event not found</div>;
  }

  // Fetch reviews
  const dataReviews = await getReviews(params.event_id);

  const reviews = Array.isArray(dataReviews?.result) ? dataReviews.result : [];

  // Format date for display
  const datetime = formatDate(event.datetime);


  return (
    <main className="pt-32">
      <div className="sm:mx-20 md:mx-40 tablet:mx-60">
        <div className="flex flex-col gap-6 rounded-b-xl">
          <div className="relative overflow-hidden aspect-[16/9] min-h-[15rem] flex-1">
            <Image src={event.thumbnail} alt={event.title} fill />
          </div>
          <div className="shadow-2xl flex flex-col gap-2 rounded-b-xl">
            <div className="flex flex-col gap-2 px-6 py-4">
              <h1 className="text-xl font-semibold line-clamp-4">
                {event.title}
              </h1>
              <div className="flex items-center gap-2">
                <span className="text-lightBlue">
                  <SlCalender />
                </span>
                <span>{datetime}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="my-6 px-4">
          <h1 className="font-semibold text-4xl">Comment Section</h1>
          {reviews.length > 0 ? (
            reviews.map((item: IReview) => (
              <div
                key={item.id}
                className="flex flex-col my-2 border-b py-4 gap-2"
              >
                {" "}
                {/* Gunakan item.id sebagai key */}
                <div className="flex items-center gap-4">
                  <div className="relative w-[35px] h-[35px] rounded-full overflow-hidden">
                    <Image
                      src={item.user.avatar}
                      alt={item.user.full_name}
                      fill
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold">{item.user.full_name}</span>
                    <span className="text-xs font-semibold text-black/50">
                      {formatDate(item.createdAt)}
                    </span>
                  </div>
                  <div className="flex">
                    <StarDisplay rate={item.rating} />
                  </div>
                </div>
                <div
                  dangerouslySetInnerHTML={{ __html: item.comment }}
                  className="mt-2 indent-4"
                />
              </div>
            ))
          ) : (
            <div>BELUM ADA REVIEW</div> // Menampilkan pesan jika tidak ada review
          )}
        </div>
        <div className="shadow-xl rounded-md my-4 p-4">
          <h1 className="font-semibold text-2xl mb-4 text-center">
            Rate and drop your comment here
          </h1>
          <FormReview event_id={params.event_id} />
        </div>
      </div>
    </main>
  );
}
