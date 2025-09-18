import { makeStore } from '@/lib/store.js'

export function getSubdomainData(subdomain) {
  const state = makeStore.getState()
  return state.subdomain.list.find(s => s.subdomain === subdomain) || null
}

export function getAllSubdomains() {
  const state = makeStore.getState()
  return state.subdomain.list
}

export const protocol =
  process.env.NODE_ENV === 'production' ? 'https' : 'http';
export const rootDomain =
  process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'localhost:3000';