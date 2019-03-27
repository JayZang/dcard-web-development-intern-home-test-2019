<template>
  <div id="todo-list-app">
    <div class="header">
      <span>
        Todo List
      </span>
    </div>
    <TodoListContainer/>
  </div>
</template>

<script>
import TodoListContainer from '@/components/TodoListContainer'

export default {
  name: 'App',
  components: {
    TodoListContainer
  }
}
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  background-color: #f1f8ff;
}

#todo-list-app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0 auto;
  height: 100%;
}

#todo-list-app .header {
  text-align: center;
  padding: 20px 30px;
  background-color: #24292e;
  color: white;
  font-size: 22px;
  font-weight: bold;
}

/*滾動調整體部分*/
body::-webkit-scrollbar {
  width: 7px;
  height: 7px;
  border-radius: 4px;
  background-color: #f0f0f0;
}

/*滾動條兩端箭頭*/
body::-webkit-scrollbar-button {
  display: none;
}

/*滾動條內側部分去掉*/
body::-webkit-scrollbar-track-piece {
  display: none;
}

/*滚动條中可以拖動之部分*/
body::-webkit-scrollbar-thumb {
  background-color: #24292e;
  border-radius: 4px;
}

/*變角部分*/
body::-webkit-scrollbar-corner {
  display: none;
}

body::-webkit-resizer {
  display: none;
}
</style>
