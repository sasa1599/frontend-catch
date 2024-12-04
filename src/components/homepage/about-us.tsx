import Link from "next/link";
import Image from "next/image";
import Wrapper from "@/helpers/wrapper";

export default function AboutUs() {
  return (
    <div className="h-screen w-full bg-white px-52">
      <Wrapper>
        <div className="flex flex-col p-10 text-black font-bold justify-center">
          <div className="mb-4 md:text-lg uppercase">
            Who we are, what we do, and why we do it
          </div>

          <div className="gap-8 text-justify w-full">
            <Link href="http://localhost:3000">
              <div className="flex flex-col md:flex-row gap-4">
                <Image
                  src="/love.jpeg"
                  width={400}
                  height={400}
                  sizes="100vw"
                  className="w-auto h-[400px] md:w-[440px] md:h-auto"
                  alt="concert Logo"
                />
                <div className="flex flex-col gap-5">
                  <div className="text-md text-start">
                    Discover CATch the Moment: Our Mission, Services, and
                    Passion for Events!
                  </div>
                  <div className="font-size-[10px] font-light">
                    We are CATch the moment, an event ticketing management
                    platform, designed to make discovering and attending live
                    events easier than ever.
                  </div>
                  <div className="font-size-[10px] font-light">
                    We provide a user-friendly platform for booking tickets to
                    independent live music events across Indonesia, making it
                    simple for music lovers to access exclusive and exciting
                    experiences.
                  </div>
                  <div className="font-size-[10px] font-light">
                    We believe in the power of live music to create
                    unforgettable memories, and our platform aims to bring
                    people closer to the moments they&apos;ll cherish by
                    streamlining ticket access to the best events.
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </Wrapper>
    </div>
  );
}
