import Image from "next/image";

export default function AboutUs() {
  return (
    <div className="min-h-screen w-full bg-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="flex flex-col text-black">
          <h1 className="mb-12 text-lg uppercase text-center font-bold md:text-3xl">
            Who we are, what we do, and why we do it
          </h1>

          {/* Hero Section */}
          <div className="flex flex-col gap-16">
            <div className="flex flex-col items-center md:flex-row md:items-center md:justify-between gap-8 md:gap-16">
              <Image
                src="/concertLandScape.jpeg"
                width={440}
                height={300}
                sizes="100vw"
                className="w-[90%] md:w-[50%] h-auto rounded-xl shadow-lg transition-transform duration-300 hover:scale-105"
                alt="concert landscape"
              />
              <div className="text-center md:text-start md:w-[45%]">
                <h2 className="text-xl md:text-3xl font-bold text-gray-800 mb-4">
                  CATch the Moment: Our Mission, Services, and Passion for Events!
                </h2>
                <p className="text-base md:text-lg font-light text-gray-600 leading-relaxed">
                  To honor the essence of live music, we&apos;ve created a guide to Indonesia&apos;s best independent venues.
                </p>
              </div>
            </div>

            {/* Info Cards Section - Desktop */}
            <div className="hidden md:grid md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="group bg-white rounded-xl p-6 transition-all duration-300 hover:shadow-xl">
                <div className="flex flex-col gap-6">
                  <Image
                    src="/whoAreWe.jpeg"
                    width={440}
                    height={300}
                    sizes="100vw"
                    className="w-full h-[250px] object-cover rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105"
                    alt="who we are"
                  />
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-800">
                      We are CATch the moment
                    </h3>
                    <p className="text-base font-light text-gray-600 leading-relaxed">
                      An event ticketing management platform, designed to make discovering and attending live events easier than ever.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="group bg-white rounded-xl p-6 transition-all duration-300 hover:shadow-xl">
                <div className="flex flex-col gap-6">
                  <Image
                    src="/whatWeDo.jpeg"
                    width={440}
                    height={300}
                    sizes="100vw"
                    className="w-full h-[250px] object-cover rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105"
                    alt="what we do"
                  />
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-800">
                      We create an accessible platform
                    </h3>
                    <p className="text-base font-light text-gray-600 leading-relaxed">
                      For booking tickets to independent live events across Indonesia, making it simple for music lovers to access exclusive and exciting experiences.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="group bg-white rounded-xl p-6 transition-all duration-300 hover:shadow-xl">
                <div className="flex flex-col gap-6">
                  <Image
                    src="/blackpink.jpeg"
                    width={440}
                    height={300}
                    sizes="100vw"
                    className="w-full h-[250px] object-cover rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105"
                    alt="event moments"
                  />
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-800">
                      We believe in the power of events
                    </h3>
                    <p className="text-base font-light text-gray-600 leading-relaxed">
                      To create unforgettable memories, and our platform aims to bring people closer to the moments they&apos;ll cherish by streamlining ticket access to the best events.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Alternating Layout */}
            <div className="flex flex-col gap-8 md:hidden">
              {/* Mobile Card 1 - Left Image */}
              <div className="flex items-center gap-8">
                <Image
                  src="/whoAreWe.jpeg"
                  width={440}
                  height={300}
                  sizes="100vw"
                  className="w-[50%] h-auto rounded-md shadow-md"
                  alt="who we are"
                />
                <div className="text-start">
                  <h3 className="text-md font-semibold">
                    We are CATch the moment
                  </h3>
                  <p className="text-sm font-light mt-2">
                    An event ticketing management platform, designed to make discovering and attending live events easier than ever.
                  </p>
                </div>
              </div>

              {/* Mobile Card 2 - Right Image */}
              <div className="flex flex-row-reverse items-center gap-8">
                <Image
                  src="/whatWeDo.jpeg"
                  width={440}
                  height={300}
                  sizes="100vw"
                  className="w-[50%] h-auto rounded-md shadow-md"
                  alt="what we do"
                />
                <div className="text-end">
                  <h3 className="text-md font-semibold">
                    We create an accessible platform
                  </h3>
                  <p className="text-sm font-light mt-2">
                    For booking tickets to independent live events across Indonesia, making it simple for music lovers to access exclusive and exciting experiences.
                  </p>
                </div>
              </div>

              {/* Mobile Card 3 - Left Image */}
              <div className="flex items-center gap-8">
                <Image
                  src="/blackpink.jpeg"
                  width={440}
                  height={300}
                  sizes="100vw"
                  className="w-[50%] h-auto rounded-md shadow-md"
                  alt="event moments"
                />
                <div className="text-start">
                  <h3 className="text-md font-semibold">
                    We believe in the power of events
                  </h3>
                  <p className="text-sm font-light mt-2">
                    To create unforgettable memories, and our platform aims to bring people closer to the moments they&apos;ll cherish by streamlining ticket access to the best events.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}