import type RawKeyRegister from '../rawkeys'

export interface FetcherOptions {
  url?: string
}

export default abstract class KeyFetcher {
  constructor(public options: FetcherOptions = {}) {}
  abstract fetch(): Promise<RawKeyRegister[]>
}
