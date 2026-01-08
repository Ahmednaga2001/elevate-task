import { Routes, Route } from "react-router-dom"
import Post from "./components/Post"
import SinglePost from "./components/SinglePost"
import CreatePost from "./components/CreatePost"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Post />} />
      <Route path="/posts/:id" element={<SinglePost />} />
      <Route path="/posts/create" element={<CreatePost />} />
    </Routes>
  )
}

export default App
