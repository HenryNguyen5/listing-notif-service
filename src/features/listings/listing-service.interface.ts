export type Listener = (symbol: string) => void;

export interface ListingService {
  enableDiffing(): void;
  disableDiffing(): void;

  installFilter(filter: RegExp): void;
  registerListener(listener: Listener): void;
}
