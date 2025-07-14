'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import styles from './Book.module.css'; // Import the CSS file

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
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Book Tickets for Event</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div>
            <label className={styles.label}>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <div>
            <label className={styles.label}>Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className={styles.input}
              min="1"
              required
            />
          </div>
          <button type="submit" className={styles.button}>
            Submit Booking
          </button>
        </form>
        {error && <p className={styles.error}>{error}</p>}
        {ticketId && (
          <>
            <p className={styles.success}>Ticket ID: {ticketId}</p>
            <p className={styles.saveMessage}>Please save this ticket ID!</p>
          </>
        )}
      </div>
    </div>
  );
}