import { updateField } from 'vuex-map-fields'

export { updateField }

export function setLoadingStatus (state, status) {
  state.loading = status
}

export function setDyalogItemAdd (state, status) {
  state.dyalogItemAdd = status
}

export function setDyalogItemEdit (state, status) {
  state.dyalogItemEdit = status
}

export function setClearFields (state) {
  for (let key of Object.keys(state.fields)) {
    state.fields[key] = null
  }
}

export function setClearClickedItem (state) {
  for (let key of Object.keys(state.clickedItem)) {
    state.clickedItem[key] = null
  }
}

export function setItems (state, data) {
  state.items = data
}

export function setItemAdd (state, data) {
  state.items.push(data)
}

export function setItemUpdate (state, data) {
  let index = state.items.findIndex(v => v.Id === data.Id)
  if (index !== -1) {
    state.items.splice(index, 1, data)
  }
}

export function setItemDelete (state, id) {
  let index = state.items.findIndex(v => v.Id === id)
  if (index !== -1) {
    state.items.splice(index, 1)
  }
}
