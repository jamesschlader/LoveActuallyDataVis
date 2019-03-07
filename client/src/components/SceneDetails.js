import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import { getSceneQuery, getActorsQuery } from "../queries/queries";

class SceneDetails extends Component {
  showDetails = () => {
    const { scene } = this.props.data;

    if (scene) {
      return <h4>{scene.scene}</h4>;
    } else {
      return <p>No scene details available.</p>;
    }
  };
  render() {
    return (
      <div className="uk-card uk-card-default uk-card-body uk-margin">
        <h3 className="uk-card-title">Scene Details</h3>
        {this.showDetails()}
      </div>
    );
  }
}

export default compose(
  graphql(
    getSceneQuery,
    {
      options: props => {
        return {
          variables: {
            id: props.selectedScene
          }
        };
      }
    },
    { name: "getSceneQuery" }
  ),
  graphql(getActorsQuery, { name: "getActorsQuery" })
)(SceneDetails);
