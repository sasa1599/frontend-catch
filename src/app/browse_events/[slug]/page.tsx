import { IEvent } from "@/types/allInterface";
import Image from "next/image";
import Link from "next/link";
import { formatDateEvent, timeFormat } from "@/helpers/formatDate"; // Ensure you import the formatDate function
import { getEventSlug } from "@/components/libs/event";
import ShowTickets from "@/components/ticket/showTicket";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const event: IEvent[] = await getEventSlug(params.slug);

  if (!event[0]) {
    return {
      title: "Event Not Found",
    };
  }

  return {
    title: event[0].title,
    description: event[0].title,
    category: event[0].category,
    location: event[0].location,
    datetime: event[0].datetime,
    venue: event[0].venue,
    tickets: event[0].tickets,
    thumbnail: event[0].thumbnail,
  };
}

export default async function EventDetail({
  params,
}: {
  params: { slug: string };
}) {
  const event: IEvent[] = await getEventSlug(params.slug);

  if (!event[0]) {
    return (
      <div>
        <p>
          This event is currently unavailable. Please explore our other
          available events.
        </p>
        <Link href="/">Back to Events</Link>
      </div>
    );
  }

  const { name, username, avatar } = event[0].promotor;
  const datetime = event[0].datetime; 

  return (
    <div
      className="flex flex-col justify-center items-center px-4 
    md:items-start md:px-60 md:gap-10 md:flex-row bg-black py-28 "
    >
      {/* Upper / Left Section */}
      <div className="my-4 w-[400px] h-[400px] md:w-[400px] md:h-[400px] rounded-lg overflow-hidden">
        <Image
          src={`${event[0].thumbnail}`}
          alt={event[0].title}
          width={400} // Explicit width
          height={400} // Explicit height
          className="object-contain"
          priority
        />
      </div>

      {/* Bottom / Right Section */}
      <div className="flex-[2] box-content max-lg:pr-0">
        <div className="text-sm font-bold uppercase">{event[0].category}</div>
        <div className="text-xl md:text-3xl font-bold">{event[0].title}</div>

        {/* Display Promotor Info */}
        <div className="flex items-center">
          {avatar && (
            <Image
              src={avatar}
              alt={username}
              width={40}
              height={40}
              className="rounded-full"
            />
          )}
          <p className="ml-2 text-sm font-semibold">{name}</p>
        </div>
        <div className="text-sm text-yellow-400 my-4 font-bold">
          {formatDateEvent(datetime)}
        </div>
        <div className="flex flex-col gap-1">
          <hr className=" border-t-2 border-gray-300" />
          <div className="text-white text-sm font-semibold">About</div>
          <div dangerouslySetInnerHTML={{__html: event[0].description}}/>
          <ShowTickets tickets={event[0].tickets!} />
          <hr className="my-4 border-t-2 border-gray-300" />
          <div className="text-white text-sm font-semibold">Venue</div>
          <div className="text-md text-justify">{event[0].venue}</div>
          <div className="text-sm">
            Doors open :{" "}
            <span className="text-yellow-400">{timeFormat(datetime)}</span>
          </div>
          <hr className="my-4 border-t-2 border-gray-300" />
          <div className="text-xs">
            <span className="text-violet-400">CAT</span>ch the momment protects
            fans and artists from resellers
          </div>
          <hr className="my-4 border-t-2 border-gray-300" />
          <Link href={"/browse_events"}> Browse another event</Link>
        </div>
      </div>
    </div>
  );
}
