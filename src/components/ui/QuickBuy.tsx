import React, { useState } from "react";
import { ShoppingCart, Loader2 } from "lucide-react";

interface QuickBuyProps {
  solAmount: string;
  onBuy: () => void;
}

const QuickBuy: React.FC<QuickBuyProps> = ({ solAmount, onBuy }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleBuy = async () => {
    setIsLoading(true);
    try {
      await onBuy();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleBuy}
      disabled={isLoading}
      className="group relative bg-gradient-to-r from-accent-blue to-accent-blue/80 hover:from-accent-blue/90 hover:to-accent-blue/70 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-accent-blue/20 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
      <div className="relative flex items-center gap-2">
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <ShoppingCart className="w-4 h-4" />
        )}
        <span>Buy {solAmount} SOL</span>
      </div>
    </button>
  );
};

export default QuickBuy;
