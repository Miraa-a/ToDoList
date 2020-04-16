import * as React from 'react';
import './ToDoItem.css';
import ToDoItem from './ToDoItem';


class ToDoList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            futureTaskId: 0,
            newTaskName: "",
            tasks: new Map()
        };
    }

    getState() {
        return Object.assign(this.state, {});
    }

    edit = (taskId, name) => (newValue) => {
        let state = this.getState();
        let task = state.tasks.get(taskId);
        task.name = newValue;
        state.tasks.set(task.taskId, task);

        this.setState(state);
    };

    add(taskName) {
        let state = this.getState();
        let newTask = {
            name: taskName,
            description: "",
            taskId: state.futureTaskId,
            isDone: false
        };

        state.tasks.set(state.futureTaskId, newTask);
        state.futureTaskId++;
        state.newTaskName = "";

        this.setState(state);
    }

    delete(taskId) {
        let state = this.getState();
        state.tasks.delete(taskId);

        this.setState(state);
    };

    done = (taskId) => () => {
        let state = this.getState();
        let task = state.tasks.get(taskId);
        task.isDone = !task.isDone;
        state.tasks.set(task.taskId, task);

        this.setState(state);
    };

    renderToDoItem(item) {
        return (
            <ToDoItem
                value={item}
                onDelete={() => this.delete(item.taskId)}
                onDone={this.done(item.taskId)}
                onEdit={this.edit(item.taskId, item.name)}
                key={item.taskId}
            />
        );
    };

    onSubmitAdd = (event) => {
        event.preventDefault();
        const taskName = this.state.newTaskName;
        
        if(taskName) this.add(taskName)
    };

    handleInputNewTaskName = (event) => {
        this.setState(Object.assign(this.state, {newTaskName: event.target.value}));
    };

    render() {
        return (
            <div className="App">
                <h1 style={{textAlign: "center"}}>Список заданий</h1>
                <form style={{textAlign:"center"}} id="todoList-form" onSubmit={this.onSubmitAdd}>
                    <input type="text"
                           placeholder="Задание"
                           autoComplete={"off"}
                           value={this.state.newTaskName}
                           onChange={this.handleInputNewTaskName}
                           required />
                    <button>Добавить</button>
                </form>
                <ul>
                    {
                        Array.from(this.state.tasks.values()).map((item) => {
                            return this.renderToDoItem(item);
                        })
                    }
                </ul>
            </div>
        );
    }
}

export default ToDoList;
