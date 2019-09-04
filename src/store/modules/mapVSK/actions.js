import axios from 'axios'

export async function actFetchMapVSKmodeDEV ({ commit }) {
  try {
    commit('setLoadingStatus', true)
    let landuse         = await axios.get('../../../geoJSON/vsk_main_landuse.geojson')
    let construnctions  = await axios.get('../../../geoJSON/vsk_main_construnctions.geojson')
    let railways        = await axios.get('../../../geoJSON/vsk_main_railways.geojson')
    let roads           = await axios.get('../../../geoJSON/vsk_main_roads.geojson')
    commit('setLoadingStatus', false)
    let response = {
      landuse: landuse.data,
      construnctions: construnctions.data,
      railways: railways.data,
      roads: roads.data
    }
    commit('setMapVSK', response)
  } catch (e) {
    console.error('Ошибка при загрузке карты ВСК', e)
  }
}

export async function actFetchMapVSKmodePROD ({ commit }) {
  try {
    commit('setLoadingStatus', true)
    let landuse         = await axios.get('https://sharepoint/orgunits/vsk/map/SiteAssets/GeoJSON/VSK/EPSG4326/vsk_main_landuse.geojson')
    let construnctions  = await axios.get('https://sharepoint/orgunits/vsk/map/SiteAssets/GeoJSON/VSK/EPSG4326/vsk_main_construnctions.geojson')
    let railways        = await axios.get('https://sharepoint/orgunits/vsk/map/SiteAssets/GeoJSON/VSK/EPSG4326/vsk_main_railways.geojson')
    let roads           = await axios.get('https://sharepoint/orgunits/vsk/map/SiteAssets/GeoJSON/VSK/EPSG4326/vsk_main_roads.geojson')
    commit('setLoadingStatus', false)
    let response = {
      landuse: landuse.data,
      construnctions: construnctions.data,
      railways: railways.data,
      roads: roads.data
    }
    commit('setMapVSK', response)
  } catch (e) {
    console.error('Ошибка при загрузке карты ВСК', e)
  }
}
