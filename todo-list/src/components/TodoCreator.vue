<template>
  <div id='todo-creator'>
    <input type="text" placeholder="新增 Todo" v-model="content" @keydown.enter="addTodoEvent">
    <button @click.stop="addTodoEvent"><i class="fas fa-plus"></i></button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'TodoCreator',
  data () {
    return {
      content: ''
    }
  },
  methods: {
    ...mapActions(['createTodo']),
    addTodoEvent () {
      const content = this.content.trim()

      if (!content) return

      this.createTodo(content)
      this.content = ''
    }
  }
}
</script>

<style>
#todo-creator {
  display: flex;
  align-items: center;
}

#todo-creator input {
  padding: 5px 10px;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  outline: none;
  border: 1px solid rgba(0, 0, 0, 0.2);
  flex-grow: 1;
}

#todo-creator button {
  background-color: #339af0e0;
  outline: none;
  border: 0;
  color: white;
  padding: 6px 14px;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  cursor: pointer;
  transition: 300ms;
}

#todo-creator button:hover {
  background-color: #339af0;
}
</style>
