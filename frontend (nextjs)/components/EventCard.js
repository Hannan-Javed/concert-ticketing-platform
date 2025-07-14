import Image from 'next/image';
import Link from 'next/link';
import styles from './EventCard.module.css'; // Import the CSS file

export default function EventCard({ event }) {
  const { documentId, eventName, bandOrArtistName, coverPhoto, location, eventDate, startTime } = event;
  const coverUrl = coverPhoto?.data?.attributes?.url || null;

  return (
    <Link href={`/events/${documentId}`} className={styles.link}>
      <div className={styles.card}>
        {coverUrl && (
          <div className={styles.imageContainer}>
            <Image src={coverUrl} alt="Cover" fill className={styles.image} />
          </div>
        )}
        <div className={styles.details}>
          <h2 className={styles.title}>
            {eventName || bandOrArtistName}
          </h2>
          <p className={styles.location}>
            {location}
          </p>
          <p className={styles.date}>
            {new Date(eventDate).toLocaleDateString()} at {startTime}
          </p>
        </div>
      </div>
    </Link>
  );
}