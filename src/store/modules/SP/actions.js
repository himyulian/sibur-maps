import { sp } from '@pnp/sp'

export async function addItemToSP ({ commit, getters }, point) {
  console.log(`${point.lat}, ${point.lng}`)
  try {
    let addResult = await sp.web.getList('/orgunits/vsk/map/Lists/Reestr').items.add({
      Title: 'New Item',
      CoordPoint: `${point.lat}, ${point.lng}`
    })
    console.log('addResult', addResult)
  } catch (e) {
    console.error('Ошибка внесения новой записи в реестр', e)
  }
}

export async function fetchItemsFromSP ({ commit, getters }) {
  try {
    let items = await sp.web.getList('/orgunits/vsk/map/Lists/Reestr').items.getAll()
    console.log('items', items)
  } catch (e) {
    console.error('Ошибка при загрузке записей из реестра', e)
  }
}