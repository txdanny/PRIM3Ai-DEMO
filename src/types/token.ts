export interface Token {
  symbol: string;
  name: string;
  address: string;
  imageUrl?: string;
  price: string;
  volume: string;
  marketCap: string;
  liquidity: string;
  buys: number;
  sells: number;
  holders: number;
  social: {
    twitter?: string;
    website?: string;
  };
  stats: {
    priceChange5m: string;
    priceChange1h: string;
    holders: number;
    transactions: number;
  };
  createdAt: string;
}
