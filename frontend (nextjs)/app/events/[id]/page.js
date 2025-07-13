'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEvent() {
      try {
        const res = await fetch(`https://calm-advice-f8d7355aa3.strapiapp.com/api/events/${id}`, {
          headers: {
            Authorization: `bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
          },
        });
        if (!res.ok) throw new Error('Failed to fetch event');
        const data = await res.json();
        setEvent(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchEvent();
  }, [id]);

  if (loading) return <p className="text-center text-white/80 text-xl">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!event) return <p className="text-center text-white/80">Event not found</p>;

  const coverUrl = event.coverPhoto || null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#232526] via-[#2c5364] to-[#0f2027] flex items-center justify-center px-2 py-8">
      <div className="w-full max-w-3xl bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-8">
        <h1 className="text-4xl font-bold text-white mb-6">{event.eventName}</h1>
        {coverUrl && (
          <div className="w-5/6 relative mb-6 rounded-2xl overflow-hidden" style={{ height: '24rem' }}>
            <Image src={coverUrl} alt="Cover" fill className="object-cover" />
          </div>
        )}
        <div className="text-white space-y-3 mb-8">
          <p><span className="font-semibold text-[#7c3aed]">Description:</span> {event.description}</p>
          <p><span className="font-semibold text-[#5eead4]">Artist:</span> {event.bandOrArtistName}</p>
          <p><span className="font-semibold text-[#f472b6]">Date:</span> {new Date(event.eventDate).toLocaleDateString()}</p>
          <p><span className="font-semibold text-[#5eead4]">Time:</span> {event.startTime}</p>
          <p><span className="font-semibold text-[#7c3aed]">Location:</span> {event.location}</p>
        </div>
        <Link href={`/events/${id}/book`}>
          <button className="px-8 py-4 bg-gradient-to-r from-[#7c3aed] via-[#f472b6] to-[#5eead4] text-white font-bold rounded-2xl shadow-lg border-2 border-white/20 transition-all duration-200 hover:scale-105 hover:bg-gradient-to-l hover:opacity-90 focus:outline-none">
            Book Tickets
          </button>
        </Link>
      </div>
    </div>
  );
}