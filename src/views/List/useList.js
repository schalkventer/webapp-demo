import { useReducer, useEffect } from "react";
import tasks from "../../api/tasks";
import { v4 as createId } from "uuid";
import reducer, { INITIAL_STATE } from './useList.reducer';


const useList = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const getStartingTasks = async () => {
    const startingTasks = await tasks.readTask()

    dispatch({
      type: 'LOAD_TASKS',
      payload: startingTasks,
    })
  }

  useEffect(() => getStartingTasks(), [])

  const handleDeleteButtonClick = (event) => {
    const id = event.target.value;

    dispatch({
      type: "DELETE",
      payload: id,
    });
  };

  const handleTitleInputChange = (event) =>
    dispatch({
      type: "UPDATE_FORM_TITLE",
      payload: event.target.value,
    });

  const handleDateInputChange = (event) =>
    dispatch({
      type: "UPDATE_FORM_DATE",
      payload: event.target.value,
    });

  const handleAddTaskFormSubmit = (event) => {
    event.preventDefault();
    const id = createId();

    tasks
      .createTask({
        id,
        title: state.form.title,
        date: state.form.date,
        image: state.form.image,
      })

    dispatch({
      type: "ADD",
      payload: {
        id,
      },
    });
  };

  const handleImageInputChange = (event) => {
    dispatch({
      type: "UPDATE_FORM_IMAGE",
      payload: event.target.files[0],
    });
  };

  return {
    state,

    handleDeleteButtonClick,
    handleAddTaskFormSubmit,

    handleTitleInputChange,
    handleDateInputChange,
    handleImageInputChange,
  };
};

export default useList;
