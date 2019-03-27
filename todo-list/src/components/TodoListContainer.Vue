<template>
  <div id="todo-list-container">
    <div class="todo-list-container-header">
      <TodoCreator class="todo-creator"/>
      <button id="delete-done-todo-btn" @click.stop="deleteDoneTodosEvent">刪除已完成 Todo</button>
      <select id="todo-flag-selector" v-model="todoFilter">
        <option :value="TodoFlagEnum.ll" disabled selected style="text-align: center">--- 狀態過濾 ---</option>
        <option :value="TodoFlagEnum.all">全部</option>
        <option :value="TodoFlagEnum.done">已完成</option>
        <option :value="TodoFlagEnum.nonDone">未完成</option>
      </select>
    </div>
    <div class="todo-list-container-content">
      <TodoItem class="todo-item" v-for="todo in todos" :key="todo.id" :todo="todo"></TodoItem>
    </div>
  </div>
</template>

<script>
import TodoCreator from '@/components/TodoCreator'
import TodoItem from '@/components/TodoItem'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'TodoListContainer',
  components: {
    TodoCreator,
    TodoItem
  },
  data () {
    const TodoFlagEnum = {
      all: 'all',
      done: 'done',
      nonDone: 'Done'
    }

    return {
      TodoFlagEnum,
      todoFilter: TodoFlagEnum.all
    }
  },
  computed: {
    ...mapGetters(['allTodos', 'doneTodos', 'nonDoneTodos']),
    todos () {
      switch (this.todoFilter) {
        case this.TodoFlagEnum.all:
          return this.allTodos

        case this.TodoFlagEnum.done:
          return this.doneTodos

        case this.TodoFlagEnum.nonDone:
          return this.nonDoneTodos

        default:
          return this.allTodos
      }
    }
  },
  methods: {
    ...mapActions(['deleteDoneTodos']),
    deleteDoneTodosEvent () {
      const result = confirm('確定要刪除已完成 Todo ?')

      if (!result) return

      this.deleteDoneTodos()
    }
  }
}
</script>

<style>
#todo-list-container {
  padding: 15px;
}

#todo-list-container .todo-list-container-header {
  margin-bottom: 15px;
  display: flex;
  flex-wrap: wrap;
  background-color: white;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.4);
}

#todo-list-container .todo-creator {
  max-width: 400px;
  flex-grow: 1;
  margin-right: 10px;
}

#delete-done-todo-btn {
  margin-left: auto;
  margin-right: 10px;
  border-radius: 5px;
  background-color: #41b883;
  outline: none;
  border: 1px solid rgba(0, 0, 0, 0.2);
  color: white;
  font-weight: bold;
  letter-spacing: 0.15em;
  cursor: pointer;
}

#todo-flag-selector {
  padding: 5px;
  border-radius: 3px;
  outline: none;
}

#todo-list-container .todo-list-container-content {
  display: flex;
  flex-flow: wrap;
  align-items: center;
}

#todo-list-container .todo-item {
  margin: 20px 10px;
  width: calc(25% - 20px);
}

@media (max-width: 900px) {
  #todo-list-container .todo-item {
    width: calc(33.33% - 20px);
  }
}

@media (max-width: 600px) {
  #todo-list-container .todo-list-container-header {
    justify-content: center;
  }

  #todo-list-container .todo-creator {
    max-width: 100%;
    width: 100%;
    margin: 0 0 10px;
  }

  #delete-done-todo-btn {
    margin-left: 0;
  }

  #todo-list-container .todo-item {
    width: calc(50% - 20px);
  }
}

@media (max-width: 500px) {
  #todo-list-container .todo-item {
    width: calc(100% - 20px);
    max-width: none;
  }
}
</style>
