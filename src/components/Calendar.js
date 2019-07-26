import * as React from "react";
import moment from "moment";
import { simpleAction, addMonth, changeMonth } from "../actions/simpleAction";
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
    console.log(this.date);
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

  renderHeaders = day => {
    return (
      <div key={`heading-${day}`} className="dayBox dayWeek">
        <div className="centeredDay">
          <div className="dayWeek">{day}</div>
        </div>
      </div>
    );
  };

  renderWeeks = week => {
    console.log(week);
    return (
      <div className="weekBox ">
        {week.map((dy, index) => {
          console.log("dy", dy, dy.get("date"));
          return (
            <div
              onClick={() => this.props.openModal()}
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
    console.log("entre", month);
    let payload;
    if (month < 0) {
      payload = { month: this.props.month - 1 };
    } else {
      payload = { month: this.props.month + 1 };
    }
    this.props.setMonth(payload);
  };

  render() {
    console.log("init", this.props);
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

        <div className=" weekBox headerBox ">{headers}</div>
        {weeks}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  changeMonth: payload => dispatch(changeMonth(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarTable);
