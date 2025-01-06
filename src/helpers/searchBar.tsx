"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import { useDebounce } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IEvent } from "@/types/allInterface";
import Link from "next/link";
import { formatDateEvent } from "./formatDate";
import { Loader2, Calendar, MapPin } from "lucide-react";

const base_url = process.env.NEXT_PUBLIC_BASE_URL_BE;

export default function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchRef = useRef<HTMLDivElement>(null);
  
  const [events, setEvents] = useState<IEvent[]>([]);
  const [value, setValue] = useState<string>("");  
  const [text] = useDebounce(value, 500);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);

  const getData = async () => {
    try {
      setIsLoading(true);
      const url = text
        ? `${base_url}/events?search=${text}`
        : `${base_url}/events?limit=3`;
      const res = await fetch(url);
      const result = await res.json();
      setEvents(result.event);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
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
  }, [text, pathname, router, createQueryString]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={searchRef} className="relative flex items-center h-full">
      <div className="relative w-full group">
        <input
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => value && setShowResults(true)}
          placeholder="Search Events..."
          className="bg-white border border-gray-300 text-black text-sm rounded-full shadow-sm 
                   focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 block w-[250px] md:w-[300px] p-3 pl-10 pr-4
                   transition-all duration-300 ease-in-out"
        />
        {/* <Search
  className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400
             group-hover:text-yellow-500 transition-colors duration-300"
/> */}
      </div>

      {showResults && (value.length > 0 || events.length > 0) && (
        <div className="absolute top-full left-0 z-50 w-[300px] md:w-[600px] bg-white mt-2 
                      rounded-xl shadow-xl border border-gray-200 max-h-[400px] overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500 flex items-center justify-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin text-yellow-500" />
              <span>Searching events...</span>
            </div>
          ) : events && events.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              No events found for &quot;{value}&quot;
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {events.map((item, idx) => (
                <Link
                  key={idx}
                  href={`/browse_events/${item.slug}`}
                  className="block transition-colors duration-200"
                  onClick={() => {
                    setValue("");
                    setShowResults(false);
                  }}
                >
                  <div className="p-3 flex gap-4 hover:bg-gray-50">
                    <div className="w-10 h-10 rounded-md overflow-hidden flex-shrink-0 bg-gray-100">
                      {item.thumbnail && (
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 mb-0.5 leading-snug truncate">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-3 mt-1">
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDateEvent(item.datetime)}</span>
                        </div>
                        {item.location && (
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <MapPin className="h-3 w-3" />
                            <span>{item.location}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
