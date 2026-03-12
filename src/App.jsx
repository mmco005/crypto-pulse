import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { CryptoProvider } from './context/CryptoContext';
import Home from './pages/Home';
import Analysis from './pages/Analysis';

function App() {
  return (
    <CryptoProvider>
      <Router>
        <nav className="p-5 bg-gradient-to-r from-red-900 to-red-800 text-white flex justify-between shadow-lg">
          <h1 className="text-xl font-bold tracking-widest">CRYPTO-PULSE</h1>
          <div className="flex gap-6">
            <Link to="/" className="hover:text-red-400 transition-colors duration-300">Market</Link>
            <Link to="/analysis" className="hover:text-red-400 transition-colors duration-300">Analysis</Link>
          </div>
        </nav>
        <main className="flex-1 flex justify-center items-center min-h-[calc(100vh-80px)] bg-gray-900">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/analysis" element={<Analysis />} />
          </Routes>
        </main>
      </Router>
    </CryptoProvider>
  );
}

export default App;