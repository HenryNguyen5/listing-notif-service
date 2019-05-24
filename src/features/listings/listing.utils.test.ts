import { filterTickers } from "./listing.utils";
import { TEST_TICKERS } from "./_fixtures";
import { Ticker } from "./types";

describe("filterTickersTest", () => {
  const cases: [RegExp[], Ticker[]][] = [
    [[], []],
    [[/matic/i], []],
    [[/theta/i], [{ symbol: "THETAUSDT" }]],
    [[/the/i], [{ symbol: "THETAUSDT" }]],
    [
      [/USDT/i],
      [
        { symbol: "BTTUSDT" },
        { symbol: "USDSUSDT" },
        { symbol: "ONGUSDT" },
        { symbol: "ZRXUSDT" },
        { symbol: "FETUSDT" },
        { symbol: "BATUSDT" },
        { symbol: "ZECUSDT" },
        { symbol: "IOSTUSDT" },
        { symbol: "CELRUSDT" },
        { symbol: "NANOUSDT" },
        { symbol: "OMGUSDT" },
        { symbol: "THETAUSDT" },
        { symbol: "ENJUSDT" },
        { symbol: "MITHUSDT" }
      ]
    ],
    [
      [/USDT/i, /USDT/i, /USDT/i],
      [
        { symbol: "BTTUSDT" },
        { symbol: "USDSUSDT" },
        { symbol: "ONGUSDT" },
        { symbol: "ZRXUSDT" },
        { symbol: "FETUSDT" },
        { symbol: "BATUSDT" },
        { symbol: "ZECUSDT" },
        { symbol: "IOSTUSDT" },
        { symbol: "CELRUSDT" },
        { symbol: "NANOUSDT" },
        { symbol: "OMGUSDT" },
        { symbol: "THETAUSDT" },
        { symbol: "ENJUSDT" },
        { symbol: "MITHUSDT" }
      ]
    ],

    [
      [/zRx/i, /FEt/i, /BNB/i],
      [
        { symbol: "BTTBNB" },
        { symbol: "BNBUSDS" },
        { symbol: "ONGBNB" },

        { symbol: "ZRXBNB" },
        { symbol: "ZRXUSDT" },

        { symbol: "FETBTC" },
        { symbol: "FETUSDT" },

        { symbol: "IOSTBNB" },
        { symbol: "CELRBNB" }
      ]
    ]
  ];

  it.each(cases)(
    "should filter out tickers that do not match filters",
    (filters, expected) => {
      const res = filterTickers(TEST_TICKERS, filters);
      expect([...res.values()]).toEqual(expected);
    }
  );
});
