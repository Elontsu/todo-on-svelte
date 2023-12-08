<script lang="ts">
  import {fly} from 'svelte/transition'
  import type {ITodo} from "../../types/types.ts";
  import {pickedSort, todoItems} from "../../store/stores";
  import { sendData } from '../../api/sendData.js';

  let todos: ITodo[] = [];
  let current = {
    value: 'all'
  };

  const deletePost = (id: number) => {
    fetch('http://localhost:3001/todos/' + id, {
      method: 'DELETE'
    }).catch(error => console.error(error))
    todos = todos.filter((todo: ITodo) => todo.id !== id)

    todoItems.set(todos);
  }


  const complete = () => {
    todoItems.update((data: ITodo[]) => {
      return todos = data;
    })
  }
  
  const showAll = async () => {
    current.value = 'all';

    await sendData('http://localhost:3001/filter', {value: current.value});

    const unsubscribe = todoItems.subscribe((value: ITodo[]) => {
      todos = value
    })
  }
  const showCompleted = async () => {
    current.value = 'completed';

    const response =await sendData('http://localhost:3001/filter', {value: current.value});

    const unsubscribe = todoItems.subscribe((value: ITodo[]) => {
      todos = value.filter((todo: ITodo) => todo.completed === true)
    })
  }
  const showNotCompleted = async () => {
    current.value = 'not-completed';

    await sendData('http://localhost:3001/filter', {value: current.value});
    
    const unsubscribe = todoItems.subscribe((value: ITodo[]) => {
      todos = value.filter((todo: ITodo) => todo.completed !== true)
    })
  }
  
  function subscribe1() {
    const unsubscribe = todoItems.subscribe((value: ITodo[]) => {
      todos = value;
      // setItemToLS('todolist', todos);
      
    })
  }
  
  function subscribe2() {
    const unsubscribe = pickedSort.subscribe((value: string) => {
      current.value = value;
      switch (current) {
        case 'all':
          showAll();
          break;
        case 'not-completed':
          showNotCompleted();
          break;
        case 'completed':
          showCompleted();
          break;
      }
    })
  }

  subscribe1();
  subscribe2();
</script>

<div class="todo-list">
  <h1 class="list-title">Your Todo List</h1>

  <button class="btn" on:click={showAll} disabled={current.value === 'all'}>Show All</button>
  <button class="btn" on:click={showNotCompleted} disabled={current.value === 'not-completed'}>Show not completed</button>
  <button class="btn" on:click={showCompleted} disabled={current.value === 'completed'}>Show completed</button>

  {#each todos as {title, completed, id}, todo}
    <div class="todo-item" in:fly={{ x: -200, duration: 1000}} out:fly={{x: 200, duration: 1000}} class:completed={completed}>
      <button on:click={() => deletePost(id)} class="btn-delete">Delete</button>
      <span class="todo-item-text">{title}</span>
      <input type="checkbox" bind:checked={completed} on:change={complete}>
    </div>
  {/each}

</div>


<style lang="scss">
  .todo-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 100%;

    .list-title {
      width: 100%;
      text-align: center;
    }

    .todo-item {
      display: flex;
      justify-content: center;
      align-content: center;
      font-size: 18px;
      padding: 10px;
      width: 100%;

      .btn-delete {
        border: 1px solid teal;
        background-color: transparent;
        user-select: none;
        margin-right: 10px;
        cursor: pointer;
        padding: 5px;
      }

      &.completed {
        .todo-item-text {
          text-decoration: line-through;
        }
      }

      .todo-item-text {
        margin-right: 10px;
        text-decoration: none;
      }
    }

    .btn {
      background: #fff;
      padding: 12px 16px;
      border: 1px solid teal;
      margin: 10px;
      font-size: 18px;
    }
  }
</style>