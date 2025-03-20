import React, { useState, useEffect } from "react";
import {
  ShoppingCart,
  Loader2,
  Check,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

interface QuickBuyProps {
  solAmount: string;
  onBuy: () => void;
  disabled?: boolean;
  error?: string;
}

const QuickBuy: React.FC<QuickBuyProps> = ({
  solAmount,
  onBuy,
  disabled = false,
  error,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    if (error) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  }, [error]);

  const handleBuy = async () => {
    if (disabled || isLoading || isSuccess) return;

    setIsLoading(true);
    setShowError(false);

    try {
      await onBuy();
      setIsSuccess(true);
      await controls.start({ scale: [1, 1.05, 1] });
      setTimeout(() => setIsSuccess(false), 2000);
    } catch (err) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const buttonVariants = {
    initial: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
    hover: {
      scale: 1.02,
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
    tap: {
      scale: 0.98,
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
  };

  const iconVariants = {
    initial: { opacity: 0, scale: 0.8, rotate: -180 },
    animate: { opacity: 1, scale: 1, rotate: 0 },
    exit: { opacity: 0, scale: 0.8, rotate: 180 },
  };

  return (
    <motion.div
      className="relative"
      initial="initial"
      animate="animate"
      variants={buttonVariants}
      transition={{ duration: 0.3 }}
    >
      <motion.button
        onClick={handleBuy}
        disabled={disabled || isLoading || isSuccess}
        className={`
          group relative bg-gradient-to-r from-accent-blue to-accent-blue/80 
          hover:from-accent-blue/90 hover:to-accent-blue/70 text-white 
          px-6 py-2.5 rounded-xl text-sm font-medium 
          transition-all duration-200 shadow-lg 
          hover:shadow-accent-blue/20 
          disabled:opacity-70 disabled:cursor-not-allowed 
          overflow-hidden
          ${showError ? "bg-red-500 hover:bg-red-600" : ""}
          ${isSuccess ? "bg-green-500 hover:bg-green-600" : ""}
        `}
        whileHover="hover"
        whileTap="tap"
        animate={controls}
      >
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0"
          initial={{ x: "-200%" }}
          whileHover={{ x: "200%" }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "loop" }}
        />

        {/* Success sparkle effect */}
        <AnimatePresence>
          {isSuccess && (
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Sparkles className="absolute top-0 left-0 w-4 h-4 text-white/50 animate-pulse" />
              <Sparkles className="absolute bottom-0 right-0 w-4 h-4 text-white/50 animate-pulse delay-75" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content */}
        <div className="relative flex items-center gap-3">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                variants={iconVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.2 }}
              >
                <Loader2 className="w-4 h-4 animate-spin" />
              </motion.div>
            ) : showError ? (
              <motion.div
                key="error"
                variants={iconVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.2 }}
              >
                <AlertCircle className="w-4 h-4" />
              </motion.div>
            ) : isSuccess ? (
              <motion.div
                key="success"
                variants={iconVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.2 }}
              >
                <Check className="w-4 h-4" />
              </motion.div>
            ) : (
              <motion.div
                key="cart"
                variants={iconVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.2 }}
              >
                <ShoppingCart className="w-4 h-4" />
              </motion.div>
            )}
          </AnimatePresence>

          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="font-medium"
          >
            {isLoading
              ? "Processing..."
              : showError
              ? error || "Error"
              : isSuccess
              ? "Success!"
              : `Buy ${solAmount} SOL`}
          </motion.span>
        </div>

        {/* Ripple effect */}
        <motion.div
          className="absolute inset-0 rounded-xl bg-white/20"
          initial={{ scale: 0, opacity: 0 }}
          whileTap={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
        />

        {/* Hover glow effect */}
        <motion.div
          className="absolute inset-0 rounded-xl bg-accent-blue/20"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>

      {/* Error tooltip */}
      <AnimatePresence>
        {showError && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-red-500 text-white text-xs px-3 py-1 rounded-lg whitespace-nowrap"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default QuickBuy;
