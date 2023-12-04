<script lang="ts">
  import {fade, fly} from 'svelte/transition'
  import type {ITodo} from "../../types/types.ts";
  import {pickedSort, todoItems} from "../../store/stores";
  import { sendData } from '../../api/sendData.js';

  let todos: any;
  let current: string = '';

  const complete = () => {
    todoItems.update((data: ITodo[]) => {
      return todos = data;
    })
  }
  
  const showAll = async () => {
    current = 'all';

    await sendData('http://localhost:3001/filter', {value: current});

    const unsubscribe = todoItems.subscribe((value: any) => {
      todos = value
    })
  }
  const showCompleted = async () => {
    current = 'completed';

    await sendData('http://localhost:3001/filter', {value: current});

    const unsubscribe = todoItems.subscribe((value: any[]) => {
      todos = value.filter((todo: ITodo) => todo.completed === true)
    })
  }
  const showNotCompleted = async () => {
    current = 'not-completed';

    await sendData('http://localhost:3001/filter', {value: current});
    
    const unsubscribe = todoItems.subscribe((value: any) => {
      todos = value.filter((todo: ITodo) => todo.completed !== true)
    })
  }
  
  function subscribe1() {
    const unsubscribe = todoItems.subscribe((value: any) => {
      todos = value;
      // setItemToLS('todolist', todos);
      
    })
  }
  
  function subscribe2() {
    const unsubscribe = pickedSort.subscribe((value: any) => {
      current = value;
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

  <button class="btn" on:click={showAll} disabled={current === 'all'}>Show All</button>
  <button class="btn" on:click={showNotCompleted} disabled={current === 'not-completed'}>Show not completed</button>
  <button class="btn" on:click={showCompleted} disabled={current === 'completed'}>Show completed</button>

  {#each todos as {title, completed}, todo}
    <div class="todo-item" in:fly={{ x: -200, duration: 1000}} out:fly={{x: 200, duration: 1000}} class:completed={completed}>
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