import { sp } from '@pnp/sp'

export function fetchCurrentUser({ commit }) {
  commit('SET_LOADING_STATUS', 'loading')
  sp.profiles.myProperties.get().then((currentUser) => {
    console.log("TCL: fetchCurrentUser -> currentUser", currentUser)
    commit('SET_LOADING_STATUS', 'notLoading')
    commit('SET_CURRENT_USER', currentUser)
  }).catch((err) => console.error(err))
}
