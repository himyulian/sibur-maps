export function setLoadingStatus (state, status) {
  state.loading = status
}

export function setZoom (state, zoom) {
  state.mapInstanceVSK.zoom = zoom
}

export function setCenter (state, center) {
  state.mapInstanceVSK.center = center
}

export function setBounds (state, bounds) {
  state.mapInstanceVSK.bounds = bounds
}

export function setMapVSK (state, geojsonData) {
  state.mapVSK = geojsonData
}

export function setCreatedMarkerLatLong (state, latlng) {
  state.createdMarkerLatLong = latlng
}
