import Link from "next/link";

const Hero = () => {
  return (
    <div className="min-h-screen pt-32 px-6 bg-white text-black">
      {/* Container */}
      <div className="max-w-[90rem] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Section */}
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            YOUR GATEWAY TO
            <br />
            UNFORGETTABLE
            <br />
            EXPERIENCES
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Unforgettable live experiences. Transparent pricing. Personalized picks. With CATch, creating moments you&apos;ll love has never been easier.
          </p>
          <Link href="/sign-up/customer">
            <button className="px-6 md:px-8 py-3 bg-black text-white rounded-full hover:opacity-90 transition">
              JOIN WITH US
            </button>
          </Link>
        </div>

        {/* Right Section */}
        <div className="relative flex flex-col space-y-4">
          <iframe
            src="https://www.youtube.com/embed/Zp-Jhuhq0bQ?&playlist=Zp-Jhuhq0bQ&mute=1"
            title="YouTube video 1"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full md:w-10/12 aspect-video rounded-xl shadow-lg mx-auto"
          ></iframe>
          <iframe
            src="https://www.youtube.com/embed/IHNzOHi8sJs?&playlist=IHNzOHi8sJs&mute=1"
            title="YouTube video 2"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full md:w-10/12 aspect-video rounded-xl shadow-lg mx-auto"
          ></iframe>
          <iframe
            src="https://www.youtube.com/embed/u01r0O5WsEo?&playlist=u01r0O5WsEo&mute=1"
            title="YouTube video 3"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full md:w-10/12 aspect-video rounded-xl shadow-lg mx-auto"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Hero;
