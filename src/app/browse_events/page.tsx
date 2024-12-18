import Card from "@/components/card";
import LinkCategory from "@/components/category";
import EventNavbar from "@/components/event_navbar";
import { getEvent } from "@/components/libs/event";
import { formatDate } from "@/helpers/formatDate";
import { IEvent } from "@/types/allInterface";

export default async function Events() {
  const data: IEvent[] = await getEvent();

  if (!data || data.length === 0) {
    return <div>No events found.</div>;
  }

  return (
    <div>
      <EventNavbar />
      <div className="bg-black md:px-44 px-4 mt-[76px] flex flex-col items-start">
        {/* Music Container */}
        <LinkCategory />

        {/* Card Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4 w-full">
          {data.map((item, idx) => (
            <Card
              key={idx}
              slug={item.slug}
              id={item.id}
              title={item.title}
              thumbnail={item.thumbnail}
              description={item.description}
              category={item.category}
              location={item.location.toString()}
              venue={item.venue}
              datetime={formatDate(item.datetime)}
              promotor={{
                name: item.promotor.name,
                avatar: item.promotor.avatar,
              }}
              tickets={item.tickets ?? []}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
