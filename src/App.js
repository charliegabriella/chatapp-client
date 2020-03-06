import React from "react";
import superagent from "superagent";
import { connect } from "react-redux";
import "./App.css";

class App extends React.Component {
  state = { text: "" };

  stream = new EventSource(
    "https://shrouded-bastion-42634.herokuapp.com/stream"
  );

  componentDidMount = () => {
    this.stream.onmessage = event => {
      //event.data is a json string we need a real js  object to use he data
      //to convert use json.parse

      console.log("event data test", event.data);
      const parsed = JSON.parse(event.data);
      this.props.dispatch(parsed);
      console.log("parsed test:", parsed);
    };
  };

  onSubmit = async event => {
    event.preventDefault();

    try {
      const response = await superagent
        .post("https://shrouded-bastion-42634.herokuapp.com/message")
        .send({ text: this.state.text });

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  onChange = event => {
    this.setState({
      text: event.target.value
    });
  };

  reset = () => {
    this.setState({ text: "" });
  };

  render() {
    const messages = this.props.messages.map(message => <li>{message}</li>);
    return (
      <main className="simone">
        <form onSubmit={this.onSubmit}>
          <h1>HELLO!</h1>
          <input type="text" onChange={this.onChange} value={this.state.text} />
          <button>Send</button>
          <button onClick={this.reset}>Reset</button>
        </form>
        <ul>{messages}</ul>
      </main>
    );
  }
}

function mapSatateToProps(state) {
  return {
    messages: state.messages
  };
}

//export default connect(mapStateToProps)(App)
const connector = connect(mapSatateToProps);
const connected = connector(App);
export default connected;
