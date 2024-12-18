export const getEvent = async () => {
  const res = await fetch(`http://localhost:8001/api/events`, {
    next: { revalidate: 0 },
  });
  const data = await res.json();

  return data?.event;
};

export const getEventSlug = async (slug: string) => {
  const res = await fetch(`http://localhost:8001/api/events/${slug}`, {
    next: { revalidate: 0 },
  });
  if (!res.ok) {
    console.error(`Failed to fetch event ${slug}:`, res.statusText);
    return [];
  }
  const data = await res.json();
  return data?.event ? [data.event] : [];
};

export const getCategory = async (category: string) => {
  const res = await fetch(
    `http://localhost:8001/api/events/category/${category}`,
    {
      next: { revalidate: 0 },
    }
  );
  if (!res.ok) {
    console.error(`Failed to fetch event with ${category}:`, res.statusText);
    return [];
  }
  const data = await res.json();
  return data?.event;
};
