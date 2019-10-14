import React from 'react'
import TodoItem from './Todoitem'

import './index.css';

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      todos: [],
      todo: ""
   }
}

componentDidMount() {
  fetch("postgres://lgdxftbbmktdxf:28c8ef1a2f9f46071c3128389f0abc571ca6182b34618e22dbc7981e4dffcc98@ec2-54-235-163-246.compute-1.amazonaws.com:5432/d5mvp4eibt3bqq")
    .then(response => response.json())
    .then(data => this.setState ({ todos: data}))
}

renderTodos = () => {
  return this.state.todos.map(todo => {
      return (
      <TodoItem 
        key={todo.id}
        title={todo.title} 
        done={todo.done}
        id={todo.id} 
        delete={this.deleteTodo}
     />
   )
 })
}

handleChange = event => {
  this.setState({todo: event.target.value})
}

addTodo = event => {
  event.preventDefault()
  fetch("postgres://lgdxftbbmktdxf:28c8ef1a2f9f46071c3128389f0abc571ca6182b34618e22dbc7981e4dffcc98@ec2-54-235-163-246.compute-1.amazonaws.com:5432/d5mvp4eibt3bqq" , {
    method: "POST" ,
    headers: {"content-type" : "application/json"},
    body: JSON.stringify({
      title: this.state.todo,
      done: false
    })
  })
    .then(response => response.json())
    .then(data => 
        this.setState({
      todos: [...this.state.todos, data],
      todo: ""
   })
  )
}

deleteTodo = id => {
  fetch("postgres://lgdxftbbmktdxf:28c8ef1a2f9f46071c3128389f0abc571ca6182b34618e22dbc7981e4dffcc98@ec2-54-235-163-246.compute-1.amazonaws.com:5432/d5mvp4eibt3bqq" , {
    method: "DELETE"
  }).then(
      this.setState({ 
         todos: this.state.todos.filter(todo => todo.id !== id)
      })
  )
}

render() {
    return (
      <div className="App">
        <h1>ToDo List</h1> 
        <form onSubmit={this.addTodo}> 
            <input type= 'text' placeholder='Add Todo' value={this.state.todo} onChange={this.handleChange}/> 
            <button type= 'submit' >Add</button> 
        </form>
        {this.renderTodos()}
      </div>
    )
 } 
}
export default App;
