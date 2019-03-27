/**
 * todo object type:
 * todo: {
 *  id: string,
 *  content: String,
 *  isDone: Boolean
 * }
 */

import crypto from 'crypto'

const sha256 = crypto.createHash('sha256')

export class Todo {
  constructor(content) {
    const timestamp = new Date().valueOf()

    sha256.update(`todo_${timestamp}`);

    this.id = sha256.digest('hex')
    this.content = content
    this.isDone = false
  }
}

const state = {
  todoItems: [
    new Todo('倒垃圾'), 
    new Todo('掃地'), 
    new Todo('洗馬桶洗馬桶洗馬桶洗馬桶洗馬桶洗馬桶洗馬桶洗馬桶洗馬桶洗馬桶洗馬桶洗馬桶洗馬桶洗馬桶洗馬桶洗馬桶洗馬桶洗馬桶洗馬桶洗馬桶洗馬桶洗馬桶洗馬桶洗馬桶洗馬桶洗馬桶洗馬桶洗馬桶洗馬桶洗馬桶洗馬桶洗馬桶'), 
    new Todo('洗馬桶'), 
    new Todo('洗馬桶'), 
    new Todo('洗馬桶洗馬桶洗馬桶洗馬桶洗馬桶'), 
    new Todo('洗馬桶'), 
    new Todo('洗馬桶'), 
    new Todo('洗馬桶')
  ]
}

const getters = {
  allTodos (state) {
    return state.todoItems
  },
  doneTodos (state) {
    return state.todoItems.filter(item => item.isDone === true)
  },
  nonDoneTodos() {
    return state.todoItems.filter(item => item.isDone === false)
  }
}

const actions = {
  createTodo ({ commit }, content) {
    if (!content || typeof content !== 'string')
      return false

    let todo = new Todo(content)
    commit('pushTodo', todo)
    return todo
  },
  editTodo ({ commit }, param) {
    let {
      id,
      content
    } = param

    if (!id || !content) return

    commit('editTodoById', param)
  },
  deleteTodo ({ commit }, id) {
    if (!id) return

    commit('deleteTodoById', id)
  },
  changeTodoFlag ({ commit }, param) {
    let {
      id,
      isDone
    } = param

    if (!id || isDone === undefined) return
    console.log(isDone)
    commit('changeTodoFlagById', param)
  },
  deleteDoneTodos ({ commit }) {
    commit('deleteDoneTodos')
  },
}

const mutations = {
  pushTodo (state, todo) {
    state.todoItems.unshift(todo)
  },
  editTodoById (state, param) {
    const todo = state.todoItems.find(item => item.id === param.id)
    todo.content = param.content
  },
  deleteTodoById (state, id) {
    const index = state.todoItems.findIndex(item => item.id === id)
    state.todoItems.splice(index, 1)
  },
  changeTodoFlagById (state, param) {
    const todo = state.todoItems.find(item => item.id === param.id)
    todo.isDone = param.isDone
  },
  deleteDoneTodos (state) {
    state.todoItems = state.todoItems.filter(item => !item.isDone)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}