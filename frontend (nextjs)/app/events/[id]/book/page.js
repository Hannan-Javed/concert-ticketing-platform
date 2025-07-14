'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';

export default function Book() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [ticketId, setTicketId] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const res = await fetch('https://calm-advice-f8d7355aa3.strapiapp.com/api/tickets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
      },
      body: JSON.stringify({ data: { eventId: id, buyerName: name, quantity } }),
      signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!res.ok) throw new Error('Failed to book ticket');
      const data = await res.json();
      const bookedTicketId = data.data.documentId;
      setTicketId(bookedTicketId);

      await fetch('https://event-ticket.app.n8n.cloud/webhook/a994df6b-525d-44dc-a949-239f7edac9cc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ticketId: bookedTicketId,
        buyerName: name,
        quantity,
        eventId: id,
        createdAt: data.data.createdAt
      }),
      });
    } catch (err) {
      setError(err.name === 'AbortError' ? 'Request timed out' : err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#232526] via-[#2c5364] to-[#0f2027] flex items-center justify-center px-2 py-8">
      <div className="w-5.6 max-w-lg bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-white mb-6">Book Tickets for Event {id}</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white/90 mb-2 font-medium">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-white/30 bg-white/30 text-white p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#7c3aed] transition"
              required
            />
          </div>
          <div>
            <label className="block text-white/90 mb-2 font-medium">Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="border border-white/30 bg-white/30 text-white p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#5eead4] transition"
              min="1"
              required
            />
          </div>
          <button type="submit" className="w-full px-6 py-3 bg-gradient-to-r from-[#5eead4] via-[#7c3aed] to-[#f472b6] text-white font-bold rounded-2xl shadow-lg border-2 border-white/20 hover:scale-105 hover:opacity-90 transition-all duration-200 focus:outline-none">
            Submit Booking
          </button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {ticketId && <>
        <p className="text-green-400 mt-4">Ticket ID: {ticketId}</p>
        <p className="mt-4">Please save this ticket ID!</p>
        </>}
      </div>
    </div>
  );
}