import Vue from 'vue'
import Vuex from 'vuex'

import mapVSK from './modules/mapVSK'
import user from './modules/user'
import SP from './modules/SP'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      mapVSK,
      user,
      SP,
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
