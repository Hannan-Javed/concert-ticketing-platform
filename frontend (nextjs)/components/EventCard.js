import Image from 'next/image';
import Link from 'next/link';

export default function EventCard({ event }) {
  const { documentId, eventName, bandOrArtistName, coverPhoto, location, eventDate, startTime } = event;
  const coverUrl = coverPhoto?.data?.attributes?.url || null;

  return (
    <Link href={`/events/${documentId}`} className="block">
      <div className="w-full bg-white/20 border-2 border-white/30 rounded-2xl shadow-xl backdrop-blur-lg p-5 flex flex-col h-full transition-all duration-200 hover:scale-101 hover:shadow-2xl group">
        {coverUrl && (
          <div className="w-full h-48 relative mb-4 rounded-xl overflow-hidden">
            <Image src={coverUrl} alt="Cover" fill className="object-cover group-hover:scale-105 transition-transform duration-200" />
          </div>
        )}
        <div className="flex flex-col justify-between flex-1">
          <h2 className="text-2xl font-bold text-white mb-2">{eventName || bandOrArtistName}</h2>
          <p className="text-[#5eead4] font-semibold mb-1">{location}</p>
          <p className="text-white/80">{new Date(eventDate).toLocaleDateString()} at {startTime}</p>
        </div>
      </div>
    </Link>
  );
}