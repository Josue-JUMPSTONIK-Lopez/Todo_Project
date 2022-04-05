import './styles.css';
import {Todo, TodoList} from './classes'
import { crearTodoHtml } from './js/componente';

export const todoList = new TodoList();

// const tarea = new Todo('Aprender javascript');
// tarea.completado = true;
// todoList.nuevoTodo(tarea);
// console.log(todoList);
// crearTodoHtml(tarea);
// console.log(todoList.todos);

todoList.todos.forEach(crearTodoHtml);