import React, { Component } from "react";
import SceneList from "./components/SceneList";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import ActorList from "./components/ActorList";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});
class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <h1 className=" uk-margin-large-top uk-text-center">Love Actually</h1>
        <div className="uk-container uk-align-center">
          <div className="uk-container uk-box-shadow-large uk-box-shadow-right-large uk-box-shadow-left-large uk-margin-large uk-grid uk-child-width-1-2@s ">
            <SceneList />
            <ActorList />
          </div>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
