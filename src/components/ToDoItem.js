import * as React from 'react';
import './ToDoItem.css';

class TodoListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    handleInputTaskName = (event) => {
        this.props.onEdit(event.target.value);
    };

    render() {
        return (
            <li className={this.props.value.isDone? "done" : null}>
                <input
                    type="checkbox"
                    name="isCompleted"
                    checked={this.props.value.isDone}
                    onChange={this.props.onDone}
                />
                <input
                    id="nameItem"
                    type="text"
                    name="todo"
                    value={this.props.value.name}
                    onChange={this.handleInputTaskName}
                />
                <button
                    className="del-btn"
                    onClick={this.props.onDelete}
                >
                    Delete
                </button>
            </li>
        );
    }
}

export default TodoListItem;
