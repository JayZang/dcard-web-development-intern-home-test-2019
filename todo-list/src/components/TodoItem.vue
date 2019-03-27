<template>
  <div class="todo-item"
    :class="{ 'delete-animation': isDeleting }"
    :data-id="todo.id"
    @click="isOpenPanel = isEditMode ? false : !isOpenPanel">
    <div class="done-sign" v-if="!isEditMode && todo.isDone">
      <i class="fas fa-check"></i>
    </div>
    <div class="todo-edit-content-btns">
      <button class="todo-edit-submit" v-if="isEditMode" @click.stop="editTodoSubmitEvent">送出</button>
      <button class="todo-edit-close" v-if="isEditMode" @click.stop="editTodoCloseEvent">取消</button>
    </div>
    <textarea class="todo-item-content" cols="30" rows="10" v-model="todoContent" :disabled="!isEditMode"></textarea>
    <div class="todo-edit-panel" :class="{ show: isOpenPanel }">
      <button class="todo-edit-flag-btn" :class="{ done: todo.isDone }" @click.stop="changeTodoFlagEvent">{{ todo.isDone ? '未完成' : '完成'}}</button>
      <button class="todo-edit-edit-btn" @click="isEditMode = true">編輯</button>
      <button class="todo-edit-delete-btn" @click.stop="deleteTodoEvent">刪除</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { setTimeout } from 'timers'

export default {
  name: 'TodoItem',
  data () {
    return {
      isOpenPanel: false,
      isEditMode: false,
      isDeleting: false,
      todoContent: ''
    }
  },
  props: {
    todo: Object
  },
  methods: {
    ...mapActions(['editTodo', 'deleteTodo', 'changeTodoFlag']),
    changeTodoFlagEvent () {
      const todo = this.todo
      this.changeTodoFlag({
        id: todo.id,
        isDone: !todo.isDone
      })
      this.isOpenPanel = false
    },
    editTodoSubmitEvent () {
      const todo = this.todo
      const content = this.todoContent.trim()
      this.editTodo({
        id: todo.id,
        content
      })
      this.isEditMode = false
    },
    editTodoCloseEvent () {
      this.todoContent = this.todo.content
      this.isEditMode = false
    },
    deleteTodoEvent () {
      this.isDeleting = true
      const todoId = this.todo.id
      setTimeout(() => {
        this.deleteTodo(todoId)
      }, 300)
    }
  },
  mounted () {
    this.todoContent = this.todo.content
  }
}
</script>

<style>
.todo-item {
  background-color: white;
  padding: 15px;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.4);
  width: 100%;
  border-radius: 5px;
  box-sizing: border-box;
  border: 1px solid rgba(0, 0, 0, 0.2);
  transition: 400ms;
  position: relative;
}

.todo-item:hover {
  transform: translateY(-5px);
  box-shadow: 5px 8px 5px rgba(0, 0, 0, 0.4);
}

.todo-item.delete-animation {
  transform: scale(0.01);
}

.todo-item .done-sign {
  position: absolute;
  right: 0;
  top: 0;
  font-size: 36px;
  transform: translate(43%, -47%);
  color: #41b883;
  z-index: 1;
}

.todo-item .todo-item-content {
  overflow-y: scroll;
  height: 150px;
  width: 100%;
  box-sizing: border-box;
  border: 0px;
  outline: none;
}

.todo-item .todo-item-content:disabled {
  background-color: white;
}

.todo-item .todo-edit-panel {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(0, 0, 0, 0.6);
  border-radius: 5px;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 15px 0;
  box-sizing: border-box;
  transform: translate3d(0px ,-50%, -600px) rotateX(-90deg);
  transition: 600ms ease;
}

.todo-item .todo-edit-panel.show {
  transform: translate3d(0, 0, 0) rotateX(0);
}

.todo-item .todo-edit-panel button {
  padding: 10px;
  background-color: white;
  color: white;
  font-weight: 600;
  outline: none;
  border: 0;
  width: 60%;
  cursor: pointer;
  letter-spacing: 0.3em;
  border-radius: 5px;
}

.todo-item .todo-edit-panel button.todo-edit-flag-btn {
  background-color: #41b883;
}

.todo-item .todo-edit-panel button.todo-edit-flag-btn.done {
  background-color: #0062cc;
}

.todo-item .todo-edit-panel button.todo-edit-edit-btn {
  background-color: #f5bf1e;
}

.todo-item .todo-edit-panel button.todo-edit-delete-btn {
  background-color: #dd4b39;
}

.todo-item .todo-edit-content-btns {
  position: absolute;
  top: -1px;
  right: 0;
  transform: translateY(-100%);
}

.todo-item .todo-edit-content-btns button {
  background-color: white;
  outline: none;
  border: 0;
  padding: 5px 10px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.todo-item button.todo-edit-submit {
  background-color: #41b883;
}

.todo-item button.todo-edit-close {
  background-color: #dd4b39;
}

/*滾動調整體部分*/
.todo-item .todo-item-content::-webkit-scrollbar {
  width: 7px;
  height: 7px;
  border-radius: 4px;
  background-color: #f0f0f0;
}

/*滾動條兩端箭頭*/
.todo-item .todo-item-content::-webkit-scrollbar-button {
  display: none;
}

/*滾動條內側部分去掉*/
.todo-item .todo-item-content::-webkit-scrollbar-track-piece {
  display: none;
}

/*滚动條中可以拖動之部分*/
.todo-item .todo-item-content::-webkit-scrollbar-thumb {
  background-color: #24292e;
  border-radius: 4px;
}

/*變角部分*/
.todo-item .todo-item-content::-webkit-scrollbar-corner {
  display: none;
}

.todo-item .todo-item-content::-webkit-resizer {
  display: none;
}
</style>
