import axios from "axios";

const base_url = process.env.NEXT_PUBLIC_BASE_URL_BE;
export async function getCustomerOrderDetail() {
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

export async function getOrderDetail(order_id: string) {
  try {
    const res = await fetch(`${base_url}/order/${order_id}`, {
      next: { revalidate: 0 },
    });

    const data = await res.json();

    return data?.result;
  } catch (err) {
    console.log(err);
  }
}

export async function getSnapToken(order_id: number, final_price: number) {
  try {
    const token = localStorage.getItem("token");
    console.log("Token from localStorage:", token); // Pastikan token ada

    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL_BE}/order/payment`,
      {
        order_id,
        gross_amount: final_price,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data.result;
  } catch (err) {
    console.log(err);
  }
}
