import axios from 'axios'

export async function fetchMapVsk({
  commit,
}) {
  try {
    commit('SET_LOADING_STATUS', true)
    let landuse = await axios.get('../../../geoJSON/vsk_main_landuse.geojson')
    let construnctions = await axios.get('../../../geoJSON/vsk_main_construnctions.geojson')
    let railways = await axios.get('../../../geoJSON/vsk_main_railways.geojson')
    let roads = await axios.get('../../../geoJSON/vsk_main_roads.geojson')
    let response = {
      landuse: landuse.data,
      construnctions: construnctions.data,
      railways: railways.data,
      roads: roads.data
    }
    commit('SET_LOADING_STATUS', false)
    commit('SET_MAP_VSK', response)
  } catch (e) {
    console.error(e)
  }

}
