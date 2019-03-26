<template>
  <div class="todo-item">{{ todo.content }}</div>
</template>

<script>
export default {
  name: 'TodoItem',
  props: {
    todo: Object
  }
}
</script>

<style>
.todo-item {
  background-color: white;
  padding: 15px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.4);
  width: 100%;
  max-width: 300px;
  border-radius: 5px;
  box-sizing: border-box;
  height: 150px;
  overflow-y: scroll;
}

/*滾動調整體部分*/
.todo-item::-webkit-scrollbar{
  width: 7px;
  height: 7px;
  border-radius: 4px;
  background-color: #f0f0f0;
}

/*滾動條兩端箭頭*/
.todo-item::-webkit-scrollbar-button{
  display: none;
}

/*滾動條內側部分去掉*/
.todo-item::-webkit-scrollbar-track-piece {
  display: none;
}

/*滚动條中可以拖動之部分*/
.todo-item::-webkit-scrollbar-thumb{
  background-color: #24292e;
  border-radius: 4px;
}

/*變角部分*/
.todo-item::-webkit-scrollbar-corner {
  display: none;
}

.todo-item::-webkit-resizer{
  display: none;
}
</style>
