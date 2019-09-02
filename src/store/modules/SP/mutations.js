import { updateField } from 'vuex-map-fields'

export { updateField }

export function setLoadingStatus (state, status) {
  state.loading = status
}

export function setDyalogForNewMarker (state, status) {
  state.dyalogForNewMarker = status
}

export function setItems (state, data) {
  state.items = data
}

export function setNewMarker (state, data) {
  state.newMarkers.push(data)
}
