import { formatDate } from "@/helpers/formatDate";
import Image from "next/image";
import Link from "next/link";

interface Ticket {
  id: number;
  category: string;
  description: string;
  seats: number;
  maxSeats: number;
  price: number;
}

interface Promotor {
  username: string;
  avatar?: string;
}

interface ICardEvent {
  title: string;
  slug?: string;
  thumbnail?: string;
  description: string;
  category: string;
  location: string;
  venue: string;
  id?: number;
  datetime: string;
  tickets: Ticket[];
  promotor: {
    name: string;
    avatar?: string;
  };
}

export default function Card({
  title,
  thumbnail,
  slug,
  promotor,
  datetime,
  tickets,
}: ICardEvent) {
  const { name } = promotor;

  const formattedDate = formatDate(datetime);

  const minPrice =
    tickets.length > 0
      ? Math.min(...tickets.map((ticket) => ticket.price))
      : null;

  return (
    <Link href={`/browse_events/${slug}`}>
      <div className="w-full  mx-auto flex flex-row items-center rounded-lg p-4 
        md:flex-col">
        {/* Thumbnail */}
        {thumbnail && (
          <div className="flex-shrink-0">
            <Image
              src={thumbnail}
              alt={title}
              width={300}
              height={300}
              className="rounded-lg object-cover w-[100px] h-[100px]
              md:w-[200px] md:h-[200px]"
            />
          </div>
        )}

        {/* Text Content */}
        <div className="ml-4 flex flex-col md:ml-0 md:mt-2">
          <h3 className="font-bold text-white md:text-sm">{title}</h3>
          <h4 className="text-sm font-semibold text-yellow-400">
            {formattedDate}{" "}
          </h4>
          <p className="text-sm text-gray-200">By {name}</p>
          {minPrice !== null ? (
            <p className="text-sm text-gray-200">
              Starting from: Rp{minPrice.toLocaleString()}
            </p>
          ) : (
            <p className="text-sm text-gray-400">No tickets available</p>
          )}
        </div>
      </div>
    </Link>
  );
}
