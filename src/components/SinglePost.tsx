import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, User } from "lucide-react";
import axios from "axios";
import type { Post } from "../hooks/usePosts";

const SinglePost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get<Post>(
          `https://jsonplaceholder.typicode.com/posts/${id}`
        );
        setPost(response.data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An error occurred while fetching post"
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  if (loading) {
    return (
      <div 
        className="mt-6 rounded-2xl bg-white/50 backdrop-blur-sm p-8 text-center"
        role="status"
        aria-live="polite"
        aria-label="Loading post"
      >
        <div className="text-base text-black">Loading post...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div 
        className="mt-6 rounded-2xl bg-white/50 backdrop-blur-sm p-8"
        role="alert"
        aria-live="assertive"
        aria-label="Error loading post"
      >
        <div className="text-base text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div 
        className="mt-6 rounded-2xl bg-white/50 backdrop-blur-sm p-8"
        role="status"
        aria-live="polite"
      >
        <div className="text-base text-black">Post not found</div>
      </div>
    );
  }

  return (
    <article className="overflow-hidden rounded-2xl mt-6">
      <div className="min-h-103 p-6 flex flex-col justify-end bg-gradient-to-t from-[rgba(33,96,154,0.75)] to-[rgba(0,37,74,0.75)] gap-4">
        <button
          className="flex bg-white/75 p-2.5 rounded-full h-10 w-fit items-center gap-1.5 text-center justify-center text-[#1A1A1A] text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
          onClick={() => navigate("/")}
          aria-label="Back to posts list"
        >
          <ArrowLeft size={16} className="shrink-0" aria-hidden="true" />
          <span>Back to Posts</span>
        </button>
        <h1 className="text-white md:text-4xl sm:text-3xl text-2xl font-semibold max-w-268.5">
          {post.title}
        </h1>
        <div className="flex flex-row items-center flex-wrap gap-6" role="group" aria-label="Post metadata">
          <div className="flex items-center gap-1.5">
            <User size={18} className="shrink-0 text-white/50" aria-hidden="true" />
            <span className="text-sm text-white">
              <span className="sr-only">Author: </span>
              Leanne Graham
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar size={18} className="shrink-0 text-white/50" aria-hidden="true" />
            <time className="text-sm text-white" dateTime="2025-08-24">
              <span className="sr-only">Published on: </span>
              Sun, August 24th, 2025
            </time>
          </div>
        </div>
      </div>
      <div className="bg-white/50 backdrop-blur-sm p-6 min-h-122.5">
        <p className="text-black max-w-114">{post.body}</p>
      </div>
    </article>
  );
};

export default SinglePost;