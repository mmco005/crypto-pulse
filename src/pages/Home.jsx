import { useEffect, useRef } from 'react';
import { useCrypto } from '../context/CryptoContext';
import { useFetchCrypto } from '../hooks/useFetchCrypto';
import MarketChart from '../components/MarketChart';

const Home = () => {
  const { coins, search, setSearch } = useCrypto();
  const { loading, error } = useFetchCrypto();
  const inputRef = useRef(null);

  useEffect(() => {
    // Automatically focus the search input on load (the "Laser Pointer")
    inputRef.current?.focus();
  }, []);

  if (loading) return <div className="p-10 text-white">Scanning Blockchain...</div>;
  if (error) return <div className="p-10 text-red-500">{error}</div>;

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 bg-gray-900 min-h-screen">
      <input
        ref={inputRef}
        type="text"
        placeholder="Search Coins..."
        className="p-3 w-full max-w-md rounded bg-gray-700 text-white border border-gray-600 mb-6"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      
      <MarketChart />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {filteredCoins.map(coin => (
          <div key={coin.id} className="p-4 bg-gray-800 rounded-lg flex justify-between">
            <span className="text-white font-bold">{coin.name}</span>
            <span className={coin.price_change_percentage_24h > 0 ? 'text-green-400' : 'text-red-400'}>
              ${coin.current_price.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;