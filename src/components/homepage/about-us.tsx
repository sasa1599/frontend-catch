import Link from "next/link";
import Image from "next/image";

export default function AboutUs() {
  return (
    <div className="min-h-screen w-full bg-white md:px-40">
      <div className="container mx-auto px-4 md:px-24 py-8">
        <div className="flex flex-col text-black font-bold">
          {/* Header Section */}
          <div className="mb-6 text-lg uppercase text-center md:text-start md:text-2xl">
            Who we are, what we do, and why we do it
          </div>

          {/* Content Section */}
          <div className="flex flex-col gap-12 md:gap-4">
            {/* Section 1 */}
            <div className="flex flex-col items-end md:flex-row gap-8">
              <Image
                src="/concertLandScape.jpeg"
                width={440}
                height={300}
                sizes="100vw"
                className="w-[90%] md:w-[470px] h-auto rounded-md"
                alt="concert landscape"
              />
              <div className="text-center md:text-start">
                <div className="text-md md:text-xl font-semibold">
                  CATch the Moment: Our Mission, Services, and Passion for
                  Events!
                </div>
                <div className="text-sm md:text-base font-light mt-2">
                  To honor the essence of live music, we&apos;ve created a guide
                  to Indonesia&apos;s best independent venues.
                </div>
              </div>
            </div>
            <hr className="w-full border-gray-300 md:hidden" />
            <div className="flex flex-col md:flex-row gap-5">
              {/* Section 2 */}
              <div className="flex items-center md:flex-col gap-8">
                <Image
                  src="/whoAreWe.jpeg"
                  width={440}
                  height={300}
                  sizes="100vw"
                  className="w-[50%] md:w-[200px] h-auto md:h-[270px] rounded-md"
                  alt="who we are"
                />
                <div className="text-start md:text-start">
                  <div className="text-md font-semibold">
                    We are CATch the moment
                  </div>
                  <div className="text-sm font-light md:text-justify mt-2">
                    An event ticketing management platform, designed to make
                    discovering and attending live events easier than ever.
                  </div>
                </div>
              </div>
              <hr className="w-full border-gray-300 md:hidden" />

              {/* Section 3 */}
              <div className="flex flex-row-reverse items-center md:flex-col gap-8">
                <Image
                  src="/whatWeDo.jpeg"
                  width={440}
                  height={300}
                  sizes="100vw"
                  className="w-[50%] md:w-[200px] h-auto md:h-[270px] rounded-md"
                  alt="what we do"
                />
                <div className="text-end md:text-start">
                  <div className="text-md font-semibold">
                    We create an accessible platform
                  </div>
                  <div className="text-sm font-light md:text-justify mt-2">
                    For booking tickets to independent live events across
                    Indonesia, making it simple for music lovers to access
                    exclusive and exciting experiences.
                  </div>
                </div>
              </div>
              <hr className="w-full border-gray-300 md:hidden" />

              {/* Section 4 */}
              <div className="flex items-center md:flex-col gap-8">
                <Image
                  src="/blackpink.jpeg"
                  width={440}
                  height={300}
                  sizes="100vw"
                  className="w-[50%] md:w-[200px] h-auto md:h-[270px] rounded-md"
                  alt="event moments"
                />
                <div className="text-start">
                  <div className="text-md font-semibold">
                    We believe in the power of events
                  </div>
                  <div className="text-sm font-light md:text-justify mt-2">
                    To create unforgettable memories, and our platform aims to
                    bring people closer to the moments they&apos;ll cherish by
                    streamlining ticket access to the best events.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
