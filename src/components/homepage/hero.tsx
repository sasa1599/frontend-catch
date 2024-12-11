const Hero = () => {
  return (
    <div className="min-h-screen pt-20 px-6 bg-white text-black">
      <div className="max-w-7xl mx-auto grid grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-7xl font-bold leading-tight mb-8">
            FIND MORE OF
            <br />
            THE EVENTS
            <br />
            YOU LOVE
          </h1>
          <p className="text-xl mb-8">
            Incredible live shows. Upfront pricing. Relevant recommendations. We make going out easy.
          </p>
          <button className="px-8 py-3 bg-black text-white rounded-full hover:opacity-90">
            GET THE APP
          </button>
        </div>
        <div className="relative aspect-[9/16] bg-gray-100 rounded-3xl overflow-hidden flex flex-col">
          <iframe
            src="https://www.youtube.com/embed/Zp-Jhuhq0bQ?autoplay=1&loop=1&playlist=Zp-Jhuhq0bQ&mute=1"
            title="YouTube video 1"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-1/3"
          ></iframe>
          <iframe
            src="https://www.youtube.com/embed/IHNzOHi8sJs?autoplay=1&loop=1&playlist=IHNzOHi8sJs&mute=1"
            title="YouTube video 2"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-1/3"
          ></iframe>
          <iframe
            src="https://www.youtube.com/embed/u01r0O5WsEo?autoplay=1&loop=1&playlist=u01r0O5WsEo&mute=1"
            title="YouTube video 3"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-1/3"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Hero;
