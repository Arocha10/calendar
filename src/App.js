import React, { Component } from "react";
import { connect } from "react-redux";
import Calendar from "./components/Calendar";
import Modal from "./components/Modal";
import "./App.css";
import "./styles/calendar.css";
import moment from "moment";
import {
  simpleAction,
  addMonth,
  changeMonth,
  addReminders
} from "./actions/simpleAction";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShowing: false,
      showForm: false
    };
    this.months = [
      { value: 0, text: "January" },
      { value: 1, text: "February" },
      { value: 2, text: "March" },
      { value: 3, text: "April" },
      { value: 4, text: "May" },
      { value: 5, text: "June" },
      { value: 6, text: "July" },
      { value: 7, text: "August" },
      { value: 8, text: "September" },
      { value: 9, text: "October" },
      { value: 10, text: "November" },
      { value: 11, text: "December" }
    ];
  }

  componentDidMount() {
    let calendar = this.getDaysInMonth();
    let d = calendar[1][0];
    this.props.changeMonth({ month: d.month() });
    this.props.addMonth({ month: d.month(), calendar: calendar });
  }

  openModalHandler = () => {
    let state = {
      ...this.state,
      ...{
        isShowing: true
      }
    };
    this.setState(state);
  };

  showFormModal = () => {
    let state = {
      ...this.state,
      ...{
        showForm: true
      }
    };
    this.setState(state);
  };

  /*createReminders = day => {
    let payload = { day: {} };

    this.setState(state);
  };*/

  getMonth = m => {
    if (m) {
      return this.months[m].text;
    }
    return this.months[1].text;
  };

  closeModalHandler = () => {
    let state = {
      ...this.state,
      ...{
        isShowing: false
      }
    };
    this.setState(state);
  };

  initWithMonth(payload) {
    console.log(" empeiza el bochinche", payload);
    this.props.changeMonth(payload);
    const year = parseInt(moment().format("YYYY"), 10);
    this.month = payload.month;
    this.date = moment()
      .year(year)
      .month(this.month);
    console.log(this.date);
    this.calendar = [];

    const startWeek = moment(this.date)
      .startOf("month")
      .week();
    const endWeek = moment(this.date)
      .endOf("month")
      .week();

    for (let week = startWeek; week < endWeek + 1; week++) {
      console.log(week, "week");
      this.calendar[week] = Array(7)
        .fill(0)
        .map((n, i) =>
          moment(this.date)
            .week(week)
            .startOf("week")
            .clone()
            .add(n + i, "day")
        );
    }
    this.calendar = this.calendar.filter(el => el != null);
    console.log("new calendar", this.calendar);
    this.props.addMonth({
      month: payload.month,
      calendar: this.calendar
    });
  }

  getDaysInMonth = () => {
    let calendar = [];
    const startWeek = moment()
      .startOf("month")
      .week();

    const endWeek = moment()
      .endOf("month")
      .week();
    console.log(startWeek, "startWeek", endWeek, "endWeek");
    for (let week = startWeek; week < endWeek + 1; week++) {
      calendar[week] = Array(7)
        .fill(0)
        .map((n, i) =>
          moment()
            .week(week)
            .startOf("week")
            .clone()
            .add(n + i, "day")
        );
    }
    calendar = calendar.filter(el => el != null);

    return calendar;
  };
  simpleAction = (event, calendar) => {
    this.props.simpleAction();
  };

  render() {
    //  const days = ["Sunday","Monday", "Tuesday", "wednesday", "Thursday", "Friday", "Saturday" ];
    //  const headers = days.map(this.renderHeaders);
    //  const month = this.getDaysInMonth(3,2019);
    //  const weeks = month.map(this.renderWeeks);
    //  console.log(month);

    return (
      <div className="App">
        <button onClick={this.simpleAction}>Test redux action</button>
        <pre>{JSON.stringify(this.props.simpleReducer.day)}</pre>
        <button className="open-modal-btn" onClick={this.openModalHandler}>
          Open Modal
        </button>
        <h4>{this.props.month}</h4>

        <Modal
          className="modal"
          show={this.state.isShowing}
          close={this.closeModalHandler}
        >
          <p>
            {"This are your reminders for " +
              this.getMonth(this.props.simpleReducer.month) +
              ", 1"}
          </p>
          <button onClick={this.showFormModal} class="button">
            Add reminder
          </button>

          {this.state.showForm ? (
            <form>
              <label>
                Is going:
                <input
                  name="isGoing"
                  type="checkbox"
                  checked={this.state.isGoing}
                  onChange={this.handleInputChange}
                />
              </label>
              <br />
              <label>
                Number of guests:
                <input
                  name="numberOfGuests"
                  type="number"
                  className="inputModel"
                  value={this.state.numberOfGuests}
                  onChange={this.handleInputChange}
                />
              </label>
            </form>
          ) : null}
        </Modal>

        {this.props.simpleReducer.month &&
          this.props.simpleReducer.calendars.hasOwnProperty(
            this.props.simpleReducer.month
          ) && (
            <Calendar
              openModal={this.openModalHandler}
              month={this.props.simpleReducer.month}
              calendar={
                this.props.simpleReducer.calendars[
                  this.props.simpleReducer.month
                ]
              }
              setMonth={item => this.initWithMonth(item)}
            />
          )}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  simpleAction: () => dispatch(simpleAction()),
  addMonth: payload => dispatch(addMonth(payload)),
  changeMonth: payload => dispatch(changeMonth(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
