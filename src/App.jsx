import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

// Import your pages
import HomePage from "./pages/HomePage.jsx"
import BlogsPage from "./pages/BlogsPage.jsx"
import BlogDetailPage from "./pages/BlogDetailPage.jsx"
import AdminLoginPage from "./pages/AdminLoginPage.jsx"
import AdminEditorPage from "./pages/AdminEditorPage.jsx"
// import { JourneyPage } from "./pages/JourneyPage.jsx"

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blog/:id" element={<BlogDetailPage />} />
          <Route path="/admin" element={<AdminLoginPage />} />
          <Route path="/admin/editor" element={<AdminEditorPage />} />
          {/* <Route path="/journey" element={<JourneyPage />} /> */}
        </Routes>
      </div>
    </Router>
  )
}

export default App
