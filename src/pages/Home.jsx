import { useEffect, useRef } from 'react';
import { useCrypto } from '../context/CryptoContext';
import { useFetchCrypto } from '../hooks/useFetchCrypto';
import MarketChart from '../components/MarketChart';

const Home = () => {
  const { coins, search, setSearch, currency, setCurrency } = useCrypto();
  const { loading, error } = useFetchCrypto();
  
  // Requirement: The "Laser Pointer" (useRef for auto-focus) [cite: 336]
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Requirement: Loading State (Visible spinner) [cite: 333]
  if (loading) return (
    <div className="flex flex-col items-center justify-center h-[60vh] bg-gray-950">
      <div className="w-16 h-16 border-4 border-red-900 border-t-red-500 rounded-full animate-spin"></div>
      <p className="mt-6 text-red-500 font-mono tracking-widest animate-pulse">SCANNING BLOCKCHAIN...</p>
    </div>
  );

  if (error && coins.length === 0) return <div className="p-10 text-red-500 text-center">Error: {error}</div>;

  // Requirement: Controlled Forms (Real-time filtering) [cite: 337]
  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Search and Currency Controls */}
      <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search markets..."
          className="p-4 w-full md:max-w-md rounded-2xl bg-gray-900 text-white border-2 border-red-900/30 focus:border-red-500 outline-none transition-all shadow-xl"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Global State Switcher [cite: 334] */}
        <select
          className="bg-red-700 hover:bg-red-600 text-white p-4 rounded-2xl font-bold shadow-lg transition-all border-none cursor-pointer"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          <option value="usd">USD ($)</option>
          <option value="eur">EUR (€)</option>
          <option value="php">PHP (₱)</option>
        </select>
      </div>

      {/* Requirement: Data Visualization [cite: 331] */}
      <MarketChart />

      {/* Requirement: Responsive Grid & State-Based Styling [cite: 330, 332] */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {filteredCoins.map(coin => (
          <div key={coin.id} className="p-6 bg-gray-900/80 rounded-3xl border border-red-900/20 hover:border-red-500/50 transition-all flex items-center gap-5">
            <img src={coin.image} alt={coin.name} className="w-12 h-12 rounded-full" />
            <div className="flex-1">
              <h3 className="text-white font-bold">{coin.name}</h3>
              <p className="text-xs text-gray-500 uppercase">{coin.symbol}</p>
            </div>
            <div className="text-right">
              <p className="text-white font-mono font-bold">
                {currency.toUpperCase()} {coin.current_price?.toLocaleString()}
              </p>
              <p className={`text-sm font-bold ${coin.price_change_percentage_24h > 0 ? 'text-green-400' : 'text-red-500'}`}>
                {coin.price_change_percentage_24h > 0 ? '▲' : '▼'} {Math.abs(coin.price_change_percentage_24h || 0).toFixed(2)}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;