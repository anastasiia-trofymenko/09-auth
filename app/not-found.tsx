// app/not-found.tsx
import { Metadata } from "next";
import css from "./Home.module.css";

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

const NotFound = () => {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;
