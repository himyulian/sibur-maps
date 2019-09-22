import { sp } from '@pnp/sp'
import { Notify } from 'quasar'

export async function actSPItemsFetch ({ commit }) {
  try {
    let items = await sp.web.getList('/orgunits/vsk/map/Lists/Reestr').items.getAll()
    items = items.map(item => {
      item.CoordPoint    = item.CoordPoint    ? JSON.parse(item.CoordPoint)    : ''
      item.CoordPolyline = item.CoordPolyline ? JSON.parse(item.CoordPolyline) : ''
      return item
    })
    commit('setItems', items)
    console.log('items', items)
  } catch (e) {
    console.error('Ошибка при загрузке записей из реестра', e)
  }
}

export async function actSPItemAdd ({ commit }, data) {
  commit('setLoadingStatus', true)
  try {
    let addResult = await sp.web.getList('/orgunits/vsk/map/Lists/Reestr').items.add({
      Title         : data.title,
      CoordPoint    : data.point    ? JSON.stringify(data.point)    : '',
      CoordPolyline : data.polyline ? JSON.stringify(data.polyline) : '',
    })
    let item = addResult.data
    item.CoordPoint    = item.CoordPoint    ? JSON.parse(item.CoordPoint)    : ''
    item.CoordPolyline = item.CoordPolyline ? JSON.parse(item.CoordPolyline) : ''
    commit('setLoadingStatus', false)
    commit('setDyalogItemAdd', false)
    commit('setItemAdd', item)
    commit('setClearFields')
    console.log('addResult', item)
    Notify.create({
      color: 'green-4',
      textColor: 'white',
      icon: 'fas fa-check-circle',
      message: 'Данные сохранены на сервере'
    })
  } catch (e) {
    commit('setLoadingStatus', false)
    Notify.create({
      color: 'red-4',
      textColor: 'white',
      icon: 'fas fa-exclamation-circle',
      message: 'Ошибка при сохранении данных'
    })

  }
}

export async function actSPItemUpdate ({ commit }, data) {
  commit('setLoadingStatus', true)
  try {
    await sp.web.getList('/orgunits/vsk/map/Lists/Reestr').items.getById(data.Id).update({
      Title: data.Title,
    })
    commit('setLoadingStatus', false)
    commit('setDyalogItemEdit', false)
    commit('setItemUpdate', data)
    Notify.create({
      color: 'green-4',
      textColor: 'white',
      icon: 'fas fa-check-circle',
      message: 'Данные сохранены'
    })
  } catch (e) {
    commit('setLoadingStatus', false)
    Notify.create({
      color: 'red-4',
      textColor: 'white',
      icon: 'fas fa-exclamation-circle',
      message: 'Ошибка при сохранении данных'
    })

  }
}

export async function actSPItemDelete ({ commit }, id) {
  commit('setLoadingStatus', true)
  try {
    await sp.web.getList('/orgunits/vsk/map/Lists/Reestr').items.getById(id).delete()
    commit('setLoadingStatus', false)
    commit('setClearClickedItem')
    commit('setItemDelete', id)
    Notify.create({
      color: 'green-4',
      textColor: 'white',
      icon: 'fas fa-check-circle',
      message: 'Элемент удален'
    })
  } catch (e) {
    commit('setLoadingStatus', false)
    Notify.create({
      color: 'red-4',
      textColor: 'white',
      icon: 'fas fa-exclamation-circle',
      message: 'Ошибка при удалении'
    })
  }
}

export function actClearFields ({ commit }) {
  commit('setClearFields')
}
