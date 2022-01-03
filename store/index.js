// import { getMenu } from '../plugins/getMenu.js'

export const state = () => ({
  menu: [],
  panelOpen: false,
})

export const mutations = {
  setMenu(state, menu) {
    state.menu = menu
  },
  setPanelOpen(state, status = undefined) {
    if (status !== undefined) {
      state.panel = status
    }
    state.panelOpen = !state.panelOpen
  },
}

export const getters = {
  getMenu(state) {
    return state.menu
  },
  getPanelOpen(state) {
    return state.panelOpen
  },
}

export const actions = {
  async nuxtServerInit(context, { $content }) {
    const contentFiles = await $content({ deep: true })
      .only(['path', 'title', 'description', 'slug', 'order'])
      .fetch()
    if (process.server) {
      const { getMenu } = require('../plugins/getMenu.js')
      const menu = getMenu(contentFiles)
      context.commit('setMenu', menu)
    }
  },
  setPanelOpen({ commit }, status = undefined) {
    commit('setPanelOpen', status)
  },
}
