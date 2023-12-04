<script lang="ts">
  import TodoList from "./lib/components/TodoList.svelte";
  import { sideBarActivate, todoItems, pickedSort } from "./store/stores";
  import SideBar from "./lib/components/SideBar.svelte";
  import { onMount } from 'svelte';
  import { getData } from './api/getData';

  const clickHandler = () => {
    sideBarActivate.update((n: boolean) => !n);
  }

  onMount(async () => {
    const todos = await getData('http://localhost:3001/todos');
    const filter = await getData('http://localhost:3001/filter');

    console.log(todos);

    todoItems.set(todos);
    pickedSort.set(filter);
  })
</script>

<main class="App">
  <TodoList/>
  <button class="btn" on:click={clickHandler}>Add new Todo</button>
  <SideBar/>
</main>

<style lang="scss">
  .App {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    .btn {
      background: #fff;
      border: 1px solid teal;
      margin: 10px;
      padding: 12px 16px;
      font-size: 18px;
    }
  }
</style>