import React, { Component } from "react";
import { connect } from "react-redux";
import Calendar from "./components/Calendar";
import Modal from "./components/Modal";
import "./App.css";
import "./styles/calendar.css";
import { simpleAction, addMonth, changeMonth } from "./actions/simpleAction";

class App extends Component {
  constructor() {
    super();

    this.state = {
      isShowing: false
    };
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
        <pre>{JSON.stringify(this.props.simpleReducer)}</pre>
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

        <Calendar
          openModal={this.props.openModalHandler}
          month={this.props.simpleReducer.month}
        />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  simpleAction: () => dispatch(simpleAction()),
  addMonth: () => dispatch(addMonth()),
  changeMonth: () => dispatch(changeMonth())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
