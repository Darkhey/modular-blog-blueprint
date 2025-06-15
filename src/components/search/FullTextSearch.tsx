
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Loader2 } from "lucide-react";
import { BlogPost } from "@/hooks/useBlogPosts";
import BlogCard from "@/components/blog/BlogCard";

interface SearchResult extends BlogPost {
  highlight?: string;
  relevance_score?: number;
}

const FullTextSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  useEffect(() => {
    // Load search history from localStorage
    const history = localStorage.getItem('searchHistory');
    if (history) {
      setSearchHistory(JSON.parse(history));
    }
  }, []);

  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    
    // Full-text search using PostgreSQL's text search capabilities
    const { data, error } = await supabase
      .from("blog_posts")
      .select(`
        *,
        blog_authors(name),
        blog_post_tags (
          tag_id,
          blog_tags (
            id,
            slug,
            name
          )
        )
      `)
      .eq('status', 'published')
      .or(`title.ilike.%${searchQuery}%,content.ilike.%${searchQuery}%,excerpt.ilike.%${searchQuery}%,keywords.cs.{${searchQuery}}`)
      .order('published_at', { ascending: false })
      .limit(20);

    if (!error && data) {
      const searchResults = data.map(post => ({
        ...post,
        relevance_score: calculateRelevanceScore(post, searchQuery),
        highlight: generateHighlight(post, searchQuery)
      })).sort((a, b) => (b.relevance_score || 0) - (a.relevance_score || 0));
      
      setResults(searchResults);
      
      // Update search history
      const newHistory = [searchQuery, ...searchHistory.filter(h => h !== searchQuery)].slice(0, 5);
      setSearchHistory(newHistory);
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
    }
    
    setLoading(false);
  };

  const calculateRelevanceScore = (post: any, query: string): number => {
    let score = 0;
    const lowerQuery = query.toLowerCase();
    
    // Title matches have highest weight
    if (post.title.toLowerCase().includes(lowerQuery)) score += 10;
    
    // Excerpt matches
    if (post.excerpt.toLowerCase().includes(lowerQuery)) score += 5;
    
    // Content matches
    if (post.content.toLowerCase().includes(lowerQuery)) score += 2;
    
    // Keywords match
    if (post.keywords?.some((keyword: string) => keyword.toLowerCase().includes(lowerQuery))) score += 8;
    
    // Topic match
    if (post.topic.toLowerCase().includes(lowerQuery)) score += 6;
    
    return score;
  };

  const generateHighlight = (post: any, query: string): string => {
    const text = post.excerpt || post.content.substring(0, 200);
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(query);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Artikel, Themen oder Schlüsselwörter suchen..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Suchen"}
            </Button>
          </form>
          
          {searchHistory.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-gray-500 mb-2">Letzte Suchen:</p>
              <div className="flex flex-wrap gap-2">
                {searchHistory.map((term, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setQuery(term);
                      performSearch(term);
                    }}
                    className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {results.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">
            {results.length} Ergebnisse für "{query}"
          </h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {results.map(post => (
              <div key={post.id} className="relative">
                <BlogCard post={post} />
                {post.highlight && (
                  <div 
                    className="mt-2 text-sm text-gray-600"
                    dangerouslySetInnerHTML={{ __html: post.highlight }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {query && results.length === 0 && !loading && (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-gray-500">Keine Ergebnisse für "{query}" gefunden.</p>
            <p className="text-sm text-gray-400 mt-2">
              Versuchen Sie andere Suchbegriffe oder schauen Sie sich unsere beliebten Artikel an.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FullTextSearch;
