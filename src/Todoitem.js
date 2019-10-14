import React from "react"



class TodoItem extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            done: props.done
        }
    }

    toggleDone = () => {
      fetch(`postgres://lgdxftbbmktdxf:28c8ef1a2f9f46071c3128389f0abc571ca6182b34618e22dbc7981e4dffcc98@ec2-54-235-163-246.compute-1.amazonaws.com:5432/d5mvp4eibt3bqq/todos` , {
        method: "PUT" , 
        headers: { "content-type": "application/json"} ,
        body: JSON.stringify({
            title: this.props.title, 
            done: !this.state.done 
        })
    }).then(this.setState({ done: !this.state.done }))    
  } 

    render() {
        return (
            <div className= 'todo-item'>
                <input 
                type= 'checkbox' 
                onChange= {this.toggleDone}
                />
                <p className= {this.state.done && 'done'}> {this.props.title}</p> 
                <button onClick={() => this.props.delete(this.props.id)}>X</button>
            </div> 
        ) 
    }
}

export default TodoItem; 