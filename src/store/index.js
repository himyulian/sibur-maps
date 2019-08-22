import Vue from 'vue'
import Vuex from 'vuex'

import moduleMapVSK from './modules/mapVSK'
import moduleUser from './modules/user'
import moduleSP from './modules/SP'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      moduleMapVSK,
      moduleUser,
      moduleSP
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
