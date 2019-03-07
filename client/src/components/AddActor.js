import React, { Component } from "react";
import { graphql } from "react-apollo";
import { addActorMutation, getActorsQuery } from "../queries/queries";

class AddActor extends Component {
  state = {
    name: "",
    role: "",
    actorId: "",
    sceneId: "",
    scenes: []
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
    console.log(`this.props is `, this.props);
    console.log(`this.state is `, this.state);
    this.props.mutate({
      variables: {
        name: this.state.name,
        role: this.state.role
      },
      refetchQueries: [{ query: getActorsQuery }]
    });
    this.setState({
      name: "",
      role: ""
    });
  };

  render() {
    return (
      <form className="uk-form uk-card  uk-card-default uk-card-body ">
        <fieldset className="uk-fieldset ">
          <legend className="uk-legend">Add an Actor</legend>
          <div className="uk-margin">
            <input
              className="uk-input uk-margin"
              type="text"
              placeholder="Actor Name"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
            <input
              className="uk-input"
              type="text"
              placeholder="Actor Role"
              name="role"
              value={this.state.role}
              onChange={this.handleChange}
            />
          </div>

          <div className="uk-margin">
            <button
              onClick={this.submitForm}
              className="uk-button uk-button-default uk-border-pill uk-margin uk-align-left"
            >
              +
            </button>
          </div>
        </fieldset>
      </form>
    );
  }
}

export default graphql(addActorMutation)(AddActor);
