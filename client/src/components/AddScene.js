import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import {
  getActorsQuery,
  addSceneMutation,
  getScenesQuery
} from "../queries/queries";

class AddScene extends Component {
  state = {
    scene: "",
    actorId: "",
    sceneId: "",
    actors: []
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  };
  submitForm = e => {
    e.preventDefault();
    console.log(this.state);
    this.props.addSceneMutation({
      variables: {
        scene: this.state.scene,
        actors: this.state.actors
      },
      refetchQueries: [{ query: getScenesQuery }]
    });
  };
  render() {
    return (
      <form
        id="add-scene"
        className="uk-form uk-card  uk-card-default uk-card-body "
        onSubmit={this.submitForm}
      >
        <fieldset className="uk-fieldset ">
          <div className="uk-margin">
            <input
              className="uk-input"
              type="text"
              placeholder="Scene Name"
              name="scene"
              onChange={this.handleChange}
            />
          </div>
          <div className="uk-margin">
            <select
              className="uk-select"
              type="select"
              placeholder="Actor"
              name="actor"
              value={this.state.actors}
              onChange={this.handleChange}
              multiple
            >
              {this.props.getActorsQuery.loading ? (
                <option>Loading Actors</option>
              ) : (
                this.props.getActorsQuery.actors.map(actor => (
                  <option key={actor.id} value={actor}>
                    {actor.name}
                  </option>
                ))
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
  graphql(addSceneMutation, { name: "addSceneMutation" })
)(AddScene);
