import axios from "axios";

const base_url = process.env.NEXT_PUBLIC_BASE_URL_BE;

export async function getCoupon() {
  try {
    const res = await axios.get(`${base_url}/order/user/detail`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return res.data?.result || [];
  } catch (err) {
    console.error("Error fetching order details:", err);
    return [];
  }
}

export async function getPoint(order_id: string) {
  try {
    const res = await fetch(`${base_url}/order/${order_id}`, {
      next: { revalidate: 0 },
    });

    const data = await res.json();
    console.log(data);

    return data?.result;
  } catch (err) {
    console.log(err);
  }
}

