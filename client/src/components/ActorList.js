import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import { getActorsQuery } from "../queries/queries";
import AddActor from "./AddActor";
import ActorDetails from "./ActorDetails";

class ActorList extends Component {
  state = {
    selectedActorId: ""
  };

  displayActors = () => {
    console.log(this.props);
    let { getActorsQuery } = this.props;
    if (getActorsQuery.loading) {
      return <li>Loading Scenes...</li>;
    } else {
      if (getActorsQuery.actors) {
        return getActorsQuery.actors.map(actor => (
          <li
            key={actor.id}
            onClick={e => this.setState({ selectedActorId: actor.id })}
          >
            <p className="linkable ">{actor.name}</p>
          </li>
        ));
      }
    }
  };

  render() {
    return (
      <div className="uk-card uk-card-default uk-padding  ">
        <h3 className="uk-card-title">Actors</h3>
        <ul className="uk-list uk-link-text">{this.displayActors()}</ul>
        <ActorDetails selectedActor={this.state.selectedActorId} />
        <AddActor />
      </div>
    );
  }
}

export default compose(graphql(getActorsQuery, { name: "getActorsQuery" }))(
  ActorList
);
