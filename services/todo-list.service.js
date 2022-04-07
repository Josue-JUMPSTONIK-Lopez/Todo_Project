
const boom = require('@hapi/boom');

class TodoList{

    constructor(){
        this.todos = [];
    }

    async nuevoTodo(todo){

        this.todos.push(todo);

    }

    async eliminarTodo(id){

        this.todos = this.todos.filter( todo => todo.id != id);

    }

    async eliminarTodos(){
        this.todos = [];
    }

    async editTodo(id, tarea){
        if (id !== "" && tarea !== "") {
            let notFound = true;
            for (const todo of this.todos) {
                if( todo.id == id){
                    notFound = false
                    todo.tarea = tarea;

                    todo.component = `<li
		            class="${todo.completado ? "completed" : ""}"
                    id="todo${todo.id}"
		            data-id="abc">
		            	<div class="view">
		            		<input value="${todo.id}" onclick="setComplete(this)" class="toggle" type="checkbox" 
                            ${todo.completado ? "checked": ""}
		            		>
		            		<input id="editableText${todo.id}" class="label" value="${todo.tarea}" type="text" onchange="setText(this)"/>
		            		<button value="${todo.id}" onclick='edit(this);' class="editable"></button>
		            		<button value="${todo.id}" onclick='destroy(this);' class="destroy"></button>
		            	</div>
		            </li>`

                    return todo
                }
            }
            if (notFound) {
                throw boom.notFound("todo with that Id couldn't be found")
            }
        } else {
            throw boom.notAcceptable('Id of todo is missing')
        }
    }

    async todosPendiente(){
        return this.todos.filter(todo => todo.completado === false)
    }

    async todosCompletados(){
        return this.todos.filter(todo => todo.completado)
    }
    
    async marcarCompletado(id){
        if (id !== "") {
            let notFound = true;
            for (const todo of this.todos) {
                if( todo.id == id){
                    notFound = false
                    todo.completado = !todo.completado;
                    return todo
                }
            }
            if (notFound) {
                throw boom.notFound("todo with that Id couldn't be found")
            }
        } else {
            throw boom.notAcceptable('Id of todo is missing')
        }

    }

    async eliminarCompletados(){
        this.todos = this.todos.filter( todo => !todo.completado);
        // this.guardarLocalStorage();
    }

    async getTodos(){
        return this.todos;
    }
}

module.exports = TodoList