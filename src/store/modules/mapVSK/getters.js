export function vsk_main_landuse(state) {
  return state.mapVsk && state.mapVsk.landuse.features
}

export function vsk_main_construnctions(state) {
  return state.mapVsk && state.mapVsk.construnctions.features
}

export function vsk_main_railways(state) {
  return state.mapVsk && state.mapVsk.railways.features
}

export function vsk_main_roads(state) {
  return state.mapVsk && state.mapVsk.roads.features
}
