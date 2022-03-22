import axios from './axios/index'
import Store from './weux/index'
import { mapState, mapMutations, mapActions, mapGetters, createNamespacedHelpers } from './weux/mapFactory'
export * from './globalProxy/globalPage'
export * from './globalProxy/globalComponent'

export default {
  axios,
  Store,
  mapState,
  mapMutations,
  mapActions,
  mapGetters,
  createNamespacedHelpers
}

export {
  axios,
  Store,
  mapState,
  mapMutations,
  mapActions,
  mapGetters,
  createNamespacedHelpers
}