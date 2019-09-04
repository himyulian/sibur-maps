import { updateField } from 'vuex-map-fields'

export { updateField }

export function setLoadingStatus (state, status) {
  state.loading = status
}

export function setDyalogNewMarker (state, status) {
  state.dyalogNewMarker = status
}

export function setDyalogEditMarker (state, status) {
  state.dyalogEditMarker = status
}

export function setItems (state, data) {
  state.items = data
}

export function setAddNewMarker (state, data) {
  state.newMarkers.push(data)
}

export function setDeleteItem (state, id) {
  let index = state.items.findIndex(v => v.Id === id)
  if (index !== -1) {
    state.items.splice(index, 1)
  }
}

export function setUpdateItem (state, data) {
  let index = state.items.findIndex(v => v.Id === data.Id)
  if (index !== -1) {
    state.items.splice(index, 1, data)
  }
}

export function setDeleteNewMarker (state, id) {
  let index = state.newMarkers.findIndex(v => v.Id === id)
  if (index !== -1) {
    state.newMarkers.splice(index, 1)
  }
}
