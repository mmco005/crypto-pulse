import { useState, useEffect } from 'react';
import { useCrypto } from '../context/CryptoContext';

// Fallback data in case the API rate limit is reached
const FALLBACK_DATA = [
  { id: 'bitcoin', name: 'Bitcoin', symbol: 'btc', current_price: 65000, price_change_percentage_24h: 2.5, image: '' },
  { id: 'ethereum', name: 'Ethereum', symbol: 'eth', current_price: 3500, price_change_percentage_24h: -1.2, image: '' },
  { id: 'solana', name: 'Solana', symbol: 'sol', current_price: 145, price_change_percentage_24h: 5.4, image: '' },
];

export const useFetchCrypto = () => {
  const { setCoins, currency } = useCrypto();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMarket = async () => {
      setLoading(true);
      try {
        const res = await fetch(
        `https://cors-anywhere.herokuapp.com/https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=10&page=1`)
        
        if (!res.ok) throw new Error("API Rate Limit Reached");
        
        const data = await res.json();
        setCoins(data);
        setError(null);
      } catch (err) {
        console.warn("Using fallback data due to API error");
        setCoins(FALLBACK_DATA); // Use fallback so the UI doesn't break
        setError("API Limit Reached - Showing Offline Data");
      } finally {
        setTimeout(() => setLoading(false), 800); // UI Requirement: Visible loading state
      }
    };
    fetchMarket();
  }, [setCoins, currency]); // Re-fetch when currency changes (Global State requirement)

  return { loading, error };
};