import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Gallery from './pages/Gallery';
import VideoGallery from './pages/VideoGallery';
import Contact from './pages/Contact';
import Licenses from './pages/Licenses';
import Associations from './pages/Associations';

// Admin components
import AdminLayout from './components/admin/AdminLayout';
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">
                <Home />
              </main>
              <Footer />
            </div>
          } />
          <Route path="/about" element={
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">
                <About />
              </main>
              <Footer />
            </div>
          } />
          <Route path="/gallery" element={
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">
                <Gallery />
              </main>
              <Footer />
            </div>
          } />
          <Route path="/videos" element={
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">
                <VideoGallery />
              </main>
              <Footer />
            </div>
          } />
          <Route path="/contact" element={
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">
                <Contact />
              </main>
              <Footer />
            </div>
          } />
          <Route path="/licenses" element={
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">
                <Licenses />
              </main>
              <Footer />
            </div>
          } />
          <Route path="/associations" element={
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">
                <Associations />
              </main>
              <Footer />
            </div>
          } />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/*" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            {/* More admin routes will be added here */}
          </Route>
        </Routes>
        <Toaster position="top-right" />
      </Router>
    </AuthProvider>
  );
}

export default App;
