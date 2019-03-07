import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import { getScenesQuery } from "../queries/queries";
import SceneDetails from "./SceneDetails";
import AddScene from "./AddScene";

class SceneList extends Component {
  state = {
    selectedSceneId: ""
  };

  displayScenes = () => {
    let { getScenesQuery } = this.props;
    if (getScenesQuery.loading) {
      return <li>Loading Scenes...</li>;
    } else {
      if (getScenesQuery.scenes) {
        return getScenesQuery.scenes.map(scene => (
          <li
            key={scene.id}
            onClick={e => this.setState({ selectedSceneId: scene.id })}
          >
            <p className="linkable">{scene.scene}</p>
          </li>
        ));
      }
    }
  };

  render() {
    return (
      <div className="uk-card uk-card-default uk-padding t ">
        <h3 className="uk-card-title">Scenes</h3>
        <ul className="uk-list uk-link-text">{this.displayScenes()}</ul>
        <SceneDetails selectedScene={this.state.selectedSceneId} />
        <AddScene />
      </div>
    );
  }
}
export default compose(graphql(getScenesQuery, { name: "getScenesQuery" }))(
  SceneList
);
