'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import styles from './EventDetail.module.css'; // Import the CSS file

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

  if (loading) return <p className={styles.loading}>Loading...</p>;
  if (error) return <p className={styles.error}>{error}</p>;
  if (!event) return <p className={styles.notFound}>Event not found</p>;

  const coverUrl = event.coverPhoto || null;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>{event.eventName}</h1>
        {coverUrl && (
          <div className={styles.imageContainer}>
            <Image src={coverUrl} alt="Cover" fill className={styles.image} />
          </div>
        )}
        <div className={styles.details}>
          <p><span className={styles.label}>Description:</span> {event.description}</p>
          <p><span className={styles.label}>Artist:</span> {event.bandOrArtistName}</p>
          <p><span className={styles.label}>Date:</span> {new Date(event.eventDate).toLocaleDateString()}</p>
          <p><span className={styles.label}>Time:</span> {event.startTime}</p>
          <p><span className={styles.label}>Location:</span> {event.location}</p>
        </div>
        <Link href={`/events/${id}/book`}>
          <button className={styles.button}>
            Book Tickets
          </button>
        </Link>
      </div>
    </div>
  );
}