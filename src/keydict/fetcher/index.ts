import type RawKeyRegister from '../rawkeys'
import type KeyFetcher from './fetcher'
import type { FetcherOptions } from './fetcher'

export const KEY_URL = 'https://www.gstatic.com/admob/reward/verifier-keys.json'

export default class SimpleFetcher implements KeyFetcher {
  constructor(public options: FetcherOptions = {}) {}

  async fetch() {
    const res = await fetch(this.options.url || KEY_URL)

    if (!res.ok) {
      throw new Error(`Failed to fetch keys: ${res.statusText}`)
    }

    const data = await res.json()

    return data.keys as RawKeyRegister[]
  }
}

export interface RetryFetcherOptions extends FetcherOptions {
  maxRetries?: number
  delay?: number
}

export class RetryFetcher extends SimpleFetcher implements KeyFetcher {
  constructor(public options: RetryFetcherOptions = {}) {
    super(options)
  }

  override async fetch() {
    const maxRetries = this.options.maxRetries || 3
    const delay = this.options.delay || 1000
    for (let i = maxRetries || 3; i > 0; i -= 1) {
      try {
        return await super.fetch()
      } catch (err) {
        await new Promise(resolve => setTimeout(resolve, delay))
      }
    }
    throw new Error(`Failed to fetch keys after ${maxRetries} retries`)
  }
}
