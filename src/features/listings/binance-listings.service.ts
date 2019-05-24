import { Binance } from "binance-api-node";
import { Listener, ListingService } from "./listing-service.interface";
import { filterTickers } from "./listing.utils";
import { Ticker } from "./types";

export class BinanceListingService implements ListingService {
  private client: Binance;
  private filters: RegExp[] = [];
  private listeners: Listener[] = [];

  constructor(client: Binance) {
    this.client = client;
    this.onTickerUpdate = this.onTickerUpdate.bind(this);
    this.init();
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
    console.log("\n\n--Ticker Update--");

    const tickerSet = filterTickers(tickers, this.filters);

    for (const ticker of tickerSet.values()) {
      for (const listener of this.listeners) {
        listener(ticker.symbol);
      }
    }
  }
}
