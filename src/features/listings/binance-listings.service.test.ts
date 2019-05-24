import { Binance } from "binance-api-node";
import { DeepPartial, DeepRequired } from "../../lib/types";
import { BinanceListingService } from "./binance-listings.service";
import { TEST_TICKERS } from "./_fixtures";

describe("BinanceListingServiceTests", () => {
  function mock<T>(m: DeepPartial<T>): DeepRequired<T> {
    return m as any;
  }

  it("should fire listeners on ticker updates with every filtered ticker", done => {
    const allTickersMock = jest.fn();
    const mockClient = mock<Binance>({
      ws: {
        allTickers: allTickersMock
      }
    });

    const service = new BinanceListingService(mockClient);
    service.installFilter(/btc/i);
    service.installFilter(/BTC/);

    const [[onTickerUpdate]] = allTickersMock.mock.calls;
    onTickerUpdate([]);

    const calledWith: string[] = [];
    service.registerListener(symbol => {
      calledWith.push(symbol);
      if (calledWith.length === 5) {
        done();
      }
    });

    onTickerUpdate(TEST_TICKERS);
  });
});
