import { getField } from 'vuex-map-fields'

export { getField }

export function getMarkers (state) {
  return state.items || []
}

export function getNewMarkers (state) {
  return state.newMarkers || []
}
