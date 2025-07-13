import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#0f2027] via-[#2c5364] to-[#232526]">
      <header className="w-full pb-4 flex flex-col items-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight drop-shadow-lg">
          Welcome to the Concert Ticketing Platform
        </h1>
        <span className="block mt-4 h-1 w-32 bg-gradient-to-r from-[#5eead4] via-[#7c3aed] to-[#f472b6] rounded-full shadow-lg"></span>
      </header>
      <main className="flex flex-1 flex-col items-center justify-center">
        <div className="flex flex-row gap-10 mt-4">
          <Link href="/concerts">
            <button className="px-10 py-8 bg-gradient-to-r from-[#5eead4] via-[#7c3aed] to-[#f472b6] text-white font-extrabold text-2xl rounded-3xl shadow-xl transition-all duration-200 hover:scale-105 hover:bg-gradient-to-l hover:opacity-90 focus:outline-none min-w-[220px] min-h-[80px]">
              View Concerts
            </button>
          </Link>
          <Link href="/tickets">
            <button className="px-10 py-8 bg-gradient-to-r from-[#f472b6] via-[#7c3aed] to-[#5eead4] text-white font-extrabold text-2xl rounded-3xl shadow-xl transition-all duration-200 hover:scale-105 hover:bg-gradient-to-l hover:opacity-90 focus:outline-none min-w-[220px] min-h-[80px]">
              View Tickets
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}