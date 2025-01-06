import Image from "next/image";
import Link from "next/link";

const FounderSection = () => {
  return (
    <section className="w-full min-h-screen bg-white py-16 px-4 md:px-6 lg:px-8 text-black">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-medium leading-tight md:leading-snug text-gray-800">
            Help us build a better industry
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative w-full h-80 md:h-full aspect-[4/5] bg-gray-100 rounded-lg overflow-hidden">
            <div className="absolute top-4 left-0 md:left-12 md:top-12 hidden md:block">
              <span className="writing-mode-vertical transform -rotate-180 text-sm tracking-wider text-gray-700 font-semibold">
                JOIN THE TEAM
              </span>
            </div>
            <Image
              src="/founder.jpg"
              alt="Founder portrait"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="flex flex-col justify-center space-y-6 md:space-y-8">
            <blockquote className="text-lg md:text-xl leading-relaxed text-gray-700 italic font-semibold">
              “시간을 들여 최고의 작품을 만들 수 있도록 노력하는 것이 좋습니다.
              그냥 하는 것이 아니라 의도를 가지고 모든 일을 하는 것이
              중요합니다.”
            </blockquote>

            <blockquote className="text-base md:text-lg font-bold text-gray-900 leading-relaxed">
              "You're encouraged to take your time to produce the best work you
              possibly can. It's about doing everything with intention rather
              than just doing."
            </blockquote>

            <div className="space-y-1">
              <h3 className="text-xl md:text-2xl font-medium text-gray-800">
                Kim Soo Hyun
              </h3>
              <p className="text-gray-600">Senior Product Designer</p>
            </div>

            <div className="pt-8 border-t border-gray-200">
              <h4 className="text-lg font-medium mb-4 text-gray-800">
                Want to join and become a creator?
              </h4>
              <button className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-700 hover:text-gray-100 transition ease-in-out duration-300">
                <Link href="/sign-up/promotor">Join as Promotor</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
