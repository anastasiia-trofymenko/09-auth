// app/not-found.tsx
import { Metadata } from "next";
import NotFound from "@/components/NotFound/NotFound";

export const metadata: Metadata = {
  title: "Page not found | NoteHub",
  description:
    "Unfortunately, the page you are looking for does not exist or has been moved.",

  openGraph: {
    title: "404 - Page not found",
    description: "Unfortunately, we couldn't find what you were looking for.",
    url: "https://08-zustand-weld-delta.vercel.app/",
    images: [
      {
        url: "https://ac.goit.global",
        width: 1200,
        height: 630,
        alt: "NoteHub 404 Error",
      },
    ],
  },
};

export default function NotFoundPage() {
  return <NotFound />;
}
