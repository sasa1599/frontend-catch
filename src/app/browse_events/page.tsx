import Card from "@/components/card";
import LinkCategory from "@/components/category";
import { getEvent } from "@/libs/event";
import { formatDate } from "@/helpers/formatDate";
import { IEvent } from "@/types/allInterface";

export default async function Events() {
  const data: IEvent[] = await getEvent();

  if (!data || data.length === 0) {
    return <div>No events found.</div>;
  }

  return (
    <div>
      <div className="bg-black md:px-44 px-4 py-28  flex flex-col items-start">
        {/* Category */}
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
                username: item.promotor.username,
                name: item.promotor.name,
                avatar: item.promotor.avatar ?? undefined,
              }}
              tickets={
                item.tickets?.map((ticket) => ({
                  ...ticket,
                  id: ticket.id || 0,
                })) ?? []
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
