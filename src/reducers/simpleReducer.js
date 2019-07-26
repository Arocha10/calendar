const initialState = {
  calendars: {},
  month: "",
  algo: "",
  message: ""
};
export default function simpleReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_MONTH_ACTION":
      let newCalendars = {};
      newCalendars[action.payload.month] = action.payload.calendar;
      console.log("newCalendars", action.payload.month, newCalendars);
      let newState = { calendars: { ...state.calendars, ...newCalendars } };
      console.log("final state", newState);
      console.log("state", { ...state, ...newState });

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
