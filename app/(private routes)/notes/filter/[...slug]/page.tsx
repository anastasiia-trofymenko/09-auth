import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/serverApi";
import { Metadata } from "next";

import NotesClient from "./Notes.client";
import { FetchTagNote } from "@/types/note";
export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const filterValue = slug.join(" / ");

  const title = `Filter: ${filterValue} | NoteHub`;
  const description = `Look up notes with filter: ${filterValue}. Find your notes quick and easy`;
  const url = `https://08-zustand-weld-delta.vercel.app/notes/filter/${slug.join("/")}`;

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
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `NoteHub Filter: ${filterValue}`,
        },
      ],
      locale: "uk_UA",
      type: "website",
    },
  };
}

export default async function NotesPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const queryClient = new QueryClient();

  const { slug } = await params;
  const tag = slug[0] as FetchTagNote;

  await queryClient.prefetchQuery({
    queryKey: ["notes", "", 1, tag],
    queryFn: () => fetchNotes(tag, 1, ""),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
