const base_url = process.env.NEXT_PUBLIC_BASE_URL_BE;

export const getReviews = async (event_id: string) => {
    const res = await fetch(`${base_url}/review/${event_id}`, {
        next: { revalidate: 0 },
      });
      const data = await res.json();
    
      return data?.result;
};

export const getAvgRating = async (promotor_id: number) => {
    const res = await fetch(`${base_url}/review/avg/${promotor_id}`, {
        next: { revalidate: 0 },
      });
      const data = await res.json();
    
      return data?.event;
};