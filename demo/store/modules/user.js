const state = {
   count: 100,
   userInfo: {
     name: 'jack',
     age: 18,
     other: {
        favorite: 'none'
     }
   }
}

const mutations = {
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_COUNT: (state, count) => {
      state.count = count
    },
}

const getters = {
  doubleCount (state) {
    return state.count * 2
  }
}

const actions = {
    LOGIN({ commit }, userInfo) {
       commit('SET_USER_INFO', userInfo)
    }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}