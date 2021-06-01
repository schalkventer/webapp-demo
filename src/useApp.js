import { useReducer } from "react";
import tasks from "./api/tasks";
import { v4 as createId } from "uuid";

const INITIAL_STATE = {
  error: false,
  tasks: [],
  form: {
    title: "",
    date: "",
  },
};

const reducer = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case "UPDATE_FORM_TITLE":
      return {
        ...state,
        form: { ...state.form, title: action.payload },
      };
    case "UPDATE_FORM_DATE":
      return {
        ...state,
        form: { ...state.form, date: action.payload },
      };
    case "ADD": {
      if (action.payload.error) {
        return {
          ...state,
          error: true,
          tasks: tasks.filter((item) => item.id !== action.payload.id),
        };
      }

      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            id: action.payload.id,
            date: new Date(state.form.date).getTime(),
            completed: false,
            created: new Date().getTime(),
            title: state.form.title,
          },
        ],
        form: {
          title: "",
          date: "",
        },
      };
    }
    case "DELETE":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    default:
      throw new Error("Invalid action type supplied");
  }
};

const useApp = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

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
      })
      .catch((error) => {
        dispatch({
          type: "ADD",
          payload: {
            id,
            error,
          },
          error: true,
        });
      });

    dispatch({
      type: "ADD",
      payload: {
        id,
      },
    });
  };

  const handleImageInputChange = (event) => {
    console.log(event.target.files[0]);
  };

  return {
    state,
    handleImageInputChange,
    handleDeleteButtonClick,
    handleAddTaskFormSubmit,
    handleTitleInputChange,
    handleDateInputChange,
  };
};

export default useApp;
