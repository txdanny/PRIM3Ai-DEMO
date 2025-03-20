import React from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowDownRight,
  Copy,
  ExternalLink,
  Users,
  TrendingUp,
  DollarSign,
  Coins,
  Activity,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import TokenMetrics from "./TokenMetrics";
import type { Token } from "../types/token";
import QuickBuy from "./ui/QuickBuy";

interface TokenCardProps {
  token: Token;
}

const TokenCard: React.FC<TokenCardProps> = ({ token }) => {
  const input = document.querySelector<HTMLInputElement>(
    'input[type="number"]'
  );
  const quickBuyAmount = input?.value || "1.0";

  const getProgress = () => {
    // Check if token is in graduated list
    if (token.price.includes("K") && parseInt(token.price) > 100) {
      return 100;
    }

    // Check if token is about to graduate
    if (parseInt(token.price) > 10) {
      const seed = token.address
        .split("")
        .reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const random = (seed % 25) + 75;
      return random;
    }

    const baseProgress = token.stats.priceChange5m
      ? Math.min(Math.max(parseFloat(token.stats.priceChange5m), 0), 100)
      : 0;
    return Math.min(baseProgress, 30);
  };

  const progress = getProgress();
  const radius = 24;
  const strokeWidth = 3;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const formatTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h`;
    return `${Math.floor(hours / 24)}d`;
  };

  const formatNumber = (num: string) => {
    if (num.includes("K")) return num;
    const n = parseFloat(num);
    if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
    if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
    return n.toFixed(2);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <motion.div className="bg-background-secondary rounded-xl p-4 border border-background-tertiary hover:border-accent-blue/30 transition-colors overflow-hidden">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="relative flex-shrink-0">
            <img
              src={token.logo}
              alt={token.name}
              className="w-10 h-10 rounded-full"
            />
            <motion.div
              className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background"
              style={{
                backgroundColor: token.priceChange >= 0 ? "#22c55e" : "#ef4444",
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
            />
          </div>
          <div className="min-w-0">
            <h3 className="font-medium text-foreground truncate">
              {token.name}
            </h3>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-sm text-foreground-secondary">
                {token.symbol}
              </span>
              <div className="flex items-center gap-1">
                <motion.button
                  onClick={() => copyToClipboard(token.address)}
                  className="p-1 hover:bg-background-tertiary rounded-lg transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Copy className="w-3 h-3 text-foreground-secondary" />
                </motion.button>
                <motion.a
                  href={`https://solscan.io/token/${token.address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1 hover:bg-background-tertiary rounded-lg transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ExternalLink className="w-3 h-3 text-foreground-secondary" />
                </motion.a>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span
            className={`text-sm font-medium ${
              token.priceChange >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {token.priceChange >= 0 ? "+" : ""}
            {token.priceChange}%
          </span>
          {token.priceChange >= 0 ? (
            <ArrowUpRight className="w-4 h-4 text-green-500" />
          ) : (
            <ArrowDownRight className="w-4 h-4 text-red-500" />
          )}
        </div>
      </div>

      <div className="border-t border-b border-background-tertiary">
        <TokenMetrics
          holders={token.holders}
          volume24h={token.volume24h}
          age={token.age}
          marketCap={token.marketCap}
          snipers={token.snipers}
          botHolders={token.botHolders}
        />
      </div>

      <div className="mt-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center justify-between p-2 rounded-lg bg-background-tertiary/50">
            <div className="flex items-center gap-1.5 text-accent-green">
              <ArrowUp className="w-3.5 h-3.5" />
              <span className="font-medium text-sm">{token.buys}</span>
            </div>
            <div className="flex items-center gap-1.5 text-accent-red">
              <ArrowDown className="w-3.5 h-3.5" />
              <span className="font-medium text-sm">{token.sells}</span>
            </div>
          </div>
          <div className="flex items-center justify-between p-2 rounded-lg bg-background-tertiary/50">
            <div className="flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5 text-foreground-secondary" />
              <span className="text-sm text-foreground-secondary">
                ${formatNumber(token.volume.toString())}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Coins className="w-3.5 h-3.5 text-foreground-secondary" />
              <span className="text-sm text-foreground-secondary">
                ${formatNumber(token.marketCap.toString())}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end">
          <QuickBuy solAmount={quickBuyAmount} onBuy={() => {}} />
        </div>
      </div>
    </motion.div>
  );
};

export default TokenCard;
