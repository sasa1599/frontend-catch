import Image from "next/image";

const FounderSection = () => {
  return (
    <section className="w-full min-h-screen bg-white py-16 px-4 md:px-6 lg:px-8 text-black">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-5xl font-medium text-center md:text-left">
            Help us build a better industry
          </h1>
        </div>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative w-full aspect-[4/5] bg-gray-100">
            <div className="absolute -left-12 top-0 hidden md:block">
              <span className="writing-mode-vertical transform -rotate-180 text-sm tracking-wider text-gray-700">
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
          <div className="flex flex-col justify-center space-y-8">
            <blockquote className="text-2xl leading-relaxed">
              "You're encouraged to take your time to produce the best work you possibly can. It's about doing everything with intention rather than just doing."
            </blockquote>
            <div className="space-y-1">
              <h3 className="text-xl font-medium">Emma Jennings</h3>
              <p className="text-gray-600">Senior Product Designer</p>
            </div>
            <div className="pt-8 border-t border-gray-200">
              <h4 className="text-lg font-medium mb-4">Want to join our team?</h4>
              <button className="px-6 py-3 bg-black text-white rounded-full hover:opacity-90 transition-opacity">
                View Open Positions
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
