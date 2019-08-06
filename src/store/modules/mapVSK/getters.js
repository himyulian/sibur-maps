export function GET_DATA(state) {
  return state.data
}

export function GET_VSK_LANDUSE(state) {
  return state.mapVsk && state.mapVsk.landuse.features[0].geometry.coordinates[0][0].map(v => {
    return [v[0], v[1]] = [v[1], v[0]]
  }) || []
}
