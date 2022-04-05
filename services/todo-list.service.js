
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
                    break;
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