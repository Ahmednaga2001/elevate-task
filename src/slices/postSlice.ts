import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Post {
  userId: number
  id: number
  title: string
  body: string
}

export interface PostState {
  posts: Post[]
}

const initialState: PostState = {
  posts: [],
}

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.posts = action.payload
    },
    addPost: (state, action: PayloadAction<Post>) => {
      const existingPost = state.posts.find(post => post.id === action.payload.id)
      if (!existingPost) {
        state.posts.push(action.payload)
      }
    },
    mergePosts: (state, action: PayloadAction<Post[]>) => {
      const existingIds = new Set(state.posts.map(post => post.id))
      const newPosts = action.payload.filter(post => !existingIds.has(post.id))
      state.posts = [...state.posts, ...newPosts]
    },
  },
})

export const { setPosts, addPost, mergePosts } = postSlice.actions  
export default postSlice.reducer