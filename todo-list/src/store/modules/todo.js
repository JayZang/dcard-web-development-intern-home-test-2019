/**
 * todo object type:
 * todo: {
 *  content: String,
 *  isDone: Boolean
 * }
 */

const state = {
  todoItems: [{
    content: '倒垃圾',
    isDone: false
  }, {
    content: '掃地',
    isDone: true
  }, {
    content: '洗馬桶洗馬桶洗馬桶洗馬桶洗馬桶洗馬桶洗馬桶洗馬桶洗馬桶洗馬桶洗馬桶洗馬桶洗馬桶洗馬桶洗馬桶洗馬桶洗馬桶洗馬桶洗馬桶洗馬桶洗馬桶洗馬桶洗馬桶洗馬桶洗馬桶洗馬桶洗馬桶洗馬桶洗馬桶洗馬桶洗馬桶洗馬桶',
    isDone: true
  }, {
    content: '洗馬桶',
    isDone: true
  }, {
    content: '洗馬桶',
    isDone: true
  }, {
    content: '洗馬桶',
    isDone: true
  }, {
    content: '洗馬桶',
    isDone: true
  }]
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
  }
}

const mutations = {
  pushTodo (state, todo) {
    state.todoItems.push(todo)
  }
}

export class Todo {
  constructor (content) {
    this.content = content
    this.isDone = false
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}