import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AntdRegistry } from '@ant-design/nextjs-registry';

import './globals.css';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CRUD Next App',
  description: 'CRUD Next App example',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AntdRegistry>
          <nav
            style={{
              marginBottom: '20px',
              height: '30px',
              display: 'flex',
              justifyContent: 'center',
              gap: '20px',
            }}>
            <Link href="/managers">Managers page</Link>
            <Link href="/clients">Clients page</Link>
          </nav>
          {children}
        </AntdRegistry>
      </body>
    </html>
  );
}
