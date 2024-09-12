import type { KeyObject } from 'node:crypto'
import type RawKeyRegister from '../rawkeys'

export default interface KeyDictCache {
  get(id: number): Promise<KeyObject>
  has(id: number): Promise<boolean>
  save(key: RawKeyRegister): Promise<void>
}
