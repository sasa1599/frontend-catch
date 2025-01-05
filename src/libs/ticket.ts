const base_url = process.env.NEXT_PUBLIC_BASE_URL_BE;

export const getTicket = async (event_id: number) => {
  const res = await fetch(`${base_url}/tickets/${event_id}`, {
    next: { revalidate: 0 },
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  console.log("response", res);

  const data = await res.json();

  console.log("data", data);

  return data.result;
};
