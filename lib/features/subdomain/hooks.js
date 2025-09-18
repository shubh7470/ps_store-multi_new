import { useSelector } from 'react-redux'

export function useSubdomain(subdomain) {
  return useSelector(state =>
    state.subdomain.list.find(s => s.subdomain === subdomain) || null
  )
}

export function useAllSubdomains() {
  return useSelector(state => state.subdomain.list)
}
