import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex h-[calc(100vh-60px)] items-center justify-center bg-white text-black">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-[250px] w-[250px] animate-spin">
          <Image src="/loading.gif" alt="loading" fill priority />
        </div>
        <span className="text-2xl font-semibold whitespace-nowrap">
          Please Wait
        </span>
      </div>
    </div>
  );
}
