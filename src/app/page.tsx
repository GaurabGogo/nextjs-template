"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeColorToggle } from "@/components/theme-color-toggle";
import { ThemeToggle } from "@/components/theme-toggle";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      <header className="w-full p-4 flex justify-end">
        <ThemeColorToggle />
        <ThemeToggle />
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md mx-auto flex flex-col items-center">
          {/* Logo */}
          <div className="mb-8 text-center">
            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500">
              Search
            </h1>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="w-full">
            <div className="relative w-full mb-6">
              <Input
                type="text"
                placeholder="Search the web"
                className="w-full py-6 pl-12 pr-4 rounded-full border border-gray-300 dark:border-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>

            <div className="flex justify-center">
              <Button
                type="submit"
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200"
                variant="outline"
              >
                Search
              </Button>
            </div>
          </form>
        </div>
      </main>

      <footer className="w-full p-4 border-t dark:border-gray-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 dark:text-gray-400">
          <div className="mb-2 md:mb-0">© 2025 Search</div>
          <div className="flex space-x-4">
            <a href="#" className="hover:underline">
              Privacy
            </a>
            <a href="#" className="hover:underline">
              Terms
            </a>
            <a href="#" className="hover:underline">
              Settings
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
