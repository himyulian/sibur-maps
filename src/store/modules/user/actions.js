import { sp } from '@pnp/sp'

export async function actFetchCurrentUser ({ commit }) {
  try {
    commit('setLoadingStatus', true)
    let currentUser = await sp.profiles.myProperties.get()
    commit('setLoadingStatus', false)
    commit('setCurrentUser', currentUser)
  } catch (e) {
    console.error('Ошибка в получении текущего пользователя', e)
  }
}
