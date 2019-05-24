import { Ticker } from "./types";

export function filterTickers(
  tickers: Ticker[],
  filters: RegExp[]
): Set<Ticker> {
  const filteredTickersSet = new Set<Ticker>();

  for (const ticker of tickers) {
    for (const filter of filters) {
      if (filter.test(ticker.symbol)) {
        filteredTickersSet.add(ticker);
      }
    }
  }

  return filteredTickersSet;
}
