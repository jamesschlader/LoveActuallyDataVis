import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import {
  getSceneQuery,
  getActorsQuery,
  updateSceneMutation
} from "../queries/queries";

class SceneDetails extends Component {
  showDetails = () => {
    const { scene } = this.props.data;

    if (scene) {
      return (
        <div className="inline-block">
          <h4 className="inline-block">{scene.scene}</h4>
          <p
            key={scene.id}
            onClick={e => this.handleEdit(e, scene.id)}
            className="linkable"
            uk-icon="pencil"
          />
          <h5 className="inline-block">Actors in scene</h5>
          <p
            onClick={e => this.handleEdit(e, scene.id)}
            className="linkable"
            uk-icon="pencil"
          />
          {scene.actors.length > 0 ? (
            scene.actors.map(actor => <p key={actor.id}>{actor.name}</p>)
          ) : (
            <p>No actors in the scene</p>
          )}
        </div>
      );
    } else {
      return <p>No scene details available.</p>;
    }
  };

  handleEdit = (e, id) => {
    e.preventDefault();
    console.log(id);
    console.log(this.props);
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
  graphql(getActorsQuery, { name: "getActorsQuery" }),
  graphql(updateSceneMutation, { name: "updateSceneMutation" })
)(SceneDetails);
