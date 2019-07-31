import * as React from "react";
import moment from "moment";
import {
  simpleAction,
  addMonth,
  changeMonth,
  setDay
} from "../actions/simpleAction";
import "../styles/calendar.css";
import { connect } from "react-redux";

class CalendarTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: ""
    };
    this.days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
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
    this.month = this.getDaysInMonth();
  }

  initWithMonth(m) {
    const year = parseInt(moment().format("YYYY"), 10);
    this.month = m.value;
    this.date = moment()
      .year(year)
      .month(this.month);
    this.calendar = [];

    const startWeek = moment(this.date)
      .startOf("month")
      .week();
    const endWeek = moment(this.date)
      .endOf("month")
      .week();

    for (let week = startWeek; week < endWeek + 1; week++) {
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
  }

  getDaysInMonth = () => {
    let calendar = [];
    const startWeek = moment()
      .startOf("month")
      .week();

    const endWeek = moment()
      .endOf("month")
      .week();
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

  renderHeaders = day => {
    return <div className="dayWeek">{day}</div>;
  };

  openDayModal = day => {
    this.props.setDay(day);
    this.props.openModal();
  };

  renderWeeks = week => {
    return (
      <div className="container ">
        {week.map((dy, index) => {
          return (
            <div
              onClick={() => this.openDayModal(dy.get("date"))}
              key={`${index}-monthDay-${dy.get("date")}`}
              className="dayBox dayMonth"
            >
              <div className="day">{dy.get("date")}</div>
            </div>
          );
        })}
      </div>
    );
  };

  setMonth = month => {
    let payload;
    if (month < 0) {
      payload = { month: this.props.month - 1 };
    } else {
      payload = { month: this.props.month + 1 };
    }
    this.props.setMonth(payload);
  };

  render() {
    const headers = this.days.map(this.renderHeaders);
    const weeks = this.props.calendar.map(this.renderWeeks);

    return (
      <div className="calendarContainer">
        <h4>Select a month</h4>
        {this.props.month && (
          <div>
            <button
              onClick={() => this.setMonth(-1)}
              className="open-modal-btn"
            >
              {" << Change Month"}
            </button>
            <h4>{this.months[this.props.month].text}</h4>
            <button
              onClick={() => this.setMonth(+1)}
              className="open-modal-btn"
            >
              {"  Change Month >>"}
            </button>
          </div>
        )}

        <div className="containerHeader ">{headers}</div>
        {weeks}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  changeMonth: payload => dispatch(changeMonth(payload)),
  setDay: payload => dispatch(setDay(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarTable);
