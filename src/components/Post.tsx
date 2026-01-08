import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Plus, Search } from "lucide-react";
import type { RootState } from "../store";
import { usePosts } from "../hooks/usePosts";
import Pagination from "./ui/Pagination";

const AUTHORS = [
  { id: 1, name: "Author 1" },
  { id: 2, name: "Author 2" },
  { id: 3, name: "Author 3" }
] as const;

const Post = () => {
  const { posts } = useSelector((state: RootState) => state.post);
  const { loading, error } = usePosts();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(0);

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = !searchQuery.trim() || post.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAuthor = !selectedAuthor || post.userId === parseInt(selectedAuthor, 10);
    return matchesSearch && matchesAuthor;
  });

  const pageCount = Math.ceil(filteredPosts.length / 10);
  const startIndex = currentPage * 10;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + 10);

  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  useEffect(() => {
    setCurrentPage(0);
  }, [searchQuery, selectedAuthor]);

  if (loading) return (
    <div 
      className="p-3 sm:p-4 text-sm sm:text-base text-black"
      role="status"
      aria-live="polite"
      aria-label="Loading posts"
    >
      Loading posts...
    </div>
  );
  if (error) return (
    <div 
      className="p-3 sm:p-4 text-sm sm:text-base text-red-500"
      role="alert"
      aria-live="assertive"
      aria-label="Error loading posts"
    >
      Error: {error}
    </div>
  );

  return (
    <section className="mt-3 sm:mt-4 md:mt-5 lg:mt-6 overflow-hidden rounded-xl sm:rounded-2xl bg-white/50 backdrop-blur-sm" aria-labelledby="post-list-heading">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 bg-white px-3 sm:px-4 py-3 sm:py-4 lg:py-[18px]">
        <div className="flex items-center gap-2 sm:gap-2.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            className="sm:w-6 sm:h-6 lg:w-7 lg:h-7"
            viewBox="0 0 28 28"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M17.5 14H11.6667M17.5 9.33333H11.6667M22.1667 19.8333V5.83333C22.1667 5.21449 21.9208 4.621 21.4832 4.18342C21.0457 3.74583 20.4522 3.5 19.8333 3.5H4.66666M4.66666 3.5C5.2855 3.5 5.87899 3.74583 6.31658 4.18342C6.75416 4.621 6.99999 5.21449 6.99999 5.83333V22.1667C6.99999 22.7855 7.24583 23.379 7.68341 23.8166C8.121 24.2542 8.71449 24.5 9.33333 24.5M4.66666 3.5C4.04782 3.5 3.45433 3.74583 3.01675 4.18342C2.57916 4.621 2.33333 5.21449 2.33333 5.83333V8.16667C2.33333 8.47609 2.45624 8.77283 2.67504 8.99162C2.89383 9.21042 3.19058 9.33333 3.49999 9.33333H6.99999M9.33333 24.5H23.3333C23.9522 24.5 24.5457 24.2542 24.9832 23.8166C25.4208 23.379 25.6667 22.7855 25.6667 22.1667V21C25.6667 20.6906 25.5437 20.3938 25.325 20.175C25.1062 19.9562 24.8094 19.8333 24.5 19.8333H12.8333C12.5239 19.8333 12.2272 19.9562 12.0084 20.175C11.7896 20.3938 11.6667 20.6906 11.6667 21V22.1667C11.6667 22.7855 11.4208 23.379 10.9832 23.8166C10.5457 24.2542 9.95217 24.5 9.33333 24.5Z"
              stroke="black"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h1 id="post-list-heading" className="text-lg sm:text-xl font-semibold text-black">Post List</h1>
        </div>
        <Link
          to="/posts/create"
          className="flex items-center gap-1.5 cursor-pointer hover:opacity-70 transition-opacity text-sm sm:text-base text-[#000000] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded"
          aria-label="Create a new post"
        >
          <Plus size={16} className="sm:w-[18px] sm:h-[18px] text-black" aria-hidden="true" />
          <span className="text-black">Create a new post</span>
        </Link>
      </div>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 sm:gap-4 lg:gap-10 border border-black/15 bg-black/10 px-3 sm:px-4 py-3 sm:py-4 lg:py-[18px]">
        <div className="flex w-full items-center gap-2 sm:gap-2.5 rounded-full bg-white p-3 sm:p-4 backdrop-blur-sm">
          <label htmlFor="search-input" className="sr-only">Search for a post</label>
          <Search size={16} className="sm:w-[18px] sm:h-[18px] shrink-0 text-black" aria-hidden="true" />
          <input
            id="search-input"
            type="search"
            placeholder="Search for a post..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-sm sm:text-base text-black outline-none border-none placeholder:text-[#00000080]/50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
            aria-label="Search for a post"
          />
        </div>
        <div className="flex items-center gap-2 sm:gap-2.5 w-full lg:w-auto">
          <label htmlFor="author-filter" className="text-sm sm:text-base text-[#1A1A1A] whitespace-nowrap">Author:</label>
          <select
            id="author-filter"
            value={selectedAuthor}
            onChange={(e) => setSelectedAuthor(e.target.value)}
            className="flex-1 lg:flex-initial bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 text-sm sm:text-base text-black border-none outline-none cursor-pointer focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Filter posts by author"
          >
            <option value="">All Authors</option>
            {AUTHORS.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        {filteredPosts.length === 0 ? (
          <div 
            className="border border-black/15 px-3 sm:px-4 py-3 sm:py-4 lg:py-[18px] text-sm sm:text-base text-black"
            role="status"
            aria-live="polite"
          >
            {posts.length === 0 ? "No posts available" : "No posts found"}
          </div>
        ) : (
          <>
            <ul className="list-none" role="list">
              {paginatedPosts.map((post) => (
                <li key={post.id}>
                  <Link
                    to={`/posts/${post.id}`}
                    className="block border border-black/15 px-3 sm:px-4 py-3 sm:py-4 lg:py-[18px] text-sm sm:text-base text-black hover:bg-white/80 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    aria-label={`View post: ${post.title}`}
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
            {pageCount > 1 && (
              <nav aria-label="Posts pagination">
                <Pagination
                  pageCount={pageCount}
                  onPageChange={handlePageChange}
                  currentPage={currentPage}
                />
              </nav>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Post;
