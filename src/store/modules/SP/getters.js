export function getMarkers (state) {
  return state.items && state.items.map(v => v.CoordPoint.split(', ').map(v => Number(v)))
}
