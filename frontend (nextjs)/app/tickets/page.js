'use client';

import { useState } from 'react';
import styles from './Tickets.module.css'; // Import the CSS file

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
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>View Your Ticket</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div>
            <label className={styles.label}>Ticket ID</label>
            <input
              type="text"
              value={ticketId}
              onChange={(e) => setTicketId(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <button type="submit" className={styles.button}>
            Lookup Ticket
          </button>
        </form>
        {error && <p className={styles.error}>{error}</p>}
        {ticketData && (
          <div className={styles.details}>
            <h2 className={styles.detailsTitle}>Ticket Details</h2>
            <p className={styles.detail}><strong>Name:</strong> {ticketData.buyerName}</p>
            <p className={styles.detail}><strong>Quantity:</strong> {ticketData.quantity}</p>
            {eventData && (
              <>
                <p className={styles.detail}><strong>Event:</strong> {eventData.eventName}</p>
                <p className={styles.detail}><strong>Band/Artist:</strong> {eventData.bandOrArtistName}</p>
                <p className={styles.detail}><strong>Date:</strong> {new Date(eventData.eventDate).toLocaleDateString()}</p>
                <p className={styles.detail}><strong>Time:</strong> {eventData.startTime}</p>
                <p className={styles.detail}><strong>Location:</strong> {eventData.location}</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}