import BinanceClient from "binance-api-node";
import { AppConfig } from "../../config";
import { BinanceListingService } from "./binance-listings.service";
import { ListingService } from "./listing-service.interface";

export function createListingService(config: AppConfig): ListingService {
  const client = BinanceClient({
    apiKey: config.binance.apiKey,
    apiSecret: config.binance.apiSecret
  });

  return new BinanceListingService(client);
}
