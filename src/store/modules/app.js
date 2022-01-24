const state = {
  title: '기본 타이틀'
}

const mutations = {
  SET_TITLE: (state, title) => {
    state.title = title
  },
}

const actions = {
  setTitle({ commit }, title) {
    commit('SET_TITLE', title)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
