import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  TrendingUp,
  Wallet,
  Activity,
  Timer,
  Coins,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Shield,
  Bot,
  Target,
} from "lucide-react";

interface TokenMetricsProps {
  holders: number;
  priceChange: number;
  liquidity: number;
  volume24h: number;
  age: string;
  marketCap: number;
  transactions: number;
  buys: number;
  sells: number;
  snipers: number;
  botHolders: number;
  pumpProgress: number;
}

const MetricIcon = ({
  icon: Icon,
  color,
  tooltip,
  value,
}: {
  icon: React.ElementType;
  color: string;
  tooltip: string;
  value: string | number;
}) => (
  <motion.div className="relative group flex items-center gap-2">
    <div className={`p-1.5 rounded-lg ${color} bg-opacity-10 flex-shrink-0`}>
      <Icon className={`w-3.5 h-3.5 ${color}`} />
    </div>
    <span className="text-xs text-foreground-secondary truncate">{value}</span>
    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 mt-[-8px] px-2 py-1 bg-background-secondary/95 backdrop-blur-sm text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
      {tooltip}: {value}
    </div>
  </motion.div>
);

const TokenMetrics: React.FC<TokenMetricsProps> = ({
  holders,
  priceChange,
  liquidity,
  volume24h,
  age,
  marketCap,
  transactions,
  buys,
  sells,
  snipers,
  botHolders,
  pumpProgress,
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 py-3">
      <MetricIcon
        icon={Users}
        color="text-blue-500"
        tooltip="Holders"
        value={holders.toLocaleString()}
      />
      <MetricIcon
        icon={TrendingUp}
        color={priceChange >= 0 ? "text-green-500" : "text-red-500"}
        tooltip="Price Change"
        value={`${priceChange >= 0 ? "+" : ""}${priceChange}%`}
      />
      <MetricIcon
        icon={Coins}
        color="text-yellow-500"
        tooltip="Liquidity"
        value={`$${liquidity.toLocaleString()}`}
      />
      <MetricIcon
        icon={Activity}
        color="text-purple-500"
        tooltip="24h Volume"
        value={`$${volume24h.toLocaleString()}`}
      />
      <MetricIcon
        icon={Timer}
        color="text-orange-500"
        tooltip="Age"
        value={age}
      />
      <MetricIcon
        icon={Wallet}
        color="text-indigo-500"
        tooltip="Market Cap"
        value={`$${marketCap.toLocaleString()}`}
      />
      <MetricIcon
        icon={ArrowUpRight}
        color="text-green-500"
        tooltip="Transactions"
        value={transactions.toLocaleString()}
      />
      <MetricIcon
        icon={ArrowDownRight}
        color="text-red-500"
        tooltip="Sells"
        value={sells.toLocaleString()}
      />
      <MetricIcon
        icon={Zap}
        color="text-blue-500"
        tooltip="Buys"
        value={buys.toLocaleString()}
      />
      <MetricIcon
        icon={Target}
        color="text-yellow-500"
        tooltip="Snipers"
        value={snipers.toLocaleString()}
      />
      <MetricIcon
        icon={Bot}
        color="text-purple-500"
        tooltip="Bot Holders"
        value={botHolders.toLocaleString()}
      />
      <MetricIcon
        icon={Shield}
        color="text-green-500"
        tooltip="Pump Progress"
        value={`${pumpProgress}%`}
      />
    </div>
  );
};

export default TokenMetrics;
