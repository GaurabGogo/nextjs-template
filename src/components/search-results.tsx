import { CalendarIcon, Star } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { SearchResult } from "@/lib/types"

interface SearchResultsProps {
  results: SearchResult[]
  viewMode: "grid" | "list"
}

export default function SearchResults({ results, viewMode }: SearchResultsProps) {
  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium text-gray-900 dark:text-white">No results found</h3>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Try adjusting your search or filter to find what you're looking for.
        </p>
      </div>
    )
  }

  if (viewMode === "list") {
    return (
      <div className="space-y-6">
        {results.map((result) => (
          <div key={result.id} className="border-b dark:border-gray-800 pb-6 last:border-0">
            <div className="mb-1">
              <a href={result.url} className="text-sm text-gray-600 dark:text-gray-400 hover:underline">
                {result.url}
              </a>
            </div>
            <h3 className="text-xl font-medium mb-1">
              <a href={result.url} className="text-blue-600 dark:text-blue-400 hover:underline">
                {result.title}
              </a>
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2">{result.description}</p>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4">
              <div className="flex items-center">
                <CalendarIcon className="mr-1 h-3 w-3" />
                {new Date(result.date).toLocaleDateString()}
              </div>
              <div className="flex items-center">
                <Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
                {result.popularity}
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {results.map((result) => (
        <Card key={result.id}>
          <CardHeader>
            <CardTitle className="text-lg">
              <a href={result.url} className="text-blue-600 dark:text-blue-400 hover:underline">
                {result.title}
              </a>
            </CardTitle>
            <CardDescription className="dark:text-gray-400">{result.url}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-300">{result.description}</p>
          </CardContent>
          <CardFooter className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center">
              <CalendarIcon className="mr-1 h-4 w-4" />
              {new Date(result.date).toLocaleDateString()}
            </div>
            <div className="flex items-center">
              <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
              {result.popularity}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
