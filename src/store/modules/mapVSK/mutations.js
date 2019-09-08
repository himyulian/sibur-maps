export function setLoadingStatus (state, status) {
  state.loading = status
}

export function setZoom (state, zoom) {
  state.mapInstance.zoom = zoom
}

export function setCenter (state, center) {
  state.mapInstance.center = center
}

export function setBounds (state, bounds) {
  state.mapInstance.bounds = bounds
}

export function setMapVSK (state, data) {
  state.mapVSK = data
}

