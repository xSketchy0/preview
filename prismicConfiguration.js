// -- Prismic Repo Name
export const repoName = process.env.NEXT_PUBLIC_PRISMIC_REPOSITORY_NAME

// -- Prismic API endpoint
// Determines which repository to query and fetch data from
// Configure your site's access point here
export const apiEndpoint = `https://${repoName}.cdn.prismic.io/api/v2`

// -- Access Token if the repository is not public
// Generate a token in your dashboard and configure it here if your repository is private
export const accessToken = process.env.NEXT_PUBLIC_PRISMIC_API_TOKEN

export const linkResolver = (doc) => {
    if (doc.type === 'home') {
      return `/`
    }
  
    if (doc.type === 'creatives') {
      return `/creatives/${doc.uid}`
    }
  
    if (doc.type === 'ruimtes') {
      return `/ruimtes/${doc.uid}`
    }
  
    return `/`
  }
  
  // -- Route Resolver rules
  // Manages the url links to internal Prismic documents two levels deep (optionals)
  export const Router = {
      routes: [],
  
      href: (type) => {
        const route = Router.routes.find((r) => r.type === type)
        return route && route.href
      }
  };