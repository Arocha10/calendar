import React, { Component } from "react";
import { connect } from "react-redux";
import Calendar from "./components/Calendar";
import Modal from "./components/Modal";
import "./App.css";
import "./styles/calendar.css";
import moment from "moment";
import { simpleAction, addMonth, changeMonth } from "./actions/simpleAction";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShowing: false
    };
  }

  componentDidMount() {
    let calendar = this.getDaysInMonth();
    let d = calendar[1][0];
    this.props.changeMonth({ month: d.month() });
    this.props.addMonth({ month: d.month(), calendar: calendar });
  }

  openModalHandler = () => {
    this.setState({
      isShowing: true
    });
  };

  closeModalHandler = () => {
    this.setState({
      isShowing: false
    });
  };

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
  simpleAction = (event, calendar) => {
    this.props.simpleAction();
  };

  changeMonth = (event, month) => {
    console.log("entre", month);
    this.props.changeMonth(month);
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
        <pre>{JSON.stringify(this.props)}</pre>
        <button className="open-modal-btn" onClick={this.openModalHandler}>
          Open Modal
        </button>
        <h4>{this.props.month}</h4>

        <Modal
          className="modal"
          show={this.state.isShowing}
          close={this.closeModalHandler}
        >
          Maybe aircrafts fly very high because they don't want to be seen in
          plane sight?
        </Modal>

        {this.props.simpleReducer.month && (
          <Calendar
            openModal={this.props.openModalHandler}
            month={this.props.simpleReducer.month}
            calendar={
              this.props.simpleReducer.calendars[this.props.simpleReducer.month]
            }
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
