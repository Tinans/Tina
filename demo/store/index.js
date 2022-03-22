import { Store } from 'tina-weapp'
import app from './modules/app'
import user from './modules/user'
import getters from './getters'

export default new Store ({
  modules: {
    app,
    user
  },
  getters
})
