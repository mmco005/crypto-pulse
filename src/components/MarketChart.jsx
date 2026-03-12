import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useCrypto } from '../context/CryptoContext';

const MarketChart = () => {
  const { coins } = useCrypto();
  
  const chartData = coins.slice(0, 10).map(coin => ({
    name: coin.symbol.toUpperCase(),
    price: coin.current_price
  }));

  return (
    <div className="h-96 w-full p-6 bg-gray-900/40 backdrop-blur-xl rounded-3xl border border-red-900/30 shadow-2xl relative overflow-hidden">
      {/* Decorative Red Glow */}
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-red-600/10 blur-[100px] rounded-full"></div>
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-red-100 font-bold uppercase tracking-widest text-sm flex items-center gap-2">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
          Market Analysis Index
        </h2>
      </div>

      <ResponsiveContainer>
        <LineChart data={chartData}>
          <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#331111" vertical={false} />
          <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis hide domain={['auto', 'auto']} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1a0505', border: '1px solid #7f1d1d', borderRadius: '12px', color: '#fff' }}
            itemStyle={{ color: '#ef4444' }}
          />
          <Line 
            type="monotone" 
            dataKey="price" 
            stroke="#ef4444" 
            strokeWidth={4} 
            dot={{ fill: '#ef4444', r: 5, strokeWidth: 2, stroke: '#1a0505' }}
            activeDot={{ r: 8, fill: '#fff' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MarketChart;