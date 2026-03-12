import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { CryptoProvider } from './context/CryptoContext';
import Home from './pages/Home';
import Analysis from './pages/Analysis';

function App() {
  return (
    <CryptoProvider>
      <Router>
        <div className="min-h-screen bg-gray-950 flex flex-col font-sans">
          {/* Fixed Navbar */}
          <nav className="fixed top-0 w-full z-50 p-4 bg-gradient-to-r from-red-950 via-red-900 to-red-800 text-white flex justify-between items-center shadow-2xl border-b border-red-700/30">
            <h1 className="text-xl font-black tracking-tighter flex items-center gap-2">
              <span className="bg-white text-red-900 px-2 py-0.5 rounded">PULSE</span>
              CRYPTO
            </h1>
            <div className="flex gap-8 font-medium">
              <Link to="/" className="hover:text-red-300 transition-all">Market</Link>
              <Link to="/analysis" className="hover:text-red-300 transition-all">Analysis</Link>
            </div>
          </nav>

          {/* Main Content Area */}
          <main className="mt-20 flex-1 px-4 md:px-10 pb-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/analysis" element={<Analysis />} />
            </Routes>
          </main>
        </div>
      </Router>
    </CryptoProvider>
  );
}

export default App;