import { sp } from '@pnp/sp'
import { Notify } from 'quasar'

export async function actAddItemToSP ({ commit, getters }, data) {
  commit('setLoadingStatus', true)
  try {
    let addResult = await sp.web.getList('/orgunits/vsk/map/Lists/Reestr').items.add({
      Title: data.title,
      CoordPoint: `${data.point.lat}, ${data.point.lng}`,
    })
    let result = addResult.data
    result.CoordPoint = result.CoordPoint.split(', ').map(v => Number(v))
    commit('setLoadingStatus', false)
    commit('setDyalogForNewMarker', false)
    commit('setAddNewMarker', result)
    console.log('addResult', result)
    Notify.create({
      color: 'green-4',
      textColor: 'white',
      icon: 'fas fa-check-circle',
      message: 'Маркер добавлен на карту'
    })
  } catch (e) {
    commit('setLoadingStatus', false)
    // commit('setDyalogForNewMarker', false)
    Notify.create({
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
    let result = items.map(value => {
      value.CoordPoint = value.CoordPoint.split(', ').map(v => Number(v))
      return value
    })
    commit('setItems', result)
    console.log('items', result)
  } catch (e) {
    console.error('Ошибка при загрузке записей из реестра', e)
  }
}

