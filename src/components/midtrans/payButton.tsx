"use client";

export default function PayButton({
  token,
}: {
  token: () => Promise<string | undefined>;
}) {
  const handleClick = async () => {
    const snapToken = await token();
    if (snapToken) {
      window.snap.pay(snapToken);
    } else {
      console.error("Invalid Snap Token");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded-md"
    >
      Pay
    </button>
  );
}
