// app/notes/[id]/page.tsx

import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/api";
import NoteDetailsClient from "./NoteDetails.client";
import { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

async function getNote(id: string) {
  const res = await fetch(`https://api.example.com/notes/${id}`);
  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).id;
  const note = await getNote(id);

  const title = note ? `${note.title} | NoteHub` : "Note not found";
  const description = note ? note.content.substring(0, 160) : "Notes Details";
  const url = `https://08-zustand-weld-delta.vercel.app/${id}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: "NoteHub",
      images: [
        {
          url: "https://ac.goit.global",
          width: 1200,
          height: 630,
          alt: note?.title || "NoteHub Detail",
        },
      ],
      type: "article",
    },
  };
}

interface NoteDetailsPageProps {
  params: { id: string };
}

const NoteDetails = async ({ params }: NoteDetailsPageProps) => {
  // const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", params.id],
    queryFn: () => fetchNoteById(params.id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
};

export default NoteDetails;
