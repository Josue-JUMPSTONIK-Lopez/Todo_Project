
class Todo{

    static fromJson({ id, tarea, completado, creado}){

        const tempTodo = new Todo(tarea);

        tempTodo.id = id;
        tempTodo.completado = completado;
        tempTodo.creado = creado;

        return tempTodo;

    }

    constructor(tarea){

        this.tarea = tarea;

        this.id = new Date().getTime();
        this.completado = false;
        this.creado = new Date();
        this.component = `<li
		class="${this.completado ? "completed" : ""}"
        id="todo${this.id}"
		data-id="abc">
			<div class="view">
				<input value="${this.id}" onclick="setComplete(this)" class="toggle" type="checkbox" 
                ${this.completado ? "checked": ""}
				>
				<input id="editableText${this.id}" class="label" value="${this.tarea}" type="text" onchange="setText(this)"/>
				<button value="${this.id}" onclick='edit(this);' class="editable"></button>
				<button value="${this.id}" onclick='destroy(this);' class="destroy"></button>
			</div>
		</li>`
    }
}

module.exports = Todo

