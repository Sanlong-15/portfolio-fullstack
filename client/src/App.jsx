import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import HomePage from './pages/HomePage.jsx'
import ProjectsPage from './pages/ProjectsPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import AdminPage from './pages/AdminPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import useScrollReveal from './hooks/useScrollReveal.js'

export default function App() {
  const location = useLocation()
  // Re-scan for ".reveal" elements each time the route changes.
  useScrollReveal(location.pathname)

  return (
    <div className="app-shell">
      <ScrollProgress />
      <Navbar />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
