'use client';

import { useEffect, useState } from 'react';
import EventCard from '../../components/EventCard';

export default function Concerts() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch('https://calm-advice-f8d7355aa3.strapiapp.com/api/events', {
          headers: {
            Authorization: `bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
          },
        });
        
        if (!res.ok) throw new Error('Failed to fetch events');
        const data = await res.json();
        setEvents(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4 ">
      <h1 className="text-3xl font-bold mb-4">Available Concerts</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4"> {/* Horizontal-like grid */}
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}