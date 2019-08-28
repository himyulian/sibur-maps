export function getFeaturesVSKMainLanduse (state) {
  return state.mapVSK && state.mapVSK.landuse.features
}

export function getFeaturesVSKMainConstrunctions (state) {
  return state.mapVSK && state.mapVSK.construnctions.features
}

export function getFeaturesVSKMainRailways (state) {
  return state.mapVSK && state.mapVSK.railways.features
}

export function getFeaturesVSKMainRoads (state) {
  return state.mapVSK && state.mapVSK.roads.features
}

export function getMarker (state, idx) {
  return state.newMarkers && state.newMarkers[idx]
}