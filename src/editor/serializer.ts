import pako from 'pako'

import { TimetableDTO } from './dto'
import { range } from './array'

export const serialize = (dto: TimetableDTO): string => {
  const json = JSON.stringify(dto)
  const gziped = pako.deflate(json)
  const base64 = encodeBase64(gziped)
  return base64
}

export const deserialize = (base64: string): TimetableDTO => {
  const gziped = decodeBase64(base64);
  const json = pako.inflate(gziped, { to: 'string' })
  return JSON.parse(json) as TimetableDTO
}

const encodeBase64 = (binary: Uint8Array): string => btoa(String.fromCharCode(...binary)).replace(/\//g, '_').replace(/\+/g, '-');

const decodeBase64 = (base64: string): Uint8Array => {
  const decoded = atob(base64.replace(/_/g, '/').replace(/-/g, '+'));
  const bytes = new Uint8Array(decoded.length);
  for (const i of range(0, decoded.length)) {
    bytes[i] = decoded.charCodeAt(i);
  }
  return bytes
}
