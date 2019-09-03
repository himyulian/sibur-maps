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

export function setAddNewMarker (state, data) {
  state.newMarkers.push(data)
}

export function setDeleteNewMarker (state, id) {
  let index = state.newMarkers.findIndex(v => v.Id === id)
  if (index !== -1) {
    state.newMarkers.splice(index, 1)
  }
}
