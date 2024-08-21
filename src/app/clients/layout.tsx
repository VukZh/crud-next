import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CRUD Next App | Clients',
  description: 'CRUD Next App example',
};

export default function ManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
