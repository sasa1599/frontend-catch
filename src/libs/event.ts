const base_url = process.env.NEXT_PUBLIC_BASE_URL_BE;

export const getEvent = async () => {
  const res = await fetch(`${base_url}/events`, {
    next: { revalidate: 0 },
  });
  const data = await res.json();

  return data?.event;
};

export const getEventSlug = async (slug: string) => {
  const res = await fetch(`${base_url}/events/${slug}`, {
    next: { revalidate: 0 },
  });
  if (!res.ok) {
    if (res.status === 401) {
      console.error("User not authenticated");
    } else {
      console.error(`Failed to fetch event ${slug}:`, res.statusText);
    }
    return [];
  }

  const data = await res.json();
  return data;
};

export const getCategory = async (category: string) => {
  const res = await fetch(`${base_url}/events/category/${category}`, {
    next: { revalidate: 0 },
  });
  if (!res.ok) {
    console.error(`Failed to fetch event with ${category}:`, res.statusText);
    return [];
  }
  const data = await res.json();
  return data?.event;
};
