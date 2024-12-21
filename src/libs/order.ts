const base_url = process.env.NEXT_PUBLIC_BASE_URL_BE;

export async function getTransactionDetail(transaction_id: string) {
  try {
    const res = await fetch(`${base_url}/order/${transaction_id}`, {
      next: { revalidate: 0 },
    });
    const data = await res.json();
    return data?.result;
  } catch (err) {
    console.log(err);
  }
}

export async function getSnapToken(final_price: number) {
  const order_id = "";

  try {
    const res = await fetch(`${base_url}/order/payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_id: order_id,
        gross_amount: final_price,
      }),
      next: { revalidate: 0 },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();
    return data.result;
  } catch (err) {
    console.error("Error fetching Snap Token:", err);
    throw err;
  }
}


