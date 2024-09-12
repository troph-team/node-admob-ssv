import { type KeyObject, createPublicKey } from 'node:crypto'
import debugLib from 'debug'
import type RawKeyRegister from '../rawkeys'
import type KeyDictCache from './cache'

const debug = debugLib('admob-ssv:keydict:MemoryCache')

interface InternalKeyRegister extends RawKeyRegister {
  added: number
}

/**
 * In Memory Key cache
 */
export default class MemoryCache implements KeyDictCache {
  private keys: Map<number, InternalKeyRegister>

  constructor(keys?: Array<RawKeyRegister>) {
    this.keys = new Map()
    if (keys) {
      const now = Date.now()
      for (const key of keys) {
        this.keys.set(key.keyId, {
          ...key,
          added: now,
        })
      }
    }
  }

  async has(id: number): Promise<boolean> {
    return this.keys.has(id)
  }

  async get(id: number): Promise<KeyObject> {
    debug(`Get key ${id}`)
    const key = this.keys.get(id)
    if (!key) throw new Error('Key not found')
    return createPublicKey(key.pem)
  }

  async save(key: RawKeyRegister): Promise<void> {
    debug(`Set key ${key.keyId}`)
    const now = Date.now()
    this.keys.set(key.keyId, {
      ...key,
      added: now,
    })
  }
}
