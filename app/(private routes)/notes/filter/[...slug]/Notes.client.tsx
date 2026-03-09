"use client";

import css from "./NotesPage.module.css";
import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import Loader from "@/components/Loader/Loader";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchNotes } from "@/lib/api/clientApi";
import { useDebouncedCallback } from "use-debounce";
import Link from "next/link";
import { FetchTagNote } from "@/types/note";

interface NotesClientProps {
  tag: FetchTagNote;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const debouncedSetSearchQuery = useDebouncedCallback((value: string) => {
    setSearch(value);
  }, 500);

  const handleSearch = (value: string) => {
    setPage(1);
    debouncedSetSearchQuery(value);
  };

  const { data, isLoading, isError, isPlaceholderData } = useQuery({
    queryKey: ["notes", search, page, tag],
    queryFn: () => fetchNotes(tag, page, search),
    placeholderData: keepPreviousData,
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={handleSearch} />

        {data && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={page}
            onPageChange={(selected) => {
              if (!isPlaceholderData) {
                setPage(selected);
              }
            }}
          />
        )}
        <Link href="/notes/action/create" className={css.createButton}>
          Create note +
        </Link>
      </header>

      {isLoading && <Loader />}
      {isError && <p>Something went wrong. Please try again.</p>}

      {data?.notes && data.notes.length > 0 && <NoteList notes={data.notes} />}
    </div>
  );
}
