import { sp } from '@pnp/sp'

export async function actAddItemToSP ({ commit, getters }, data) {
  try {
    let addResult = await sp.web.getList('/orgunits/vsk/map/Lists/Reestr').items.add({
      Title: data.title,
      CoordPoint: `${data.point.lat}, ${data.point.lng}`,
    })
    console.log('addResult', addResult)
    this.$q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'fas fa-check-circle',
      message: 'Маркер добавлен на карту'
    })
  } catch (e) {
    console.error('Ошибка внесения новой записи в реестр', e)
    this.$q.notify({
      color: 'red-4',
      textColor: 'white',
      icon: 'fas fa-exclamation-circle',
      message: 'Ошибка при сохранении данных'
    })
  }
}

export async function actFetchItemsFromSP ({ commit, getters }) {
  try {
    let items = await sp.web.getList('/orgunits/vsk/map/Lists/Reestr').items.getAll()
    commit('setItems', items)
    console.log('items', items)
    console.log('markers', getters.getMarkers)
  } catch (e) {
    console.error('Ошибка при загрузке записей из реестра', e)
  }
}

export function actSetNewMarkerLatLng ({ commit }, latlng) {
  commit('setNewMarkerLatLng', latlng)
}
