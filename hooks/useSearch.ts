"use client";

import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { search } from "@/lib/search/search";

export function useSearch(query: string) {
  const [debounced] = useDebounce(query, 250);

  return useQuery({
    queryKey: ["search", debounced],
    queryFn: () => search(debounced),
    enabled: debounced.length >= 2,
  });
}
