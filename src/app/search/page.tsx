"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Grid2X2, List, ArrowUpDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SearchResults from "@/components/search-results";
import { mockSearchResults } from "@/lib/mock-data";
import { ThemeToggle } from "@/components/theme-toggle";

type SortOption = "relevance" | "date" | "popularity";
type ViewMode = "grid" | "list";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(query);

  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [sortBy, setSortBy] = useState<SortOption>("relevance");
  const [results, setResults] = useState(mockSearchResults);

  useEffect(() => {
    // In a real app, this would be an API call
    // For now, we'll just filter the mock data
    let filteredResults = [...mockSearchResults];

    if (query) {
      filteredResults = filteredResults.filter(
        (result) =>
          result.title.toLowerCase().includes(query.toLowerCase()) ||
          result.description.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Sort results based on selected option
    if (sortBy === "date") {
      filteredResults.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    } else if (sortBy === "popularity") {
      filteredResults.sort((a, b) => b.popularity - a.popularity);
    }

    setResults(filteredResults);
  }, [query, sortBy]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <header className="border-b dark:border-gray-800 py-4 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-4">
          <h1
            onClick={() => router.push("/")}
            className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500 cursor-pointer mr-6"
          >
            Search
          </h1>

          <div className="w-full flex gap-4 items-center">
            <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search the web"
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 dark:border-gray-700"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </form>
            <div className="ml-auto">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto py-6 px-6">
        <div className="mb-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            About {results.length} results for "{query}"
          </p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("list")}
              aria-label="List view"
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("grid")}
              aria-label="Grid view"
            >
              <Grid2X2 className="h-4 w-4" />
            </Button>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowUpDown className="h-4 w-4" />
                Sort by: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSortBy("relevance")}>
                Relevance
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("date")}>
                Date
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("popularity")}>
                Popularity
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <SearchResults results={results} viewMode={viewMode} />
      </div>
    </div>
  );
}
