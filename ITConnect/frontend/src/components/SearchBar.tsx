import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { searchService } from '../services/search.service';

export function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      const [developers, companies] = await Promise.all([
        searchService.searchDevelopers(query),
        searchService.searchCompanies(query)
      ]);

      setResults([...developers, ...companies]);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSearch} className="relative flex items-center">
        <Input
          type="text"
          placeholder="Search for developers, companies, or skills..."
          className="w-full pr-12 bg-ivory border-none focus:ring-2 focus:ring-charcoal/20"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button
          type="submit"
          variant="ghost"
          size="icon"
          className="absolute right-2"
          disabled={isLoading}
        >
          <Search className="w-5 h-5 text-stone" />
        </Button>
      </form>

      {results.length > 0 && (
        <div className="mt-4 bg-ivory rounded-lg shadow-lg p-4 max-h-96 overflow-y-auto">
          {results.map((result, index) => (
            <div
              key={index}
              className="p-4 hover:bg-cream rounded-lg cursor-pointer transition-colors"
            >
              <h3 className="font-semibold text-charcoal">
                {result.name || `${result.firstName} ${result.lastName}`}
              </h3>
              <p className="text-stone text-sm">
                {result.industry || result.skills?.join(', ')}
              </p>
              <p className="text-stone text-sm">{result.location}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 