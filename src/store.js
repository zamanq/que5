import Vue from 'vue'
import Vuex from 'vuex'

import localStorage from './api/localStorageService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: [],
    completed: [],
    dataFields: ['todos', 'completed']
  },
  mutations: {
    setState(state, { field, data }) {
      Vue.set(state, field, data)
    },
    addTodo(state, newTodo) {
      state.todos.push(newTodo)
    },
    deleteTodo(state, { todoIndex, isCompleted }) {
      if (isCompleted) {
        state.completed.splice(todoIndex, 1)
      } else {
        state.todos.splice(todoIndex, 1)
      }
    },
    deleteCompleted(state) {
      state.completed.splice(0, state.completed.length)
    },
    completeTodo(state, todoIndex) {
      state.completed.push(state.todos.splice(todoIndex, 1)[0])
    }
  },
  actions: {
    addTodo({ commit, dispatch }, newTodo) {
      commit('addTodo', newTodo)
      dispatch('saveTodos')
    },
    deleteTodo({ commit, dispatch }, todoIndex) {
      commit('deleteTodo', todoIndex)
      dispatch('saveTodos')
    },
    deleteCompleted({ commit, dispatch }, state) {
      commit('deleteCompleted', state)
      dispatch('saveTodos')
    },
    completeTodo({ commit, dispatch }, todoIndex) {
      commit('completeTodo', todoIndex)
      dispatch('saveTodos')
    },
    checkStorage({ state, commit }) {
      state.dataFields.forEach(field => {
        let data = localStorage.checkStorage(field)

        // LocalStorage did not find the data, reset it
        if (data === null) data = []
        commit('setState', { field, data })
      })
    },
    saveTodos({ state }) {
      state.dataFields.forEach(field => localStorage.saveToStorage(field, state[field]))
    }
  }
})
