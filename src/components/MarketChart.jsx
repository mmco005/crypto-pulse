import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area, AreaChart } from 'recharts';
import { useCrypto } from '../context/CryptoContext';

const MarketChart = () => {
  const { coins } = useCrypto();
  
  const chartData = coins.slice(0, 10).map(coin => ({
    name: coin.symbol.toUpperCase(),
    price: coin.current_price
  }));

  return (
    <div className="h-96 w-full p-6 bg-gray-900/50 backdrop-blur-md rounded-2xl border border-red-900/20 shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-gray-400 font-semibold uppercase tracking-widest text-sm">Market Volatility Index</h2>
        <div className="flex gap-2">
           <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
           <span className="text-xs text-red-500 font-bold">LIVE DATA</span>
        </div>
      </div>
      <ResponsiveContainer>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#331111" vertical={false} />
          <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis hide domain={['auto', 'auto']} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1a0505', border: '1px solid #7f1d1d', borderRadius: '8px' }}
            itemStyle={{ color: '#ef4444' }}
          />
          <Line 
            type="monotone" 
            dataKey="price" 
            stroke="#ef4444" 
            strokeWidth={4} 
            dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }} 
            activeDot={{ r: 8, stroke: '#fff' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MarketChart;