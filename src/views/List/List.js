import React from "react";
import useList from "./useList";

export const List = () => {
  const {
    handleAddTaskFormSubmit,
    handleDateInputChange,
    handleDeleteButtonClick,
    handleTitleInputChange,
    handleImageInputChange,
    state,
  } = useList();

  if (state.loading) {
    return <div>Loading...</div>
  }

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
          <input id="image" type="file" onChange={handleImageInputChange} />
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
        {state.tasks.map(({ id, date, completed, image, title }) => {
          return (
            <li key={id}>
              <div>
                <input type="checkbox" value={completed}></input>
                {image && <img src={URL.createObjectURL(image)} alt="" />}
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

export default List;
