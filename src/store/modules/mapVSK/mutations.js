export function SET_LOADING_STATUS(state, status) {
  state.loading = status
}

export function SET_ZOOM(state, zoom) {
  state.mapInstanceVSK.zoom = zoom
}

export function SET_CENTER(state, center) {
  state.mapInstanceVSK.center = center
}

export function SET_BOUNDS(state, bounds) {
  state.mapInstanceVSK.bounds = bounds
}

export function SET_MAP_VSK(state, geojsonData) {
  state.mapVsk = geojsonData
}
