import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setPosts, mergePosts } from '../slices/postSlice'
import type { RootState } from '../store'

export interface Post {
  userId: number
  id: number
  title: string
  body: string
}

interface UsePostsReturn {
  posts: Post[]
  loading: boolean
  error: string | null
  refetch: () => void
}

const API_URL = 'https://jsonplaceholder.typicode.com/posts'

export const usePosts = (): UsePostsReturn => {
  const dispatch = useDispatch()
  const existingPosts = useSelector((state: RootState) => state.post.posts)
  const [posts, setPostsLocal] = useState<Post[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const hasFetchedRef = useRef<boolean>(false)
  const existingPostsRef = useRef<Post[]>(existingPosts)

  useEffect(() => {
    existingPostsRef.current = existingPosts
  }, [existingPosts])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await axios.get<Post[]>(API_URL)
      const fetchedPosts = response.data
      console.log("fetchedPosts" , fetchedPosts)
      setPostsLocal(fetchedPosts)
      
      const currentPosts = existingPostsRef.current
      if (currentPosts.length === 0) {
        dispatch(setPosts(fetchedPosts))
      } else {
        dispatch(mergePosts(fetchedPosts))
      }
      hasFetchedRef.current = true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching posts')
      setPostsLocal([])
      const currentPosts = existingPostsRef.current
      if (currentPosts.length === 0) {
        dispatch(setPosts([]))
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!hasFetchedRef.current && existingPosts.length === 0) {
      fetchPosts()
    } else {
      setLoading(false)
      hasFetchedRef.current = true
    }
  }, [])

  return {
    posts,
    loading,
    error,
    refetch: fetchPosts,
  }
}

