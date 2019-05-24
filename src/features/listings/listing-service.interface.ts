export type Listener = (symbol: string) => void;

export interface ListingService {
  installFilter(filter: RegExp): void;
  registerListener(listener: Listener): void;
}
