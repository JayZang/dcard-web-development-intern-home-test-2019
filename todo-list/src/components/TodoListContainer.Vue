<template>
  <div id="todo-list-container">
    <div class="todo-list-container-header">
      <TodoCreator class="todo-creator"/>
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
    ...mapActions(['createTodo'])
  },
  mounted () {
    console.log(this)
  }
}
</script>

<style>
#todo-list-container {
  padding: 15px;
}

#todo-list-container .todo-list-container-header {
  padding-left: 10px;
  padding-right: 10px;
  margin-bottom: 15px;
  display: flex;
}

#todo-list-container .todo-creator {
  max-width: 300px;
  flex-grow: 1;
}

#todo-flag-selector {
  padding: 5px;
  border-radius: 3px;
  outline: none;
  margin-left: auto;
}

#todo-list-container .todo-list-container-content {
  display: flex;
  flex-flow: wrap;
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
  #todo-list-container .todo-creator {
    max-width: 100%;
  }

  #todo-list-container .todo-item {
    width: calc(50% - 20px);
  }
}

@media (max-width: 450px) {
  #todo-list-container .todo-item {
    width: calc(100% - 20px);
    max-width: none;
  }
}
</style>
