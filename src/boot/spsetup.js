import '@pnp/polyfill-ie11'
import { sp } from '@pnp/sp'

sp.setup({
  sp: {
    headers: {
      Accept: 'application/json;odata=verbose'
    },
    baseUrl: 'https://sharepoint/orgunits/vsk/map'
  }
})

// "async" is optional
export default async ({ /* app, router, Vue, ... */ }) => {
  // something to do
}
