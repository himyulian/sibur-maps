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

export function setNewMarker (state, data) {
  // * добавляет новый маркер и возвращает его индекс
  return state.newMarkers.push(data) - 1
}

export function setMarkerLatLng (state, idx, latlng) {
  state.newMarkers[idx].setLatLng(latlng)
}