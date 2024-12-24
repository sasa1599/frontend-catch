const base_url = process.env.NEXT_PUBLIC_BASE_URL_BE

export const getTicket = async (event_id:string) => {
    const res = await fetch(`${base_url}/tickets/${event_id}`, {
      next: { revalidate: 0 },
    });
    const data = await res.json();
  
    return data.result
  };