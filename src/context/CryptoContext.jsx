import { createContext, useState, useContext } from 'react';

const CryptoContext = createContext();

export const CryptoProvider = ({ children }) => {
  const [coins, setCoins] = useState([]);
  const [currency, setCurrency] = useState('USD');
  const [search, setSearch] = useState(''); // Added for Step VI (Home.jsx)

  return (
    <CryptoContext.Provider value={{ coins, setCoins, currency, setCurrency, search, setSearch }}>
      {children}
    </CryptoContext.Provider>
  );
};

export const useCrypto = () => useContext(CryptoContext);