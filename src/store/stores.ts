import { writable } from "svelte/store";
// import {getDataFromLS} from "./localStorage";
import type { ITodo } from "../types/types";
import { getData } from "../api/getData";
import { onMount } from "svelte";

// const todos: ITodo[] = getData('http://localhost:3001/todos');
// const pickedSortValue: ITodo[] = fetch('http://localhost:3001/filter')
//     .then(response => response.json())
//     .then(data => data.value);




const todos: ITodo[] = [];
const pickedSortValue = "all" as const;

export const todoItems = writable(todos);

export const sideBarActivate = writable(false);

export const pickedSort = writable(pickedSortValue);
