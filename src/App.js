import React from "react";
import "./App.css"; 

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      task: "",
      description: "",
      todos: [],
      showOnlyIncomplete: false,
    };
  }

  handleTaskChange = (e) => {
    this.setState({ task: e.target.value });
  };

  handleDescriptionChange = (e) => {
    this.setState({ description: e.target.value });
  };

  handleAddTodo = () => {
    const { task, description, todos } = this.state;
    if (task.trim() === "") return;

    const newTodo = {
      title: task.trim(),
      description: description.trim(),
      checked: false,
      createdAt: new Date().toLocaleString(),
    };

    this.setState({
      todos: [newTodo, ...todos],
      task: "",
      description: "",
    });
  };

  handleTodoChecked = (index) => {
    this.setState((prevState) => {
      const newTodos = prevState.todos.map((todo, i) => {
        if (i === index) {
          return { ...todo, checked: !todo.checked };
        }
        return todo;
      });
      return { todos: newTodos };
    });
  };

  handleDeleteTodo = (index) => {
    this.setState((prevState) => ({
      todos: prevState.todos.filter((_, i) => i !== index),
    }));
  };

  toggleFilter = () => {
    this.setState((prevState) => ({
      showOnlyIncomplete: !prevState.showOnlyIncomplete,
    }));
  };

  render() {
    const filteredTodos = this.state.showOnlyIncomplete
      ? this.state.todos.filter((todo) => !todo.checked)
      : this.state.todos;

    const sortedTodos = filteredTodos.sort((a, b) => a.checked - b.checked);

    return (
      <div className="app-container">
        <h1>TODO List</h1>
        <div className="input-container">
          <input
            type="text"
            placeholder="Задача"
            value={this.state.task}
            onChange={this.handleTaskChange}
            className="input-task"
          />
          <textarea
            placeholder="Описание"
            value={this.state.description}
            onChange={this.handleDescriptionChange}
            className="description-textarea"
          />
          <button onClick={this.handleAddTodo} className="add-btn">Добавить</button>
        </div>
        <label className="filter-label">
          <input
            type="checkbox"
            checked={this.state.showOnlyIncomplete}
            onChange={this.toggleFilter}
          />
          Только невыполненные
        </label>
        <ul className="todo-list">
          {sortedTodos.map((todo, index) => (
            <Todo
              key={index}
              todo={todo}
              onDelete={() => this.handleDeleteTodo(index)}
              onCheck={() => this.handleTodoChecked(index)}
            />
          ))}
        </ul>
      </div>
    );
  }
}

class Todo extends React.Component {
  render() {
    const { todo, onDelete, onCheck } = this.props;
    return (
      <li className="todo-item">
        <input
          type="checkbox"
          checked={todo.checked}
          onChange={onCheck}
          className="checkbox"
        />
        <div className="todo-content">
          <strong>{todo.title}</strong>
          <p>{todo.description}</p>
          <small>{todo.createdAt}</small>
        </div>
        <button className="delete-btn" onClick={onDelete}>Удалить</button>
      </li>
    );
  }
}

export default App;