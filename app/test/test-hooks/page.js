// app/test-hooks/page.js
'use client'
import { useDispatch } from 'react-redux'
import { addSubdomain } from '../../../lib/features/subdomain/subdomainSlice'
import { useAllSubdomains, useSubdomain } from '../../../lib/features/subdomain/hooks'

export default function TestHooksPage() {
  const dispatch = useDispatch()
  const allSubs = useAllSubdomains()
  const shop1 = useSubdomain('shop1')

  const handleAdd = () => {
    dispatch(addSubdomain({ subdomain: `shop${allSubs.length + 1}`, emoji: '🛍️', createdAt: Date.now() }))
  }

  return (
    <div>
      <h1>Testing Hooks</h1>
      <button onClick={handleAdd}>Add Subdomain</button>

      <h2>All Subdomains:</h2>
      <pre>{JSON.stringify(allSubs, null, 2)}</pre>

      <h2>Subdomain "shop1":</h2>
      <pre>{JSON.stringify(shop1, null, 2)}</pre>
    </div>
  )
}
