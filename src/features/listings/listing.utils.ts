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

export function tickerDiffer(): (newTickers: Ticker[]) => Ticker[] {
  const prevTickers: Map<string, boolean> = new Map();

  return function computeDiff(newTickers: Ticker[]): Ticker[] {
    const shouldSkip = prevTickers.size === 0;

    const diff: Ticker[] = [];
    for (const ticker of newTickers) {
      if (!prevTickers.has(ticker.symbol)) {
        prevTickers.set(ticker.symbol, true);
        diff.push(ticker);
      }
    }

    if (shouldSkip) {
      return [];
    }

    console.log("diff", diff.map(d => d.symbol));
    return diff;
  };
}
