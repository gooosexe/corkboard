import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from './HomePage'
import PostForm from './PostForm'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/post" element={<PostForm />} />
      </Routes>
    </Router>
  )
}

export default App
