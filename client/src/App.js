import React, { Component } from "react";
import SceneList from "./components/SceneList";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import AddScene from "./components/AddScene";
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});
class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="uk-container uk-box-shadow-large uk-box-shadow-right-large uk-box-shadow-left-large uk-margin-large">
          <h1>Love Actually</h1>
          <SceneList />
          <AddScene />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
