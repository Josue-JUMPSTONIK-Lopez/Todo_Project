const express = require("express");
const Todo = require("./classes/todo.class");
const TodoList = require('./services/todo-list.service')
const app = express();
const cors = require('cors')
const {logErrors, errorHandler, boomErrorHandler} = require('./middlewares/error.handler');
const server = require("http").createServer(app);

const todoList = new TodoList()

// Middlewares

app.use(express.static("public"));
app.use(express.urlencoded())
// Con el codigo comentado se puede elegir los dominios que
// si pueden hacerle peticiones a nuestra API
// const whitelist = ['http://localhost:8080']
// const options = {
//     origin: (origin, callback)=>{
//         if(whitelist.includes(origin) || !origin){
//             callback(null, true)
//         }else{
//             callback(new Error('No permitido'));
//         }
//     }
// }
// app.use(cors(options));
app.use(cors());

// Templating engine setup

app.set("view engine", "ejs");

// Enpoints


app.get("/", async(req, res, next) => {
  try {
    const todos = await todoList.getTodos()
    res.status(200).render("index", {todos});
  } catch (error) {
    next(error)
  }
});

app.post("/todos/:tarea", async(req, res, next) => {
  try {
    const {tarea} = req.params
    const todo = new Todo(tarea)
    todoList.nuevoTodo(todo);
    const todos = todoList.getTodos()
    // res.render("index", {todoList});
    res.status(201).send(todo.tarea)
  } catch (error) {
    next(error)
  }
});

app.delete("/todos/:id", async(req, res, next) => {
  try {    
    const {id} = req.params
    todoList.eliminarTodo(id);
    const todos = todoList.getTodos();
    res.status(202).send(JSON.stringify({todos}))
  } catch (error) {
    next(error)
  }
});

app.get("/active", async(req, res, next) => {
  try {
    const todos = await todoList.todosPendiente();
    res.status(200).render("index", {todos});
  } catch (error) {
    next(error)
  }
});

app.get("/completed", async(req, res, next) => {
  try {
    const todos = await todoList.todosCompletados();
    console.log(todos.filter(todo => todo.completado === false).length)
    res.status(200).render("index", {todos});
  } catch (error) {
    next(error)
  }
});

app.delete("/todos", async(req, res, next) => {
  try {
    const todos = todoList.getTodos()
    todoList.eliminarTodos()
    res.status(202).send(JSON.stringify({todos}))
  } catch (error) {
    next(error)
  }

});

app.put("/active/:id", async(req, res, next) =>{
  try {
    const {id} = req.params;
    todoList.marcarCompletado(id)
    res.status(200).send(JSON.stringify({message: `todo with Id ${id} updated`}))
  } catch (error) {
    next(error)
  }
})

// Error handlers middleWares
app.use(logErrors);
app.use(boomErrorHandler)
app.use(errorHandler)


// Starting server.

server.listen(3030, () => {
  console.log("Listening on port 3030...");
});
