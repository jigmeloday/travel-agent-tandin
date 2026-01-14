import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,  // from sanity.json / manage.sanity.io
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,       // usually "production"
  apiVersion: "2024-01-01",                               // any recent date
  useCdn: true,                                            // faster reads
})