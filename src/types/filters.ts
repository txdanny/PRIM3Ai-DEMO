export interface CategoryFilters {
  search: string;
  pumpProgress: { min: string; max: string };
  holders: { min: string; max: string };
  devHolding: { min: string; max: string };
  snipers: { min: string; max: string };
  botHolders: { min: string; max: string };
  age: { min: string; max: string };
  currentLiquidity: { min: string; max: string };
  volume: { min: string; max: string };
  marketCap: { min: string; max: string };
  transactions: { min: string; max: string };
  buys: { min: string; max: string };
  sells: { min: string; max: string };
}

export interface CategoryState {
  showFilters: boolean;
  filters: CategoryFilters;
}
