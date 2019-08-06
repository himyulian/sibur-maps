import axios from 'axios'

export async function fetchData({
  commit
}) {
  try {
    commit('SET_LOADING_STATUS', 'loading')
    let response = await axios.get('https://jsonplaceholder.typicode.com/posts')
    commit('SET_LOADING_STATUS', 'notLoading')
    commit('SET_DATA', response.data)
  } catch (e) {
    console.error(e)
  }

}

export async function fetchMapVsk({
  commit,
  getters
}) {
  try {
    commit('SET_LOADING_STATUS', 'loading')
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
    commit('SET_LOADING_STATUS', 'notLoading')
    commit('SET_MAP_VSK', response)
    console.log(getters.GET_VSK_LANDUSE)
    console.log(response)
  } catch (e) {
    console.error(e)
  }

}
