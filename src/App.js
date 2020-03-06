import React from "react";
import superagent from "superagent";
import { connect } from "react-redux";
import Form from "./components/Form";
import Messages from "./components/Messages";
import { Route, Link } from "react-router-dom";

const baseUrl = "http://localhost:4000";
// const baseUrl = 'https://aqueous-island-05561.herokuapp.com'

class App extends React.Component {
  stream = new EventSource(`${baseUrl}/stream`);

  componentDidMount() {
    this.stream.onmessage = event => {
      // event.data is a JSON string
      // we need a real JavaScript object to use the data
      // To convert, use JSON.parse
      console.log("event.data test:", event.data);
      const parsed = JSON.parse(event.data);
      this.props.dispatch(parsed);
      console.log("parsed test:", parsed);
    };
  }

  createMessage = async value => {
    try {
      const response = await superagent
        .post(`${baseUrl}/message`)
        .send({ text: value });

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  createChannel = async value => {
    try {
      const response = await superagent
        .post(`${baseUrl}/channel`)
        .send({ name: value });

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const channels = this.props.channels.map(channel => (
      <div>
        <Link to={`/messages/${channel}`}>{channel}</Link>
      </div>
    ));

    return (
      <main className="simone">
        <h3>Channels</h3>
        <Form onSubmit={this.createChannel} />
        {channels}

        <Route path="/messages/:channel" component={Messages} />
      </main>
    );
  }
}

function mapStateToProps(state) {
  return {
    channels: state.channels
  };
}

// export default connect(mapStateToProps)(App);

const connector = connect(mapStateToProps);
const connected = connector(App);
export default connected; // import React from "react";
// import superagent from "superagent";
// import { connect } from "react-redux";
// import "./App.css";
// // import MaterialuiTry from "./MaterialuiTry";
// import OutlinedCard from "./MaterialuiTry";

// const baseUrl = "http://localhost:4000";
// // const baseUrl = 'https://aqueous-island-05561.herokuapp.com'

// class App extends React.Component {
//   state = { text: "" };

//   stream = new EventSource(`${baseUrl}/stream`);

//   componentDidMount = () => {
//     this.stream.onmessage = event => {
//       //event.data is a json string we need a real js  object to use he data
//       //to convert use json.parse

//       console.log("event data test", event.data);
//       const parsed = JSON.parse(event.data);
//       this.props.dispatch(parsed);
//       console.log("parsed test:", parsed);
//     };
//   };

//   onSubmit = async event => {
//     event.preventDefault();

//     try {
//       const response = await superagent
//         .post(`${baseUrl}/message`)
//         .send({ text: this.state.text });

//       console.log(response);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   onChange = event => {
//     this.setState({
//       text: event.target.value
//     });
//   };

//   reset = () => {
//     this.setState({ text: "" });
//   };

//   render() {
//     const messages = this.props.messages.map(message => <p>{message}</p>);
//     const channels = this.props.channels.map(channel => <p>{channel}</p>);
//     return (
//       <main className="simone">
//         <OutlinedCard data={this.props.messages} />
//         <form onSubmit={this.onSubmit}>
//           <h1>EFFE CHATTEN</h1>
//           <input type="text" onChange={this.onChange} value={this.state.text} />
//           <button>Send</button>
//           <button onClick={this.reset}>Reset</button>
//         </form>
//         <div>
//           {" "}
//           <h3>Channels</h3>
//           {channels}
//         </div>
//       </main>
//     );
//   }
// }

// function mapSatateToProps(state) {
//   return {
//     messages: state.messages,
//     channels: state.channels
//   };
// }

// //export default connect(mapStateToProps)(App)
// const connector = connect(mapSatateToProps);
// const connected = connector(App);
// export default connected;
