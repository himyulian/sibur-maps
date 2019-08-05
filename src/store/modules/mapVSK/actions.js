import axios from 'axios'

export function fetchData ({ commit }) {
  commit('SET_LOADING_STATUS', 'loading')
  axios.get('https://jsonplaceholder.typicode.com/posts').then(response => {
    commit('SET_LOADING_STATUS', 'notLoading')
    commit('SET_DATA', response.data)
  })
}
