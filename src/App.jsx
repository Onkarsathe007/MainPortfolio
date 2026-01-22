import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import HomePage from "./pages/HomePage.jsx"
import BlogsPage from "./pages/BlogsPage.jsx"

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blogs" element={<BlogsPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
