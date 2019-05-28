import { appConfig } from "./config";
import { createListingService } from "./features/listings";
import { createNotificationService } from "./features/notification";

async function main() {
  const listingService = createListingService(appConfig);
  listingService.enableDiffing();

  const notificationService = await createNotificationService(appConfig);
  notificationService.sendMessage(" Listening for new listings on binance....");

  listingService.registerListener(symbol => {
    notificationService.sendMessage(`Possible new listing: ${symbol}`);
  });
}

main();
