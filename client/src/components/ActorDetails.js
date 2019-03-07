import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import { getActorQuery, getActorsQuery } from "../queries/queries";

class ActorDetails extends Component {
  showDetails = () => {
    const { actor } = this.props.data;

    if (actor) {
      return (
        <div>
          <h4>{actor.name}</h4>
          <p>{actor.role}</p>
          {actor.sceneIds ? (
            actor.sceneIds.map(scene => <p key={scene}>{scene}</p>)
          ) : (
            <p>No scenes to display.</p>
          )}
        </div>
      );
    } else {
      return <p>No actor details available.</p>;
    }
  };
  render() {
    return (
      <div className="uk-card uk-card-default uk-card-body uk-margin">
        <h3 className="uk-card-title">Actor Details</h3>
        {this.showDetails()}
      </div>
    );
  }
}

export default compose(
  graphql(
    getActorQuery,
    {
      options: props => {
        return {
          variables: {
            id: props.selectedActor
          }
        };
      }
    },
    { name: "getActorQuery" }
  ),

  graphql(getActorsQuery, { name: "getActorsQuery" })
)(ActorDetails);
