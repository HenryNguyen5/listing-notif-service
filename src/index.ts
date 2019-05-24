import { createListingService } from "./features/listings";
import { appConfig } from "./config";

const listingService = createListingService(appConfig);
listingService.installFilter(/bTc/i);
listingService.registerListener(symbol => {
  console.log(symbol);
});
