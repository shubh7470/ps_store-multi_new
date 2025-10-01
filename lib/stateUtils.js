import { store } from '@/lib/store'

export function getSubdomainData(subdomain) {
  const state = store.getState()
  return state.subdomain.list.find(s => s.subdomain === subdomain) || null
}

export function getAllSubdomains() {
  const state = store.getState()
  return state.subdomain.list
}
