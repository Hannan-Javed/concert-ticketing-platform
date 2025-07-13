import './globals.css';

export const metadata = {
  title: 'Concert Ticketing Platform',
  description: 'Buy concert tickets easily',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}