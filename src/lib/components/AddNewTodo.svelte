<script lang="ts">
  import { sendData } from "../../api/sendData";
  import {sideBarActivate, todoItems} from "../../store/stores";
  import type {ITodo} from "../../types/types.ts";

  let value = '';

  const addTodo = (event: MouseEvent) => {
    event.preventDefault();
    if (!value) {
      return alert('Input some name for your todo')
    }
  
    const newTodo: ITodo = {
      id: Date.now(),
      completed: false,
      title: value,
    };
  
    todoItems.update(async (todos: ITodo[]) => {
      sendData('http://localhost:3001/todos', newTodo);

      return [...todos, newTodo]
    });
    
    value = '';
    sideBarActivate.update((n: boolean) => !n);
  }
</script>

<form class="todo-form">
  <input type="text" bind:value={value} class="inp">
  <button on:click={event => addTodo(event)} class="btn">Create New Todo</button>
</form>

<style lang="scss">
  .todo-form {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    .btn {
      margin-top: 15px;
      border: 1px solid teal;
      background: #fff;
      padding: 12px 16px;
      font-size: 18px;
    }
    .inp {
      width: 70%;
      padding: 12px 16px;
      border: 1px solid teal;
      font-size: 18px;
    }
  }
</style>