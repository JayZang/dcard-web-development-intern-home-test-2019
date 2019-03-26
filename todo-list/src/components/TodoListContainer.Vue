<template>
  <div id="todo-list-container">
    <TodoItem class="todo-item" v-for="(todo, index) in todos" :key="index" :todo="todo"></TodoItem>
  </div>
</template>

<script>
import TodoItem from '@/components/TodoItem'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'TodoListContainer',
  components: {
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
  display: flex;
  flex-flow: wrap;
  padding: 15px;
}

#todo-list-container .todo-item {
  margin: 10px;
  width: calc(25% - 20px);
}

@media (max-width: 900px) {
  #todo-list-container .todo-item {
    width: calc(33.33% - 20px);
  }
}

@media (max-width: 600px) {
  #todo-list-container .todo-item {
    width: calc(50% - 20px);
  }
}

</style>
