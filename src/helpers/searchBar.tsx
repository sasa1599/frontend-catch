"use client";

import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IEvent } from "@/types/allInterface";
import Link from "next/link";
import { formatDateEvent } from "./formatDate";
import { truncateText } from "./truncateText";
import Image from "next/image";

const base_url = process.env.NEXT_PUBLIC_BASE_URL_BE;

export default function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [event, setEvents] = useState<IEvent[]>([]);
  const [value, setValue] = useState<string>("");
  const [text] = useDebounce(value, 500);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);

  const getData = async () => {
    try {
      setIsloading(true);
      const url = text
        ? `${base_url}/events?search=${text}`
        : `${base_url}/events?limit=8`;
      const res = await fetch(url);
      const result = await res.json();
      setEvents(result.event);
    } catch (err) {
      console.log(err);
    } finally {
      setIsloading(false);
    }
  };

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    if (text) {
      router.push(pathname + "?" + createQueryString("keyword", text));
      setShowResults(true);
    } else {
      router.push(pathname);
      setShowResults(false);
    }
    getData();
  }, [text]);

  return (
    <div className="relative">
      <div className="flex w-full justify-end mb-5">
        <input
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search Events .."
          className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[250px] p-2.5"
        />
      </div>

      {showResults && (value.length > 0 || event.length > 0) ? (
        <>
          {isLoading ? (
            <div>Loading...</div>
          ) : event && event.length === 0 ? (
            <div>No events found</div>
          ) : (
            // Fixed size dropdown with scrollable content
            <div className="absolute z-10 w-[600px] bg-white mt-2 opacity-90 rounded-lg shadow-lg max-h-[400px] overflow-y-auto">
              {/* Adding a wrapper for the scrollable content */}
              <div className="space-y-2">
                {event.map((item, idx) => (
                  <div
                    key={idx}
                    data-cy="event-item"
                    className="flex items-center p-4 w-auto hover:bg-gray-100 space-x-6"
                  >
                    {/* Image on the left */}
                    <Link href={`/browse_events/${item.slug}`}>
                      {/* <Image
                        src={item.thumbnail}
                        height={120}
                        width={120}
                        alt={item.title}
                        className="rounded-lg object-cover cursor-pointer"
                      /> */}
                    </Link>

                    {/* Event Info on the right */}
                    <div className="flex-1 space-y-2">
                      <Link href={`/browse_events/${item.slug}`}>
                        <div className="font-semibold text-md truncate">
                          {truncateText(item.title, 50)}
                        </div>
                      </Link>
                      <div className="text-sm text-gray-500">
                        {formatDateEvent(item.datetime)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : null}
    </div>
  );
}
