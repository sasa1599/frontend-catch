import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { IEvent } from "@/types/allInterface";
import Link from "next/link";
import Image from "next/image";

const base_url = process.env.NEXT_PUBLIC_BASE_URL_BE;

export default function SearchBar() {
  const [value, setValue] = useState<string>("");
  const [debouncedValue, setDebouncedValue] = useDebounce(value, 500);
  const [events, setEvents] = useState<IEvent[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Function to fetch events with improved error handling
  const fetchEvents = async () => {
    if (!debouncedValue) {
      setEvents([]);
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`${base_url}/events?search=${debouncedValue}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(`Error fetching events: ${response.statusText}`);
      }

      setEvents(data.event || []);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [debouncedValue]);

  // Function to format date for display in search results
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Invalid date";
    }

    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "2-digit",
    };

    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  return (
    <div className="relative w-full md:w-96">
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search events..."
        className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {value && (
        <div
          className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-2 z-10"
          style={{
            maxHeight: '300px', // Sesuaikan tinggi maksimum
            overflowY: 'hidden', // Sembunyikan scrollbar
            padding: '10px',
          }}
        >
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">Loading...</div>
          ) : events.length === 0 ? (
            <div className="p-4 text-center text-gray-500">Tidak ada hasil</div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {events.map((event, idx) => (
                <li
                  key={idx}
                  className="p-2 hover:bg-gray-100"
                  style={{ whiteSpace: 'pre-wrap' }}
                >
                  <Link href={`/browse_events/${event.slug}`}>
                    <div className="flex items-center space-x-4">
                      <Image
                        src={event.thumbnail}
                        alt={event.title}
                        width={50}
                        height={50}
                        className="rounded-md object-cover"
                      />
                      <div>
                        <p className="font-semibold text-gray-900">{event.title}</p>
                        <p className="text-sm text-gray-500">{formatDate(event.datetime)}</p>
                        <p className="text-sm text-gray-500">{event.location}</p>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}