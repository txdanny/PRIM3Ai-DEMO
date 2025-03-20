import React, { useState } from "react";
import { Filter, Zap, TrendingUp, GraduationCap } from "lucide-react";
import TokenCard from "../components/TokenCard";
import FilterPanel from "../components/FilterPanel";
import {
  sampleTokens,
  graduatingTokens,
  graduatedTokens,
} from "../data/tokens";
import type { CategoryState } from "../types/filters";

function MemeScope() {
  const [quickBuyAmount, setQuickBuyAmount] = useState("0.01");
  const [selectedPreset, setSelectedPreset] = useState("S1");
  const [categoryStates, setCategoryStates] = useState<{
    "newly-created": CategoryState;
    "about-to-graduate": CategoryState;
    graduated: CategoryState;
  }>({
    "newly-created": {
      showFilters: false,
      filters: {
        search: "",
        pumpProgress: { min: "", max: "" },
        holders: { min: "", max: "" },
        devHolding: { min: "", max: "" },
        snipers: { min: "", max: "" },
        botHolders: { min: "", max: "" },
        age: { min: "", max: "" },
        currentLiquidity: { min: "", max: "" },
        volume: { min: "", max: "" },
        marketCap: { min: "", max: "" },
        transactions: { min: "", max: "" },
        buys: { min: "", max: "" },
        sells: { min: "", max: "" },
      },
    },
    "about-to-graduate": {
      showFilters: false,
      filters: {
        search: "",
        pumpProgress: { min: "", max: "" },
        holders: { min: "", max: "" },
        devHolding: { min: "", max: "" },
        snipers: { min: "", max: "" },
        botHolders: { min: "", max: "" },
        age: { min: "", max: "" },
        currentLiquidity: { min: "", max: "" },
        volume: { min: "", max: "" },
        marketCap: { min: "", max: "" },
        transactions: { min: "", max: "" },
        buys: { min: "", max: "" },
        sells: { min: "", max: "" },
      },
    },
    graduated: {
      showFilters: false,
      filters: {
        search: "",
        pumpProgress: { min: "", max: "" },
        holders: { min: "", max: "" },
        devHolding: { min: "", max: "" },
        snipers: { min: "", max: "" },
        botHolders: { min: "", max: "" },
        age: { min: "", max: "" },
        currentLiquidity: { min: "", max: "" },
        volume: { min: "", max: "" },
        marketCap: { min: "", max: "" },
        transactions: { min: "", max: "" },
        buys: { min: "", max: "" },
        sells: { min: "", max: "" },
      },
    },
  });

  const toggleFilters = (
    category: "newly-created" | "about-to-graduate" | "graduated"
  ) => {
    setCategoryStates((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        showFilters: !prev[category].showFilters,
      },
    }));
  };

  const updateFilters = (
    category: "newly-created" | "about-to-graduate" | "graduated",
    field: keyof CategoryState["filters"] | string,
    value: string | { min: string; max: string }
  ) => {
    setCategoryStates((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        filters: {
          ...prev[category].filters,
          [field]: value,
        },
      },
    }));
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-accent-blue to-accent-blue/80 bg-clip-text text-transparent">
              MEMESCOPE
            </h1>
            <div className="px-2 py-1 bg-accent-blue/10 rounded-full text-xs font-medium text-accent-blue">
              BETA
            </div>
          </div>
          <p className="text-foreground-secondary text-lg max-w-2xl">
            Customized real-time feeds of pump.fun tokens matching your selected
            preset filters. Track, analyze, and trade with precision.
          </p>
        </div>

        <div className="bg-background-secondary rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-6 flex-1">
              <div className="flex items-center gap-3">
                <span className="text-foreground-secondary font-medium">
                  Quickbuy
                </span>
                <div className="relative">
                  <input
                    type="number"
                    style={{ appearance: "textfield" }}
                    value={quickBuyAmount}
                    onChange={(e) => setQuickBuyAmount(e.target.value)}
                    className="w-32 bg-background text-foreground placeholder-foreground-tertiary rounded-lg pl-9 pr-12 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <img
                    src="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png"
                    alt="SOL"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-foreground-secondary">
                    SOL
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-foreground-secondary font-medium">
                  Presets
                </span>
                {["S1", "S2", "S3"].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setSelectedPreset(preset)}
                    className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                      selectedPreset === preset
                        ? "bg-accent-blue text-white shadow-lg shadow-accent-blue/20"
                        : "bg-background text-foreground-secondary hover:bg-background-tertiary"
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Token Lists */}
        <div className="grid grid-cols-3 gap-6">
          {/* Newly Created */}
          <div className="bg-background-secondary rounded-xl p-4 flex flex-col h-[calc(100vh-16rem)]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-accent-blue" />
                <h2 className="font-semibold text-lg">NEWLY CREATED</h2>
              </div>
              <button
                onClick={() => toggleFilters("newly-created")}
                className={`flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg transition-all duration-200 ${
                  categoryStates["newly-created"].showFilters
                    ? "bg-accent-blue text-white shadow-lg shadow-accent-blue/20"
                    : "bg-background text-foreground-secondary hover:bg-background-tertiary"
                }`}
              >
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>
            <div className="flex-1 flex flex-col overflow-hidden">
              {categoryStates["newly-created"].showFilters ? (
                <FilterPanel
                  category="newly-created"
                  filters={categoryStates["newly-created"].filters}
                  onUpdateFilters={(field, value) =>
                    updateFilters("newly-created", field, value)
                  }
                />
              ) : (
                <div className="flex-1 overflow-y-auto space-y-3 mt-2">
                  {sampleTokens.map((token) => (
                    <TokenCard key={token.address} token={token} />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* About to Graduate */}
          <div className="bg-background-secondary rounded-xl p-4 flex flex-col h-[calc(100vh-16rem)]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-yellow-500" />
                <h2 className="font-semibold text-lg">ABOUT TO GRADUATE</h2>
              </div>
              <button
                onClick={() => toggleFilters("about-to-graduate")}
                className={`flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg transition-all duration-200 ${
                  categoryStates["about-to-graduate"].showFilters
                    ? "bg-accent-blue text-white shadow-lg shadow-accent-blue/20"
                    : "bg-background text-foreground-secondary hover:bg-background-tertiary"
                }`}
              >
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>
            <div className="flex-1 flex flex-col overflow-hidden">
              {categoryStates["about-to-graduate"].showFilters ? (
                <FilterPanel
                  category="about-to-graduate"
                  filters={categoryStates["about-to-graduate"].filters}
                  onUpdateFilters={(field, value) =>
                    updateFilters("about-to-graduate", field, value)
                  }
                />
              ) : (
                <div className="flex-1 overflow-y-auto space-y-3 mt-2">
                  {graduatingTokens.map((token) => (
                    <TokenCard key={token.address} token={token} />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Graduated */}
          <div className="bg-background-secondary rounded-xl p-4 flex flex-col h-[calc(100vh-16rem)]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-green-500" />
                <h2 className="font-semibold text-lg">GRADUATED</h2>
              </div>
              <button
                onClick={() => toggleFilters("graduated")}
                className={`flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg transition-all duration-200 ${
                  categoryStates["graduated"].showFilters
                    ? "bg-accent-blue text-white shadow-lg shadow-accent-blue/20"
                    : "bg-background text-foreground-secondary hover:bg-background-tertiary"
                }`}
              >
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>
            <div className="flex-1 flex flex-col overflow-hidden">
              {categoryStates["graduated"].showFilters ? (
                <FilterPanel
                  category="graduated"
                  filters={categoryStates["graduated"].filters}
                  onUpdateFilters={(field, value) =>
                    updateFilters("graduated", field, value)
                  }
                />
              ) : (
                <div className="flex-1 overflow-y-auto space-y-3 mt-2">
                  {graduatedTokens.map((token) => (
                    <TokenCard key={token.address} token={token} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemeScope;
