import React, { useReducer } from "react";
import useApp from "./useApp";

const App = () => {
  const {
    handleAddTaskFormSubmit,
    handleDateInputChange,
    handleDeleteButtonClick,
    handleTitleInputChange,
    handleImageInputChange,
    state,
  } = useApp();

  return (
    <>
      <form onSubmit={handleAddTaskFormSubmit}>
        <label htmlFor="title">
          <div>Title</div>
          <input
            value={state.form.title}
            id="title"
            onChange={handleTitleInputChange}
          />
        </label>

        <label htmlFor="image">
          <div>Image</div>
          <input
            value={state.form.image}
            id="image"
            type="file"
            onChange={handleImageInputChange}
          />
        </label>

        <label htmlFor="date">
          <div>Date</div>
          <input
            value={state.form.date}
            id="date"
            type="date"
            onChange={handleDateInputChange}
          />
        </label>

        <button>ADD TASK</button>
      </form>

      <ul>
        {state.tasks.map(({ id, date, completed, title }) => {
          return (
            <li key={id}>
              <div>
                <input type="checkbox" value={completed}></input>
                <div>{title}</div>
                <div>
                  {Math.ceil((date - new Date().getTime()) / 1000 / 60)} minutes
                  remaining
                </div>
              </div>
              <button value={id} onClick={handleDeleteButtonClick}>
                X
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default App;
