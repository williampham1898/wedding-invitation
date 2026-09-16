const BASE_URL = import.meta.env.BASE_URL
const TRIMMED_BASE = BASE_URL.replace(/\/$/, '')

export function withBase(path: string) {
  if (/^(https?:)?\/\//.test(path) || path.startsWith('data:')) {
    return path
  }
  if (TRIMMED_BASE !== '/' && path.startsWith(TRIMMED_BASE)) {
    return path
  }
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${TRIMMED_BASE}${normalized}`
}
