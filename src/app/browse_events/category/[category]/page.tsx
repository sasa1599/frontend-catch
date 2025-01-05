import Card from "@/components/ticket/card";
import LinkCategory from "@/components/ui/category";
import { getCategory } from "@/libs/event";
import { formatDate } from "@/helpers/formatDate";
import { IEvent } from "@/types/allInterface";

export default async function Events({
  params,
}: {
  params: { category: string };
}) {
  const data: IEvent[] = await getCategory(params.category);

  // Filter events that are in the future or happening today
  const filteredData = data
    .filter((item) => {
      const eventDate = new Date(item.datetime);
      const today = new Date();
      return eventDate >= today; // Keep events that are in the future
    })
    .sort((a, b) => {
      const eventDateA = new Date(a.datetime).getTime();
      const eventDateB = new Date(b.datetime).getTime();
      return eventDateA - eventDateB;
    });

  if (!filteredData || filteredData.length === 0) {
    return (
      <div>
        <LinkCategory/>
        <div className="mt-20">No upcoming events found.</div>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-black md:px-44 px-4 py-28 flex flex-col items-start">
        {/* Category */}
        <LinkCategory />

        {/* Card */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4 w-full">
          {filteredData.map((item, idx) => (
            <div key={idx}>
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
                tickets={item.tickets ?? []}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
