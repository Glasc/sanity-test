import sanityClient from "@sanity/client"

const client = sanityClient({
  projectId: 'cteelkpu',
  dataset: 'production',
  // apiVersion: '2021-10-21', // use current UTC date - see "specifying API version"!
  useCdn: true, // `false` if you want to ensure fresh data
})

export default client