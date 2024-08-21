import type {Metadata} from "next";
import { permanentRedirect } from 'next/navigation'


export const metadata: Metadata = {
  title: 'CRUD Next App',
  description: 'CRUD Next App example',
};

export default function Home() {
  permanentRedirect(`/managers`)

  return null;
}

