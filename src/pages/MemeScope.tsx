import React, { useState } from "react";
import {
  Filter,
  Zap,
  TrendingUp,
  GraduationCap,
  Settings,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [showSettings, setShowSettings] = useState(false);
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 0 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <motion.div
      className="min-h-screen bg-background text-foreground p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-[1660px] mx-auto mt-10">
        <motion.div
          className="mb-8"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center gap-3">
              <motion.h1
                className="text-4xl font-bold bg-gradient-to-r from-accent-blue via-accent-blue/90 to-accent-blue/80 bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                MEMESCOPE
              </motion.h1>
              <motion.div
                className="px-3 py-1 bg-accent-blue/10 rounded-full text-xs font-medium text-accent-blue border border-accent-blue/20"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                BETA
              </motion.div>
            </div>
            {/* <motion.button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 rounded-lg bg-background-secondary absolute right-5 hover:bg-background-tertiary transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Settings className="w-5 h-5 text-foreground-secondary" />
            </motion.button> */}
          </div>
          <div className="w-full flex items-center justify-center">
            <motion.p
              className="text-foreground-secondary text-lg max-w-2xl leading-relaxed text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Customized real-time feeds of pump.fun tokens matching your
              selected preset filters. Track, analyze, and trade with precision.
            </motion.p>
          </div>
        </motion.div>

        <motion.div
          className="bg-background-secondary/50 backdrop-blur-lg rounded-2xl p-8 mb-8 border border-background-tertiary/50 shadow-xl hover:shadow-2xl transition-all duration-300"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-8 flex-1 lg:flex-row flex-col">
              <div className="flex items-center gap-4">
                <span className="text-foreground-secondary font-semibold text-sm uppercase tracking-wider">
                  Quickbuy
                </span>
                <div className="relative group">
                  <input
                    type="number"
                    style={{ appearance: "textfield" }}
                    value={quickBuyAmount}
                    onChange={(e) => setQuickBuyAmount(e.target.value)}
                    className="w-36 bg-background/50 text-foreground placeholder-foreground-tertiary rounded-xl pl-11 pr-14 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-accent-blue/50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none transition-all duration-300 group-hover:bg-background-tertiary/50 border border-background-tertiary/30"
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-background-tertiary/30 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <img
                      src="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png"
                      alt="SOL"
                      className="w-4 h-4"
                    />
                  </div>
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-foreground-secondary/70">
                    SOL
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-foreground-secondary font-semibold text-sm uppercase tracking-wider">
                  Presets
                </span>
                <div className="flex items-center gap-2 bg-background/30 p-1 rounded-xl backdrop-blur-sm">
                  {["S1", "S2", "S3"].map((preset) => (
                    <motion.button
                      key={preset}
                      onClick={() => setSelectedPreset(preset)}
                      className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-300 ${
                        selectedPreset === preset
                          ? "bg-accent-blue text-white shadow-lg shadow-accent-blue/30 scale-105"
                          : "bg-transparent text-foreground-secondary hover:bg-background-tertiary/50 hover:text-foreground"
                      }`}
                      whileHover={{
                        scale: selectedPreset === preset ? 1.05 : 1.02,
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {preset}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Token Lists */}
        <motion.div
          className="grid lg:grid-cols-3 grid-cols-1 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Newly Created */}
          <motion.div
            className="bg-background-secondary rounded-xl p-4 flex flex-col h-[calc(100vh-16rem)] border border-background-tertiary shadow-lg"
            variants={itemVariants}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <motion.div
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.3 }}
                >
                  <Zap className="w-5 h-5 text-accent-blue" />
                </motion.div>
                <h2 className="font-semibold text-lg">NEWLY CREATED</h2>
              </div>
              <motion.button
                onClick={() => toggleFilters("newly-created")}
                className={`flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg transition-all duration-200 ${
                  categoryStates["newly-created"].showFilters
                    ? "bg-accent-blue text-white shadow-lg shadow-accent-blue/20"
                    : "bg-background text-foreground-secondary hover:bg-background-tertiary"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Filter className="w-4 h-4" />
                Filter
              </motion.button>
            </div>
            <div className="flex-1 flex flex-col overflow-y-auto">
              <AnimatePresence mode="wait">
                {categoryStates["newly-created"].showFilters ? (
                  <motion.div
                    key="filters"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.2 }}
                    className="flex-1 overflow-y-auto space-y-3 mt-2"
                  >
                    <FilterPanel
                      category="newly-created"
                      filters={categoryStates["newly-created"].filters}
                      onUpdateFilters={(field, value) =>
                        updateFilters("newly-created", field, value)
                      }
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="tokens"
                    className="flex-1 overflow-y-auto space-y-3 mt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {sampleTokens.map((token) => (
                      <TokenCard key={token.address} token={token} />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* About to Graduate */}
          <motion.div
            className="bg-background-secondary rounded-xl p-4 flex flex-col h-[calc(100vh-16rem)] border border-background-tertiary shadow-lg"
            variants={itemVariants}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <TrendingUp className="w-5 h-5 text-yellow-500" />
                </motion.div>
                <h2 className="font-semibold text-lg">ABOUT TO GRADUATE</h2>
              </div>
              <motion.button
                onClick={() => toggleFilters("about-to-graduate")}
                className={`flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg transition-all duration-200 ${
                  categoryStates["about-to-graduate"].showFilters
                    ? "bg-accent-blue text-white shadow-lg shadow-accent-blue/20"
                    : "bg-background text-foreground-secondary hover:bg-background-tertiary"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Filter className="w-4 h-4" />
                Filter
              </motion.button>
            </div>
            <div className="flex-1 flex flex-col overflow-auto">
              <AnimatePresence mode="wait">
                {categoryStates["about-to-graduate"].showFilters ? (
                  <motion.div
                    key="filters"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FilterPanel
                      category="about-to-graduate"
                      filters={categoryStates["about-to-graduate"].filters}
                      onUpdateFilters={(field, value) =>
                        updateFilters("about-to-graduate", field, value)
                      }
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="tokens"
                    className="flex-1 overflow-y-auto space-y-3 mt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {graduatingTokens.map((token) => (
                      <TokenCard key={token.address} token={token} />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Graduated */}
          <motion.div
            className="bg-background-secondary rounded-xl p-4 flex flex-col h-[calc(100vh-16rem)] border border-background-tertiary shadow-lg"
            variants={itemVariants}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <GraduationCap className="w-5 h-5 text-green-500" />
                </motion.div>
                <h2 className="font-semibold text-lg">GRADUATED</h2>
              </div>
              <motion.button
                onClick={() => toggleFilters("graduated")}
                className={`flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg transition-all duration-200 ${
                  categoryStates["graduated"].showFilters
                    ? "bg-accent-blue text-white shadow-lg shadow-accent-blue/20"
                    : "bg-background text-foreground-secondary hover:bg-background-tertiary"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Filter className="w-4 h-4" />
                Filter
              </motion.button>
            </div>
            <div className="flex-1 flex flex-col overflow-auto">
              <AnimatePresence mode="wait">
                {categoryStates["graduated"].showFilters ? (
                  <motion.div
                    key="filters"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FilterPanel
                      category="graduated"
                      filters={categoryStates["graduated"].filters}
                      onUpdateFilters={(field, value) =>
                        updateFilters("graduated", field, value)
                      }
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="tokens"
                    className="flex-1 overflow-y-auto space-y-3 mt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {graduatedTokens.map((token) => (
                      <TokenCard key={token.address} token={token} />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default MemeScope;
