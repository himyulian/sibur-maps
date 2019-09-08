import axios from 'axios'

export function actSetCenter ({ commit }, center) {
  commit('setCenter', center)
}

export async function actFetchMapVSKmodeDEV ({ commit }) {
  try {
    commit('setLoadingStatus', true)
    let mainLanduse         = await axios.get('../../../geoJSON/vsk_main_landuse.geojson')
    let mainConstrunctions  = await axios.get('../../../geoJSON/vsk_main_construnctions.geojson')
    let mainRailways        = await axios.get('../../../geoJSON/vsk_main_railways.geojson')
    let mainRoads           = await axios.get('../../../geoJSON/vsk_main_roads.geojson')
    let d1Landuse           = await axios.get('../../../geoJSON/vsk_D1_landuse.geojson')
    let d1Construnctions    = await axios.get('../../../geoJSON/vsk_D1_construnctions.geojson')
    let d1Railways          = await axios.get('../../../geoJSON/vsk_D1_railways.geojson')
    let d1Roads             = await axios.get('../../../geoJSON/vsk_D1_roads.geojson')
    let o61Landuse          = await axios.get('../../../geoJSON/vsk_61_landuse.geojson')
    let o61Construnctions   = await axios.get('../../../geoJSON/vsk_61_construnctions.geojson')
    let o61Roads            = await axios.get('../../../geoJSON/vsk_61_roads.geojson')
    commit('setLoadingStatus', false)
    let response = {
      main: {
        landuse: mainLanduse.data,
        construnctions: mainConstrunctions.data,
        railways: mainRailways.data,
        roads: mainRoads.data
      },
      d1: {
        landuse: d1Landuse.data,
        construnctions: d1Construnctions.data,
        railways: d1Railways.data,
        roads: d1Roads.data
      },
      o61: {
        landuse: o61Landuse.data,
        construnctions: o61Construnctions.data,
        roads: o61Roads.data
      },
    }
    commit('setMapVSK', response)
  } catch (e) {
    console.error('Ошибка при загрузке карты ВСК', e)
  }
}

export async function actFetchMapVSKmodePROD ({ commit }) {
  try {
    commit('setLoadingStatus', true)
    let mainLanduse         = await axios.get('https://sharepoint/orgunits/vsk/map/SiteAssets/GeoJSON/VSK/EPSG4326/vsk_main_landuse.geojson')
    let mainConstrunctions  = await axios.get('https://sharepoint/orgunits/vsk/map/SiteAssets/GeoJSON/VSK/EPSG4326/vsk_main_construnctions.geojson')
    let mainRailways        = await axios.get('https://sharepoint/orgunits/vsk/map/SiteAssets/GeoJSON/VSK/EPSG4326/vsk_main_railways.geojson')
    let mainRoads           = await axios.get('https://sharepoint/orgunits/vsk/map/SiteAssets/GeoJSON/VSK/EPSG4326/vsk_main_roads.geojson')
    commit('setLoadingStatus', false)
    let response = {
      main: {
        landuse: mainLanduse.data,
        construnctions: mainConstrunctions.data,
        railways: mainRailways.data,
        roads: mainRoads.data
      },

    }
    commit('setMapVSK', response)
  } catch (e) {
    console.error('Ошибка при загрузке карты ВСК', e)
  }
}
