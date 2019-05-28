import { filterTickers, tickerDiffer } from "./listing.utils";
import { Ticker } from "./types";
import { TEST_TICKERS_1, TEST_TICKERS_2, TEST_TICKERS_3 } from "./_fixtures";

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
      const res = filterTickers(TEST_TICKERS_1, filters);
      expect([...res.values()]).toEqual(expected);
    }
  );
});

describe("tickerDiffer test", () => {
  it("should not return a diff", () => {
    const differ = tickerDiffer();
    const res = differ(TEST_TICKERS_1);
    expect(res).toEqual([]);
  });

  const cases: [Ticker[], Ticker[], Ticker[]][] = [
    [TEST_TICKERS_1, TEST_TICKERS_1, []],
    [TEST_TICKERS_1, TEST_TICKERS_2, [{ symbol: "ZRXUSDC" }]],
    [
      TEST_TICKERS_2,
      TEST_TICKERS_3,
      [{ symbol: "IOSTUSDC" }, { symbol: "ZRXUSDC" }]
    ]
  ];

  it.each(cases)("should compute the correct diff", (a, b, expected) => {
    const differ = tickerDiffer();

    let res = differ(a);
    expect(res).toEqual([]);

    res = differ(b);
    expect(res).toEqual(expected);
  });
});
