import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getScenesQuery } from "../queries/queries";

class SceneList extends Component {
  displayScenes = () => {
    let { data } = this.props;
    if (data.loading) {
      return <li>Loading Books...</li>;
    } else {
      return data.scenes.map(scene => <li key={scene.id}>{scene.scene}</li>);
    }
  };

  render() {
    return (
      <div>
        <ul className="uk-list">{this.displayScenes()}</ul>
      </div>
    );
  }
}
export default graphql(getScenesQuery)(SceneList);
