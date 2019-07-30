const initialState = {
  calendars: {},
  reminders: {},
  month: "",
  day: "",
  message: ""
};
export default function simpleReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case "ADD_MONTH_ACTION":
      let newCalendars = {};
      let newReminders = {};
      newCalendars[action.payload.month] = action.payload.calendar;
      newReminders[action.payload.month] = {};
      console.log("newCalendars", action.payload.month, newCalendars);
      newState = {
        calendars: { ...state.calendars, ...newCalendars },
        reminders: { ...state.reminders, ...newReminders }
      };
      console.log("final state", newState);
      console.log("state", { ...state, ...newState });

      return { ...state, ...newState };
    case "SIMPLE_ACTION":
      return { ...state, ...action.payload };
    case "SET_DAY_ACTION":
      newState = {...state};
        if(!state.reminders[state.month][action.payload]){
          newState.reminders[state.month][action.payload] = {}
        }
      return { ...newState, ...{ day: action.payload,  } };
    case "ADD_REMINDER_ACTION":
      newState = { ...state };
      console.log("have reminders", newState.reminders[action.payload.month]);
      newState.reminders[action.payload.month][action.payload.day]
        ? newState.reminders[action.payload.month][action.payload.day].push(
            action.payload.reminder
          )
        : (newState.reminders[action.payload.month][action.payload.day] = [
            action.payload.reminder
          ]);
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
