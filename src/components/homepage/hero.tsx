import Link from "next/link";

const Hero = () => {
  return (
    <div className="min-h-screen pt-32 px-6 bg-white text-black"> {/* Increased padding-top */}
      <div className="max-w-[90rem] mx-auto grid grid-cols-2 gap-12 items-center">
        <div className="mt-12"> {/* Added margin-top to move text content further down */}
          <h1 className="text-7xl font-bold leading-tight mb-8">
            YOUR GATEWAY TO
            <br />
            UNFORGETTABLE
            <br />
            EXPERIENCES
          </h1>
          <p className="text-xl mb-8">
            Unforgettable live experiences. Transparent pricing. Personalized picks. With CATch, creating moments you'll love has never been easier.
          </p>
          <Link href="/sign-up/customer"><button className="px-8 py-3 bg-black text-white rounded-full hover:opacity-90">
            GET THE APP
          </button></Link>
        </div>
        <div className="relative aspect-[14/16]  rounded-3xl overflow-hidden flex flex-col">
          <iframe
            src="https://www.youtube.com/embed/Zp-Jhuhq0bQ?&playlist=Zp-Jhuhq0bQ&mute=1"
            title="YouTube video 1"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-11/12 h-1/3 mx-auto" 
          ></iframe>
          <iframe
            src="https://www.youtube.com/embed/IHNzOHi8sJs?&playlist=IHNzOHi8sJs&mute=1"
            title="YouTube video 2"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-11/12 h-1/3 mx-auto" 
          ></iframe>
          <iframe
            src="https://www.youtube.com/embed/u01r0O5WsEo?&playlist=u01r0O5WsEo&mute=1"
            title="YouTube video 3"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-11/12 h-1/3 mx-auto" 
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Hero;
