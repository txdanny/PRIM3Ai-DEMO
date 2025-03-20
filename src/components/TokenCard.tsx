import React from "react";
import {
  ArrowUp,
  ArrowDown,
  Users,
  Zap,
  TrendingUp,
  DollarSign,
  Coins,
  Activity,
} from "lucide-react";
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

  return (
    <div className="group bg-background-tertiary rounded-xl p-4 w-full hover:bg-background-secondary transition-all duration-300 cursor-pointer border border-background-tertiary hover:border-accent-blue/20 hover:shadow-lg hover:shadow-accent-blue/5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <div className="relative w-16 h-16">
              <svg
                width={radius * 2}
                height={radius * 2}
                viewBox={`0 0 ${radius * 2} ${radius * 2}`}
                className="absolute top-0 left-0 w-16 h-16"
              >
                <circle
                  stroke="#1A1A1A"
                  fill="transparent"
                  strokeWidth={strokeWidth}
                  r={normalizedRadius}
                  cx={radius}
                  cy={radius}
                />
                <circle
                  stroke="currentColor"
                  fill="transparent"
                  strokeWidth={strokeWidth}
                  strokeDasharray={circumference + " " + circumference}
                  style={{ strokeDashoffset }}
                  r={normalizedRadius}
                  cx={radius}
                  cy={radius}
                  className={`rotate-[-90deg] origin-[50%_50%] transition-all duration-500 ${
                    progress >= 100
                      ? "text-green-500"
                      : progress >= 70
                      ? "text-yellow-500"
                      : "text-accent-blue"
                  }`}
                />
              </svg>
              {token.imageUrl ? (
                <img
                  src={token.imageUrl}
                  alt={token.symbol}
                  className="absolute top-3 left-3 w-10 h-10 rounded-full ring-2 ring-background-tertiary"
                />
              ) : (
                <div className="absolute top-3 left-3 w-10 h-10 rounded-full bg-accent-blue/20 flex items-center justify-center ring-2 ring-background-tertiary">
                  <Zap className="w-4 h-4 text-accent-blue" />
                </div>
              )}
              <div className="absolute -top-1 -right-1 text-[8px] font-medium bg-background-secondary/80 rounded-full px-1.5 py-0.5 border border-background-tertiary backdrop-blur-sm">
                {progress.toFixed(0)}%
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-base">{token.symbol}</span>
                <img
                  src="https://i.postimg.cc/63LXRtM0/Pump-fun-logo.png"
                  alt="View on pump.fun"
                  className="w-4 h-4 cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(
                      `https://pump.fun/token/${token.address}`,
                      "_blank"
                    );
                  }}
                />
              </div>
              <div className="text-xs text-foreground-secondary flex items-center gap-1">
                <Activity className="w-3 h-3" />
                {formatTimeAgo(token.createdAt)}
              </div>
            </div>
          </div>
          <QuickBuy solAmount={quickBuyAmount} onBuy={() => {}} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1.5 text-accent-green">
              <ArrowUp className="w-3.5 h-3.5" />
              <span className="font-medium">{token.buys}</span>
            </div>
            <div className="flex items-center gap-1.5 text-accent-red">
              <ArrowDown className="w-3.5 h-3.5" />
              <span className="font-medium">{token.sells}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-foreground-secondary">
            <div className="flex items-center gap-1">
              <DollarSign className="w-3 h-3" />
              <span>${formatNumber(token.volume)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Coins className="w-3 h-3" />
              <span>${formatNumber(token.marketCap)}</span>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-foreground-secondary">
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              <span>{formatNumber(token.holders.toString())}</span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>{token.stats.transactions}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-accent-green">
              +{token.stats.priceChange5m}%
            </span>
            <span className="text-accent-red">
              -{token.stats.priceChange1h}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenCard;
