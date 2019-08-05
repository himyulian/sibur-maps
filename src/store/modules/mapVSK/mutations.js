export function SET_LOADING_STATUS (state, status) {
  state.loadingStatus = status
}

export function SET_DATA (state, payload) {
  state.data = payload
}

export function SET_ZOOM (state, zoom) {
  state.mapInstance.zoom = zoom
}

export function SET_CENTER (state, center) {
  state.mapInstance.center = center
}

export function SET_BOUNDS (state, bounds) {
  state.mapInstance.bounds = bounds
}
