import { createContext, useState, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const CryptoContext = createContext();

export const CryptoProvider = ({ children }) => {
  const [coins, setCoins] = useState([]);
  const [currency, setCurrency] = useState('usd'); // State for currency switching
  const [search, setSearch] = useLocalStorage('crypto-search', ''); // Persistent search

  return (
    <CryptoContext.Provider value={{ coins, setCoins, currency, setCurrency, search, setSearch }}>
      {children}
    </CryptoContext.Provider>
  );
};

export const useCrypto = () => useContext(CryptoContext);