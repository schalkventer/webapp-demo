export const INITIAL_STATE = {
  error: false,
  tasks: [],
  loading: true,
  form: {
    image: "",
    title: "",
    date: "",
  },
};

export const reducer = (state = INITIAL_STATE, action = {}) => {
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

    case "UPDATE_FORM_IMAGE":
      return {
        ...state,
        form: { ...state.form, image: action.payload },
      };

    case "LOAD_TASKS": return {
        ...state,
        loading: false,
        tasks: action.payload,
    }

    case "ADD": {
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            id: action.payload.id,
            date: new Date(state.form.date).getTime(),
            completed: false,
            created: new Date().getTime(),
            image: state.form.image,
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

export default reducer;
