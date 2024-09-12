import type RawKeyRegister from '../rawkeys'
import type KeyFetcher from './fetcher'
import type { FetcherOptions } from './fetcher'

const KEY_URL = 'https://www.gstatic.com/admob/reward/verifier-keys.json'

export default class SimpleFetcher implements KeyFetcher {
  async fetch(options: FetcherOptions = {}) {
    const res = await fetch(options.url || KEY_URL)

    if (!res.ok) {
      throw new Error(`Failed to fetch keys: ${res.statusText}`)
    }

    const data = await res.json()

    return data.keys as RawKeyRegister[]
  }
}
