import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/api";
import { Metadata } from "next";

import NotesClient from "./Notes.client";
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
  const resolvedParams = await params;
  const queryClient = new QueryClient();
  const activeTag = resolvedParams.slug?.[0] || "all";
  const apiTag = activeTag === "all" ? "" : activeTag;

  await queryClient.prefetchQuery({
    queryKey: ["notes", "", 1, activeTag],
    queryFn: () => fetchNotes("", 1, apiTag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={activeTag} />
    </HydrationBoundary>
  );
}
