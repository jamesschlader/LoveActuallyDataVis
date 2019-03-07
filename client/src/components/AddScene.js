import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import {
  getActorsQuery,
  getScenesQuery,
  addSceneMutation
} from "../queries/queries";

class AddScene extends Component {
  state = {
    scene: "",
    actor: "",
    actorIds: []
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;

    if (name === "actorIds") {
      this.setState({
        [name]: [...this.state.actorIds, value]
      });
    } else {
      this.setState({
        [name]: value
      });
    }
  };

  submitSceneForm = e => {
    e.preventDefault();

    this.props.addSceneMutation({
      variables: {
        scene: this.state.scene,
        actorIds: this.state.actorIds
      },
      refetchQueries: [{ query: getScenesQuery }]
    });
  };

  showSelectedActors = () => {
    if (this.state.actorIds) {
      return this.props.getActorsQuery.actors
        .filter(actor => {
          return this.state.actorIds.includes(actor.id) ? actor : null;
        })
        .map(item => <li key={item.id}>{item.name}</li>);
    }
  };

  render() {
    return (
      <form
        className="uk-form uk-card uk-card-default uk-card-body "
        onSubmit={this.submitSceneForm}
      >
        <fieldset className="uk-fieldset ">
          <legend className="uk-legend">Add a Scene</legend>
          <div className="uk-margin">
            <input
              className="uk-input"
              type="text"
              placeholder="Scene Name"
              name="scene"
              value={this.state.scene}
              onChange={this.handleChange}
            />
          </div>
          <div className="uk-margin">
            <ul className="uk-list">
              {this.props.getActorsQuery.actors ? (
                this.showSelectedActors()
              ) : (
                <li>No actors selected</li>
              )}
            </ul>
            <select
              className="uk-select"
              type="select"
              placeholder="Actor"
              name="actorIds"
              onChange={this.handleChange}
            >
              <option key="0">Select an Actor</option>
              {this.props.getActorsQuery.loading ? (
                <option key="1">Loading Actors</option>
              ) : this.props.getActorsQuery ? (
                this.props.getActorsQuery.actors.map(actor => (
                  <option key={actor.id} value={actor.id}>
                    {actor.name}
                  </option>
                ))
              ) : (
                <option key="2">No Actors to choose from</option>
              )}
            </select>
            <button className="uk-button uk-button-default uk-border-pill uk-margin">
              +
            </button>
          </div>
        </fieldset>
      </form>
    );
  }
}
export default compose(
  graphql(getActorsQuery, { name: "getActorsQuery" }),
  graphql(addSceneMutation, { name: "addSceneMutation" }),
  graphql(getScenesQuery, { name: "getScenesQuery" })
)(AddScene);
