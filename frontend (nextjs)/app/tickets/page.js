'use client';

import { useState } from 'react';

export default function Tickets() {
  const [ticketId, setTicketId] = useState('');
  const [ticketData, setTicketData] = useState(null);
  const [eventData, setEventData] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`https://calm-advice-f8d7355aa3.strapiapp.com/api/tickets/${ticketId}`, {
        headers: {
          Authorization: `bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
        },
      });
      if (!res.ok) throw new Error('Failed to fetch ticket');
      const data = await res.json();
      if (data.data.length === 0) throw new Error('Ticket not found');
      setTicketData(data.data);

      const eventId = data.data.eventId;
      const eventRes = await fetch(`https://calm-advice-f8d7355aa3.strapiapp.com/api/events/${eventId}`, {
        headers: {
          Authorization: `bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
        },
      });
      if (!eventRes.ok) throw new Error('Failed to fetch event');
      const eventData = await eventRes.json();
      setEventData(eventData.data);

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#232526] via-[#2c5364] to-[#0f2027] flex items-center justify-center px-2 py-8">
      <div className="w-1/2 max-w-lg bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-white mb-6">View Your Ticket</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white/90 mb-2 font-medium">Ticket ID</label>
            <input
              type="text"
              value={ticketId}
              onChange={(e) => setTicketId(e.target.value)}
              className="border border-white/30 bg-white/30 text-white p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#f472b6] transition"
              required
            />
          </div>
          <button type="submit" className="w-full px-6 py-3 bg-gradient-to-r from-[#f472b6] via-[#7c3aed] to-[#5eead4] text-white font-bold rounded-2xl shadow-lg border-2 border-white/20 hover:scale-105 hover:opacity-90 transition-all duration-200 focus:outline-none">
            Lookup Ticket
          </button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {ticketData && (
          <div className="mt-8 bg-white/20 border-2 border-white/30 rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Ticket Details</h2>
            <p className="text-white/90"><strong>Name:</strong> {ticketData.buyerName}</p>
            <p className="text-[#5eead4]"><strong>Quantity:</strong> {ticketData.quantity}</p>
            {eventData && (
              <>
                <p className="text-[#7c3aed]"><strong>Event:</strong> {eventData.eventName}</p>
                <p className="text-[#f472b6]"><strong>Band/Artist:</strong> {eventData.bandOrArtistName}</p>
                <p className="text-white/90"><strong>Date:</strong> {new Date(eventData.eventDate).toLocaleDateString()}</p>
                <p className="text-white/90"><strong>Time:</strong> {eventData.startTime}</p>
                <p className="text-[#5eead4]"><strong>Location:</strong> {eventData.location}</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}