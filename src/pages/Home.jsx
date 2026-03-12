import { useEffect, useRef } from 'react';
import { useCrypto } from '../context/CryptoContext';
import { useFetchCrypto } from '../hooks/useFetchCrypto';
import MarketChart from '../components/MarketChart';

const Home = () => {
  const { coins, search, setSearch, currency, setCurrency } = useCrypto();
  const { loading, error } = useFetchCrypto();
  const inputRef = useRef(null);

  // Requirement: The "Laser Pointer" (Auto-focus)
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-[60vh]">
      <div className="w-12 h-12 border-4 border-red-900 border-t-red-500 rounded-full animate-spin"></div>
      <p className="mt-4 text-red-500 font-mono tracking-widest animate-pulse">SCANNING BLOCKCHAIN...</p>
    </div>
  );

  if (error) return <div className="p-10 text-red-500 text-center">Error: {error}</div>;

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search markets..."
          className="p-4 w-full md:max-w-md rounded-xl bg-gray-900 text-white border border-red-900/30 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all shadow-inner"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        
        {/* Requirement: Global State Currency Switch */}
        <select 
          className="bg-red-900 text-white p-4 rounded-xl font-bold outline-none cursor-pointer hover:bg-red-800 transition-colors"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          <option value="usd">USD ($)</option>
          <option value="eur">EUR (€)</option>
          <option value="php">PHP (₱)</option>
        </select>
      </div>

      <MarketChart />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        {filteredCoins.map(coin => (
          <div key={coin.id} className="p-5 bg-gray-900 rounded-2xl border border-red-900/10 hover:border-red-500/50 transition-all group flex items-center gap-4">
            <img src={coin.image} alt={coin.name} className="w-10 h-10 rounded-full grayscale group-hover:grayscale-0 transition-all" />
            <div className="flex-1">
              <h3 className="text-white font-bold">{coin.name}</h3>
              <p className="text-xs text-gray-500 uppercase">{coin.symbol}</p>
            </div>
            <div className="text-right">
              <p className="text-white font-mono font-bold">${coin.current_price.toLocaleString()}</p>
              <p className={`text-xs font-bold ${coin.price_change_percentage_24h > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {coin.price_change_percentage_24h > 0 ? '▲' : '▼'} {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;