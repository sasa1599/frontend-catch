export const CONFIG = {
    API_URL: process.env.NEXT_PUBLIC_BASE_URL_BE || "http://localhost:8001/api", 
    MIDTRANS_API_URL: process.env.NEXT_PUBLIC_MIDTRANS_API_URL || "",
   MID_ENCODEDKEY :Buffer.from(process.env.NEXT_PUBLIC_MID_SERVEY_KEY + ':').toString('base64')
};
