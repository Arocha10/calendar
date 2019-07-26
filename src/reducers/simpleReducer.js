const initialState = {
  calendars: {},
  month: "",
  algo: "",
  message: ""
};
export default function simpleReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_MONTH_ACTION":
      let newState = { calendars: {} };
      newState.calendars[action.payload.month] = action.payload.calendar;
      return { ...state, ...newState };
    case "SIMPLE_ACTION":
      return { ...state, ...{ message: action.payload } };
    case "CHANGE_MONTH_ACTION":
      return { ...state, ...{ month: action.payload.month } };
    default:
      return state;
  }
  /* if (action.type === ADD_ARTICLE) {
    state.articles.push(action.payload);
  }
  return state;*/
}
