import type { DocumentNode, OperationVariables } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { useDebounce } from "./useDebounce";
import { useCallback, useState } from "react";

export interface UseSearchConfig<TData, TVariables extends OperationVariables> {
  /** GraphQL query document */
  queryDoc: DocumentNode;

  /** Function to build variables from the search query */
  buildVariables: (query: string) => TVariables;

  /** Debounce delay in milliseconds */
  debounceDelay?: number;

  /** Minimum query length to trigger search */
  minQueryLength?: number;

  /** Additional query options */
  queryOptions?: Partial<Omit<Parameters<typeof useQuery<TData, TVariables>>[1], "variables" | "skip">>;
}

export interface UseSearchReturn<TData, TVariables extends OperationVariables> {
  /** Current search query */
  query: string;
  /** Debounced search query */
  debouncedQuery: string;
  /** Function to update the search query */
  setQuery: (query: string) => void;
  /** Whether the popover/results should be open */
  isOpen: boolean;
  /** Function to control popover visibility */
  setIsOpen: (isOpen: boolean) => void;
  /** Apollo useQuery result containing search data and states */
  queryResult: ReturnType<typeof useQuery<TData, TVariables>>;
  /** Helper to check if search is active and loading */
  isSearching: boolean;
  /** Helper to check if there are results */
  hasResults: boolean;
  /** Function to clear the search */
  clearSearch: () => void;
}

export function useSearch<TData, TVariables extends OperationVariables>({
  queryDoc,
  buildVariables,
  debounceDelay = 300,
  minQueryLength = 1,
  queryOptions,
}: UseSearchConfig<TData, TVariables>): UseSearchReturn<TData, TVariables> {
  const [query, setQuery] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  const debouncedQuery = useDebounce(query, debounceDelay);

  const shouldSearch = debouncedQuery.length >= minQueryLength;

  // Búsqueda de datos
  const queryResult = useQuery<TData, TVariables>(queryDoc, {
    variables: buildVariables(debouncedQuery),
    skip: !shouldSearch,
    ...queryOptions,
  });

  const isSearching = shouldSearch && queryResult.loading;

  const hasResults = Boolean(
    queryResult.data &&
    (Array.isArray(queryResult.data)
      ? queryResult.data.length > 0
      : true)
  );

  const clearSearch = useCallback(() => {
    setQuery("");
    setIsOpen(false);
  }, []);

  return {
    query,
    debouncedQuery,
    setQuery,
    isOpen,
    setIsOpen,
    queryResult,
    isSearching,
    hasResults,
    clearSearch,
  };
}
