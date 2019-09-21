import { getField } from 'vuex-map-fields'

export { getField }

export function getMarkers (state) {
  return state.items.filter(v => v.CoordPoint) || []
}

export function getPolylines (state) {
  return state.items.filter(v => v.CoordPolyline) || []
}
