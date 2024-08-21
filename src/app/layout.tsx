'use client';

import { Inter } from 'next/font/google';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Provider } from 'react-redux';

import './globals.css';
import Link from 'next/link';
import {store} from "@/store/store";
import { usePathname } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] });



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const pathname = usePathname()

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
            <Link href="/managers" style={ pathname === '/managers' ? {color: 'black'} : {color: 'grey'}}>Managers page</Link>
            <Link href="/clients" style={ pathname === '/clients' ? {color: 'black'} : {color: 'grey'}}>Clients page</Link>
          </nav>
          <Provider store={store}>{children}</Provider>
        </AntdRegistry>
      </body>
    </html>
  );
}
