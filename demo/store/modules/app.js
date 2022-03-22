const state = {
   number: 40
}

const mutations = {
   SET_NUM(state, num) {
     state.number = num 
   }
}

const actions = {
   CHANGE_NUM ({ commit }, num) {
      commit('SET_NUM', num)
   }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}