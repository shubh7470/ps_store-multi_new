// app/test/page.js
'use client'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addSubdomain } from '@/features/subdomain/subdomainSlice'
import { getAllSubdomains, getSubdomainData } from '@/lib/stateUtils'

export default function TestPage() {
  const dispatch = useDispatch()

  useEffect(() => {
    // Add some subdomains
    dispatch(addSubdomain({ subdomain: 'shop1', emoji: '🛒', createdAt: Date.now() }))
    dispatch(addSubdomain({ subdomain: 'shop2', emoji: '📦', createdAt: Date.now() }))

    // Test utils
    console.log('All Subdomains:', getAllSubdomains())
    console.log('Subdomain shop1:', getSubdomainData('shop1'))
    console.log('Subdomain missing:', getSubdomainData('not-exist'))
  }, [dispatch])

  return <h1>Check console for stateUtils test</h1>
}
