import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white text-black">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link href="http://localhost:3000/" className="flex items-center">
              <Image
                src="/Cat.gif"
                width={0}
                height={0}
                sizes="100vw"
                className="w-auto h-[150px]"
                alt="Cat Logo"
              />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-lg font-bold uppercase ">
                <span className="text-violet-500">CAT</span>ch the Moment
              </h2>
              <ul className=" font-medium">
                <li className="mb-4">
                  <Link href="/about" className="hover:underline">
                    About Us
                  </Link>
                </li>
                <li className="mb-4">
                  <a href="/" className="hover:underline">
                    Why Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-lg font-bold uppercase ">
                Partner WITH US
              </h2>
              <ul className="font-medium">
                <li className="mb-4">
                  <Link href="/promotor/register" className="hover:underline ">
                    as Event Organizer
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:underline">
                    Why Event With Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-lg font-semibold  uppercase ">
                The Event
              </h2>
              <ul className=" font-medium">
                <li className="mb-4">
                  <Link href="#" className="hover:underline">
                    Our Event
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <p className="text-sm  sm:text-center">
            © 2024{" "}
            <Link href="/" className="hover:underline">
              <span>CAT</span>ch The Moment™
            </Link>
            . All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
