"use client";

import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IEvent } from "@/types/allInterface";
import Link from "next/link";
import Image from "next/image";

const base_url = process.env.NEXT_PUBLIC_BASE_URL_BE;

export default function EventSearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [event, setEvents] = useState<IEvent[]>([]);
  const [value, setValue] = useState<string>(""); // Start with an empty string
  const [text] = useDebounce(value, 500);
  const [isLoading, setIsloading] = useState<boolean>(false);

  const getData = async () => {
    try {
      setIsloading(true);
      const res = await fetch(`${base_url}/events?search=${text}`);
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
    } else {
      router.push(pathname); // Reset search params when text is empty
    }
    getData();
  }, [text]);

  return (
    <div className="w-full">
      <div className="flex w-full justify-end mb-5">
        <input
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search .."
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[250px] p-2.5"
        />
      </div>

      {value.length > 0 && (
        <>
          {isLoading ? (
            <div>Loading...</div>
          ) : event && event.length === 0 ? (
            <div>Not found</div>
          ) : (
            <div className="absolute z-10 w-96 bg-black mt-32 opacity-70 rounded-md shadow-lg">
              {event.map((item, idx) => (
                <li
                  key={idx}
                  data-cy="event-item"
                  className="p-2 hover:bg-gray-300"
                >
                  <div className="flex items-center space-x-4">
                    <div>
                      <Image
                        src={item.thumbnail}
                        fill
                        alt={item.title}
                        className="rounded-md"
                      />
                    </div>
                    <div>
                      <Link href={`/browse_events/${item.slug}`}>
                        <div className="font-bold">{item.title}</div>
                      </Link>
                      <div className="text-sm text-gray-500">
                        {item.datetime}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
