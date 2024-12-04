import RegisterRightPro from "@/components/register/promotor/registerRightPro";
import Image from "next/image";

export default function Register() {
  return (
    <div
      className="h-[115vh] md:h-[100vh] w-full bg-white text-black 
        flex justify-center items-center text-center"
    >
      {/* Container for two sections */}
      <div className="flex flex-col md:flex-row w-full h-full">
        {/* Left Section */}
        <div className="md:w-1/2  h-1/3 md:h-full flex items-center justify-center bg-white">
          <Image
            src="/Cat2.jpeg"
            width={400}
            height={400}
            sizes="100vw"
            className="w-auto h-[400px] md:w-[440px] md:h-auto"
            alt="concert Logo"
          />
        </div>
        {/* Right Section */}
        <div className="md:w-1/2 h-2/3 md:h-full bg-black flex items-center justify-center">
          <RegisterRightPro />
        </div>
      </div>
    </div>
  );
}
