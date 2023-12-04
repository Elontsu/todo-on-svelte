<script lang="ts">
  import AddNewTodo from "./AddNewTodo.svelte";
  import {sideBarActivate} from "../../store/stores";
  import {onDestroy} from "svelte";

  let active: boolean;

  const unsubscribe = sideBarActivate.subscribe((value: boolean ) => {
    active = value;
  })

  onDestroy(() => {
    unsubscribe();
  })

  const clickHandler = () => {
    sideBarActivate.update((n: boolean) => !n)
  }

</script>

<div class="background" on:click={clickHandler} class:active></div>
<div class="sidebar" class:active>
  <AddNewTodo/>
</div>

<style lang="scss">
  .sidebar {
    padding: 30px;
    background: #fff;
    position: fixed;
    right: -500px;
    top: 0;
    min-width: 500px;
    min-height: 100vh;
    transition: all .3s;
    z-index: 4;
    &.active{
      right: 0;
    }
  }
  .background {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    transition: all .3s;
    opacity: 0;
    visibility: hidden;

    &.active {
      opacity: 1;
      visibility: visible;
    }
  }
</style>