import Image from "next/image";

export default function About() {
  return (
    <div className="h-[100vh] w-full bg-white flex justify-center items-center text-center">
      <div className="text-black mx-11 lg:mx-96 flex flex-col items-center">
        <div>
          <strong className="text-2xl font-extrabold">
            THIS IS <br /> <span className="text-violet-500">CAT</span>CH THE
            MOMENT!
          </strong>
          <p className="text-sm my-6">
            We&apos;ve always believed that live events have the power to
            transform lives. That&apos;s why we built a platform that allows
            fans to enjoy the events they&apos;re passionate about in the
            simplest and most convenient way.
          </p>
        </div>
        <Image
          src="/Cat1.gif"
          width={400}
          height={400}
          sizes="100vw"
          className="w-auto h-[400px] md:w-[440px] md:h-auto"
          alt="concert Logo"
        />
        <div className="text-start flex flex-col gap-5 text-sm">
          <p className="text-start text-xl font-bold">Going out makes us feel good</p>
          <p>
            Whether you&apos;re into underground gigs or lively club nights,
            grand festivals or intimate parties, comedy shows or captivating
            drag performances, live events are where unforgettable memories are
            made. They&apos;re the spaces where we find our people, build our
            communities, and explore the hidden gems of our cities.
          </p>
          <p>
            We understand the importance of these moments, which is why
            we&apos;ve developed a platform designed to help you connect with
            more of the events you love, effortlessly
          </p>
          <p>
            Since 2024, CATch the Moment has been transforming the ticketing
            experience for fans, creators, and venues—tearing down barriers to
            ensure every event is accessible, fair, and unforgettable, while
            championing inclusivity along the way.
          </p>
        </div>
      </div>
    </div>
  );
}
