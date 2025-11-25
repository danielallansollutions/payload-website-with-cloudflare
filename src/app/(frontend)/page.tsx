import PageTemplate, { generateMetadata } from './[slug]/page'

// Force dynamic rendering for Cloudflare D1 compatibility
export const dynamic = 'force-dynamic'

export default PageTemplate

export { generateMetadata }
