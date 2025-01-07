import Link from "next/link";
import {
  FaMusic,
  FaPeopleCarry,
  FaBasketballBall,
  FaTheaterMasks,
  FaBookOpen,
  FaAngellist,
} from "react-icons/fa";

export default function LinkCategory() {
  return (
    <div>
      <div className="w-full mb-4 ml-4">
        <div className="grid grid-cols-3 gap-1 md:flex md:items-center md:justify-start md:space-x-4">
          <Link
            href={"/browse_events"}
            className="flex flex-col items-center justify-center font-semibold text-white bg-gray-800 rounded-md w-[70px] h-[50px] hover:bg-gray-700 transition"
          >
            <FaAngellist className="mb-1" /> <span className="text-xs">All Events</span>
          </Link>
          <Link
            href={"/browse_events/category/concert"}
            className="flex flex-col items-center justify-center font-semibold text-white bg-gray-800 rounded-md w-[70px] h-[50px] hover:bg-gray-700 transition"
          >
            <FaMusic className="mb-1" /> <span className="text-xs">Concert</span>
          </Link>
          <Link
            href={"/browse_events/category/fanmeet"}
            className="flex flex-col items-center justify-center font-semibold text-white bg-gray-800 rounded-md w-[70px] h-[50px] hover:bg-gray-700 transition"
          >
            <FaPeopleCarry className="mb-1" />{" "}
            <span className="text-xs">Fanmeet</span>
          </Link>
          <Link
            href={"/browse_events/category/sports"}
            className="flex flex-col items-center justify-center font-semibold text-white bg-gray-800 rounded-md w-[70px] h-[50px] hover:bg-gray-700 transition"
          >
            <FaBasketballBall className="mb-1" />{" "}
            <span className="text-xs">Sports</span>
          </Link>
          <Link
            href={"/browse_events/category/theater"}
            className="flex flex-col items-center justify-center font-semibold text-white bg-gray-800 rounded-md w-[70px] h-[50px] hover:bg-gray-700 transition"
          >
            <FaTheaterMasks className="mb-1" />{" "}
            <span className="text-xs">Theater</span>
          </Link>
          <Link
            href={"/browse_events/category/seminar"}
            className="flex flex-col items-center justify-center font-semibold text-white bg-gray-800 rounded-md w-[70px] h-[50px] hover:bg-gray-700 transition"
          >
            <FaBookOpen className="mb-1" />{" "}
            <span className="text-xs">Seminar</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
