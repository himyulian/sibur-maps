import { sp } from '@pnp/sp'

export async function fetchCurrentUser ({ commit, getters }) {
  try {
    commit('setLoadingStatus', true)
    let currentUser = await sp.profiles.myProperties.get()
    commit('setLoadingStatus', false)
    commit('setCurrentUser', currentUser)
    console.log('currentUser', currentUser)
    console.log('currentUserProps', getters.getCurrentUserProps)
    console.log('currentUserCompany', getters.getCurrentUserCompany)
  } catch (e) {
    console.error('Ошибка в получении текущего пользователя', e)
  }
}