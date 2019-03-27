<template>
  <div id="todo-list-container">
    <div class="todo-list-container-header">
      <TodoCreator class="todo-creator"/>
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
  computed: {
    ...mapGetters(['allTodos', 'doneTodos', 'nonDoneTodos']),
    todos () {
      return this.allTodos
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
}

#todo-list-container .todo-creator {
  max-width: 300px;
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
