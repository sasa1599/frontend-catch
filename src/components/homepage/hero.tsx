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
          
          <div className="relative aspect-[9/16] bg-gray-100 rounded-3xl overflow-hidden">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/your-video.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    )
  }
  
  export default Hero