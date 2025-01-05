const base_url = process.env.NEXT_PUBLIC_BASE_URL_BE;

export const getTicket = async (event_id: number, token: string | null) => {
  if (!token) throw new Error("Token not found");

  const res = await fetch(`${base_url}/tickets/${event_id}`, {
    next: { revalidate: 0 },
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message || "Failed to fetch tickets");

  return data.result;
};
