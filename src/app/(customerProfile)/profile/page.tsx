import Image from "next/image";
import Link from "next/link";

export default function ProfileCustomer(){
    return (
        <div>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
    <Link href="/" className="flex items-center gap-2">
      <Image src="/logo.gif" alt="Logo" width={40} height={40} />
      <span className="text-lg md:text-2xl font-bold">CATch</span>
    </Link>
    </div>
    <div>
        <p>My Profile</p>
        <p>My Events</p>
        <p>Checkout</p>
    </div>
    </div>
    )
}