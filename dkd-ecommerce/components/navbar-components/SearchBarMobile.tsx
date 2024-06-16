import React, { useRef, useEffect, useState } from "react";
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
  const [fullscreenSearch, setFullscreenSearch] = useState(false);

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
    if (event.key === "Enter"){
        router.push(`/search/${query}`)
    }
  }

  const clearSearch = () => {
    setQuery("");
    setSearchResults([]);
    setFullscreenSearch(false);
  };

  const handleSearchIconClick = () => {
    setFullscreenSearch(!fullscreenSearch);
    if (!fullscreenSearch) {
      setTimeout(() => {
        document.getElementById("search-input")?.focus();
      }, 0);
    }
  };

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
    <div className="relative flex items-center md:hidden">
      <button onClick={handleSearchIconClick}>
        <Search className="cursor-pointer h-5 w-5 hover:text-red-1" />
      </button>
      {fullscreenSearch && (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
          <div className="max-w-screen-sm w-full h-full p-4 border border-gray-300 shadow-xl">
            <div className="flex">
              <button className="text-red-1 px-4 py-2" onClick={clearSearch}>
                ✕
              </button>
              <div className="relative w-full flex items-center">
                <input
                  id="search-input"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
                  placeholder="Search..."
                  value={query}
                  onChange={(e) => handleSearch(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button
                  className="absolute top-0 right-0 px-3 py-3"
                  disabled={query === ""}
                  onClick={() => {
                    router.push(`/search/${query}`);
                    setFullscreenSearch(false);
                  }}
                >
                  <Search className="cursor-pointer h-4 w-4 hover:text-red-1" />
                </button>
              </div>
            </div>
            {searchResults.length > 0 && (
              <div
                ref={searchResultsRef}
                className="mt-2 bg-white border border-gray-300 rounded-lg w-full h-max overflow-y-auto shadow-xl"
              >
                <ul>
                  {searchResults.slice(0, 6).map((product: ProductType) => (
                    <li
                      key={product._id}
                      className="flex items-center justify-start gap-2 px-4 py-2 hover:bg-red-5 hover:underline hover:text-red-6 cursor-pointer"
                      onClick={() => {
                        router.push(`/products/${product._id}`);
                        setFullscreenSearch(false);
                      }}
                    >
                      <Image
                        src={product.media[0]}
                        alt="product"
                        width={50}
                        height={50}
                        className="h-[50px] bg-white object-cover rounded-md"
                      />
                      <p className="two-line-truncate">
                        {highlightText(product.title, query)}
                      </p>
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
        </div>
      )}
    </div>
  );
};

export default SearchBar;
