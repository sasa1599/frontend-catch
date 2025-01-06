import axios from "axios";

const base_url = process.env.NEXT_PUBLIC_BASE_URL_BE;

export async function getCoupon() {
  try {
    const res = await axios.get(`${base_url}/user/coupon`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res.data?.result
  } catch (err) {
    console.error("Error fetching order details:", err);

  }
}

export async function getPoint() {
  try {
    const res = await axios.get(`${base_url}/user/point`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return res.data?.result
  } catch (err) {
    console.error("Error fetching order details:", err);
  }
}

