import { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import Image from "next/image";
import { getSearchedProducts } from "@/lib/actions/actions";

interface SearchBarProps {
  query: string;
  setQuery: (query: string) => void;
  searchResults: ProductType[];
  setSearchResults: (results: ProductType[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  query,
  setQuery,
  searchResults,
  setSearchResults,
}) => {
  const router = useRouter();
  const searchResultsRef = useRef<HTMLDivElement>(null);

  const handleSearch = async (value: string) => {
    setQuery(value);
    if (value.trim() === "") {
      setSearchResults([]);
      return;
    }

    try {
      const results = await getSearchedProducts(value);
      setSearchResults(results);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResults([]);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      router.push(`/search/${query}`);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchResultsRef.current &&
        !searchResultsRef.current.contains(event.target as Node)
      ) {
        setSearchResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const highlightText = (text: string, query: string) => {
    if (!query) {
      return text;
    }

    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <span key={index} className="highlight">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <div className="relative md:flex gap-3 border border-gray-400 mx-4 px-3 py-1 items-center rounded-lg hidden">
      <input
        className="outline-none max-sm:max-w-[120px] border-r border-gray-300"
        placeholder="Search..."
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        disabled={query === ""}
        onClick={() => router.push(`/search/${query}`)}
      >
        <Search className="cursor-pointer hover:text-red-1" />
      </button>
      {searchResults.length > 0 && (
        <div
          className="absolute top-8 left-0 mt-2 bg-white border border-gray-300 rounded-lg w-full max-w-[300px] shadow-xl z-10 overflow-hidden"
          ref={searchResultsRef}
        >
          <ul>
            {searchResults.slice(0, 6).map((result) => (
              <li
                key={result._id}
                className="flex items-center justify-start gap-2 px-4 py-2 hover:bg-red-5 hover:underline hover:text-red-6 cursor-pointer"
                onClick={() => {
                  router.push(`/products/${result._id}`);
                  setSearchResults([]);
                  setQuery("");
                }}
              >
                <Image
                  src={result.media[0]}
                  alt={result.title}
                  width={50}
                  height={50}
                  className="h-[50px] bg-white object-cover rounded-md"
                />
                <div>
                  <p className="two-line-truncate">
                    {highlightText(result.title, query)}
                  </p>
                </div>
              </li>
            ))}
            {searchResults.length > 6 && (
              <li
                className="flex items-center justify-start gap-2 px-4 py-1 underline bg-red-2 hover:bg-red-5 hover:text-red-6 cursor-pointer"
                onClick={() => router.push(`/search/${query}`)}
              >
                <p>See All {searchResults.length} Products</p>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
