export const simpleAction = payload => dispatch => {
  dispatch({
    type: "SIMPLE_ACTION",
    payload: "result_of_simple_action"
  });
};

export const addMonth = payload => dispatch => {
  dispatch({
    type: "ADD_MONTH_ACTION",
    payload: payload
  });
};

export const addReminders = payload => dispatch => {
  dispatch({
    type: "ADD_REMINDER_ACTION",
    payload: payload
  });
};

export const setDay = payload => dispatch => {
  dispatch({
    type: "SET_DAY_ACTION",
    payload: payload
  });
};

/* export const changeMonth = (payload) => dispatch => {
    console.log(payload, "payload")
    dispatch({
        type: 'CHANGE_MONTH_ACTION',
        payload: payload
    })
}*/

export function changeMonth(payload) {
  console.log(payload, "payload");
  return { type: "CHANGE_MONTH_ACTION", payload };
}
