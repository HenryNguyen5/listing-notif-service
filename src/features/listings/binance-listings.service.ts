import { Binance } from "binance-api-node";
import { Listener, ListingService } from "./listing-service.interface";
import { filterTickers, tickerDiffer } from "./listing.utils";
import { Ticker } from "./types";

export class BinanceListingService implements ListingService {
  private client: Binance;
  private filters: RegExp[] = [];
  private listeners: Listener[] = [];

  private differ: ReturnType<typeof tickerDiffer> | null = null;

  constructor(client: Binance) {
    this.client = client;
    this.onTickerUpdate = this.onTickerUpdate.bind(this);
    this.init();
  }

  public async enableDiffing() {
    this.differ = tickerDiffer();

    const seed = await this.client.allBookTickers();

    for (const [symbol] of Object.entries(seed)) {
      console.log("seeding with:", symbol);
      this.differ([{ symbol }]);
    }
  }

  public disableDiffing() {
    this.differ = null;
  }

  public installFilter(filter: RegExp): void {
    this.filters.push(filter);
  }

  public registerListener(listener: Listener): void {
    this.listeners.push(listener);
  }

  private init() {
    this.client.ws.allTickers(this.onTickerUpdate);
  }

  private onTickerUpdate(tickers: Ticker[]) {
    if (this.listeners.length === 0) {
      return;
    }
    const tickerSet: Ticker[] = [];

    const filteredTickerSet = filterTickers(tickers, this.filters);
    tickerSet.push(...filteredTickerSet);

    if (this.differ) {
      const diffTickerSet = this.differ(tickers);
      tickerSet.push(...diffTickerSet);
    }

    for (const ticker of tickerSet) {
      for (const listener of this.listeners) {
        listener(ticker.symbol);
      }
    }
  }
}
