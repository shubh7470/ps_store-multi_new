export default function SubdomainPage({ params }) {
  const { subdomain } = params

  return (
    <div>
      <h1>Welcome to {subdomain} shop!</h1>
      <p>This page was routed from the subdomain.</p>
    </div>
  )
}
