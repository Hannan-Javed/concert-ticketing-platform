import Link from 'next/link';

export default function Home() {
  return (
    <div className="container">
      <header className="header">
        <h1 className="title">
          Welcome to the Concert Ticketing Platform
        </h1>
        <span className="underline"></span>
      </header>
      <main className="main">
        <div className="button-container">
          <Link href="/concerts">
            <button className="button concerts-button">
              View Concerts
            </button>
          </Link>
          <Link href="/tickets">
            <button className="button tickets-button">
              View Tickets
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}